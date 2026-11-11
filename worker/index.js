/**
 * Cloudflare Worker for phoenixazepoxycontractor.com
 *
 * - Serves the static site from ./dist through the ASSETS binding.
 * - Handles estimate form submissions at POST /api/estimate.
 *
 * Lead delivery (configure at least one in the Cloudflare dashboard → Worker → Settings → Variables):
 *   LEAD_WEBHOOK_URL   Any HTTPS endpoint that accepts JSON (Zapier, Make, Slack workflow, CRM, Google Apps Script...)
 *   RESEND_API_KEY     + LEAD_TO_EMAIL (+ optional LEAD_FROM_EMAIL) to email each lead through Resend
 *   LEADS              Optional KV namespace binding; every lead is stored as JSON when present
 * Every submission is also written to the Worker log (observability is enabled in wrangler.jsonc),
 * so nothing is lost even before a delivery method is configured.
 */

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

function json(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}

async function readBody(request) {
  const type = request.headers.get('content-type') || '';
  if (type.includes('application/json')) return request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

function validate(d) {
  const errors = {};
  if (d.name.length < 2) errors.name = 'Enter your name.';
  const digits = d.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) errors.phone = 'Enter a 10-digit phone number.';
  if (!EMAIL_RE.test(d.email)) errors.email = 'Enter a valid email address.';
  if (!d.projectType) errors.projectType = 'Choose a project type.';
  return errors;
}

async function deliver(lead, env) {
  const tasks = [];
  if (env.LEAD_WEBHOOK_URL) {
    tasks.push(
      fetch(env.LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(lead) }).then((r) => {
        if (!r.ok) throw new Error(`webhook ${r.status}`);
      }),
    );
  }
  if (env.RESEND_API_KEY && env.LEAD_TO_EMAIL) {
    const text = [
      `New estimate request from ${lead.name}`,
      '',
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Project: ${lead.projectType}`,
      `Page: ${lead.page}`,
      `Form: ${lead.source}`,
      '',
      lead.message || '(no message)',
    ].join('\n');
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          from: env.LEAD_FROM_EMAIL || 'Website Leads <onboarding@resend.dev>',
          to: env.LEAD_TO_EMAIL.split(',').map((s) => s.trim()),
          reply_to: lead.email,
          subject: `Estimate request: ${lead.projectType} — ${lead.name}`,
          text,
        }),
      }).then((r) => {
        if (!r.ok) throw new Error(`resend ${r.status}`);
      }),
    );
  }
  if (env.LEADS) tasks.push(env.LEADS.put(`lead:${lead.receivedAt}:${crypto.randomUUID()}`, JSON.stringify(lead)));
  const results = await Promise.allSettled(tasks);
  return { attempted: tasks.length, failed: results.filter((r) => r.status === 'rejected').map((r) => String(r.reason)) };
}

async function handleEstimate(request, env, ctx) {
  const wantsJson = (request.headers.get('accept') || '').includes('application/json');
  let raw;
  try {
    raw = await readBody(request);
  } catch {
    return json({ ok: false, error: 'The form could not be read.' }, 400);
  }
  // Honeypot: real visitors never fill the hidden "company" field.
  if (clean(raw.company, 200)) return wantsJson ? json({ ok: true }) : Response.redirect(new URL('/thank-you/', request.url), 303);

  const lead = {
    name: clean(raw.name, 80),
    phone: clean(raw.phone, 30),
    email: clean(raw.email, 120),
    projectType: clean(raw.projectType, 80),
    message: clean(raw.message, 2000),
    page: clean(raw.page || new URL(request.headers.get('referer') || request.url).pathname, 200),
    source: clean(raw.source, 60),
    receivedAt: new Date().toISOString(),
    country: request.cf?.country || '',
  };
  const errors = validate(lead);
  if (Object.keys(errors).length) {
    return json({ ok: false, error: 'Please check the highlighted fields.', fields: errors }, 422);
  }

  console.log('LEAD', JSON.stringify(lead));
  const result = await deliver(lead, env);
  if (result.failed.length) console.error('Lead delivery problem', result.failed);
  if (result.attempted > 0 && result.failed.length === result.attempted) {
    return json({ ok: false, error: 'We could not send your request right now.' }, 502);
  }
  if (!wantsJson) return Response.redirect(new URL('/thank-you/', request.url), 303);
  return json({ ok: true });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Redirect www to the apex domain
    if (url.hostname === 'www.phoenixazepoxycontractor.com') {
      url.hostname = 'phoenixazepoxycontractor.com';
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === '/api/estimate') {
      if (request.method === 'POST') return handleEstimate(request, env, ctx);
      return json({ ok: false, error: 'Method not allowed' }, 405);
    }

    const res = await env.ASSETS.fetch(request);
    const headers = new Headers(res.headers);
    headers.set('x-content-type-options', 'nosniff');
    headers.set('referrer-policy', 'strict-origin-when-cross-origin');
    headers.set('permissions-policy', 'camera=(), microphone=(), geolocation=()');
    if ((headers.get('content-type') || '').includes('text/html')) headers.set('x-frame-options', 'SAMEORIGIN');
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};
