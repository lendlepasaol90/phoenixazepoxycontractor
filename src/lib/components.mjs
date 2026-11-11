import { readFileSync } from 'node:fs';
import { site, projectTypes } from '../site.config.mjs';

const manifest = JSON.parse(readFileSync(new URL('../image-manifest.json', import.meta.url)));

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Responsive <img>. `slug` maps to /images/<slug>-{480,960,1600,2200}.webp */
export function img(slug, alt, opts = {}) {
  const m = manifest[slug];
  if (!m) throw new Error(`Unknown image: ${slug}`);
  const { sizes = '(min-width: 1100px) 50vw, 100vw', eager = false, cls = '', priority = false } = opts;
  const widths = [480, 960, 1600, ...(m.big ? [2200] : [])];
  const srcset = widths.map((w) => `/images/${slug}-${w}.webp ${w}w`).join(', ');
  const h = Math.round(1600 / m.r);
  return `<img src="/images/${slug}-960.webp" srcset="${srcset}" sizes="${sizes}" width="1600" height="${h}" alt="${esc(alt)}"${
    cls ? ` class="${cls}"` : ''
  } ${eager ? 'loading="eager"' : 'loading="lazy"'} decoding="async"${priority ? ' fetchpriority="high"' : ''}>`;
}

export function phoneLink(cls = '', label) {
  const text = label || site.phone.display;
  if (site.phone.href) return `<a class="${cls}" href="${site.phone.href}">${esc(text)}</a>`;
  return `<span class="${cls} is-placeholder" title="Phone number placeholder — replace in src/site.config.mjs">${esc(text)}</span>`;
}

export function emailLink(cls = '') {
  if (site.email.href) return `<a class="${cls}" href="${site.email.href}">${esc(site.email.display)}</a>`;
  return `<span class="${cls} is-placeholder" title="Email placeholder — replace in src/site.config.mjs">${esc(site.email.display)}</span>`;
}

let formCount = 0;
/** Estimate request form. Submits to the Worker endpoint /api/estimate. */
export function estimateForm({ heading = 'Request a free estimate', intro = '', compact = false, preset = '', source = 'page' } = {}) {
  const id = `f${++formCount}`;
  const options = projectTypes
    .map((t) => `<option${t === preset ? ' selected' : ''}>${esc(t)}</option>`)
    .join('');
  return `<form class="estimate-form${compact ? ' estimate-form--compact' : ''}" action="/api/estimate" method="post" novalidate data-estimate-form>
  ${heading ? `<p class="estimate-form__title">${esc(heading)}</p>` : ''}
  ${intro ? `<p class="estimate-form__intro">${intro}</p>` : ''}
  <input type="hidden" name="source" value="${esc(source)}">
  <div class="hp" aria-hidden="true"><label for="${id}-company">Leave this field empty</label><input id="${id}-company" name="company" tabindex="-1" autocomplete="off"></div>
  <div class="field">
    <label for="${id}-name">Name</label>
    <input id="${id}-name" name="name" type="text" autocomplete="name" required minlength="2" maxlength="80">
    <p class="field__error" id="${id}-name-err" aria-live="polite"></p>
  </div>
  <div class="field-row">
    <div class="field">
      <label for="${id}-phone">Phone number</label>
      <input id="${id}-phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" required>
      <p class="field__error" aria-live="polite"></p>
    </div>
    <div class="field">
      <label for="${id}-email">Email</label>
      <input id="${id}-email" name="email" type="email" autocomplete="email" required maxlength="120">
      <p class="field__error" aria-live="polite"></p>
    </div>
  </div>
  <div class="field">
    <label for="${id}-type">Type of flooring project</label>
    <select id="${id}-type" name="projectType" required>
      <option value="">Choose one</option>${options}
    </select>
    <p class="field__error" aria-live="polite"></p>
  </div>
  <div class="field">
    <label for="${id}-msg">Message <span class="optional">(optional)</span></label>
    <textarea id="${id}-msg" name="message" rows="${compact ? 3 : 4}" maxlength="2000" placeholder="Approximate size, city, timing, and anything you already know about the slab"></textarea>
  </div>
  <button class="btn btn--primary btn--block" type="submit"><span class="btn__label">Send my request</span></button>
  <p class="estimate-form__status" role="status" aria-live="polite"></p>
  <p class="estimate-form__fine">We use your details only to reply about your project. See our <a href="/privacy-policy/">privacy policy</a>.</p>
</form>`;
}

export function breadcrumbs(trail) {
  // trail: [{name, url}] — last item is current page
  const items = trail
    .map((t, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${esc(t.name)}</li>`
        : `<li><a href="${t.url}">${esc(t.name)}</a></li>`,
    )
    .join('');
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items}</ol></nav>`;
}

export function breadcrumbSchema(trail) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: site.domain + t.url,
    })),
  };
}

export function faqBlock(faqs, { heading = 'Frequently asked questions', intro = '', id = 'faq' } = {}) {
  const items = faqs
    .map(
      (f) => `<details class="faq__item">
  <summary><h3>${esc(f.q)}</h3><span class="faq__icon" aria-hidden="true"></span></summary>
  <div class="faq__a">${f.a.map((p) => `<p>${p}</p>`).join('')}</div>
</details>`,
    )
    .join('\n');
  return `<section class="section faq" id="${id}" aria-labelledby="${id}-h">
  <div class="wrap faq__grid">
    <div class="faq__head reveal">
      <h2 id="${id}-h">${esc(heading)}</h2>
      ${intro ? `<p>${intro}</p>` : ''}
    </div>
    <div class="faq__list reveal">${items}</div>
  </div>
</section>`;
}

export function faqSchema(faqs) {
  const strip = (s) => s.replace(/<[^>]+>/g, '');
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.map(strip).join(' ') },
    })),
  };
}

/**
 * Before/after comparison. `after` sits on top and is revealed by the slider.
 * pair: {before, after, beforeAlt, afterAlt, caption, note}
 */
export function compareSlider(pair, { start = 50 } = {}) {
  return `<figure class="compare" data-compare style="--pos:${start}%">
  <div class="compare__stage">
    <div class="compare__img compare__img--before">${img(pair.before, pair.beforeAlt, { sizes: '(min-width: 1100px) 900px, 100vw' })}</div>
    <div class="compare__img compare__img--after">${img(pair.after, pair.afterAlt, { sizes: '(min-width: 1100px) 900px, 100vw' })}</div>
    <span class="compare__tag compare__tag--before">Before</span>
    <span class="compare__tag compare__tag--after">After</span>
    <div class="compare__handle" aria-hidden="true"><span></span></div>
    <input class="compare__range" type="range" min="0" max="100" value="${start}" aria-label="Drag to compare before and after: ${esc(pair.caption)}">
  </div>
  <figcaption>${esc(pair.caption)}${pair.note ? ` <span class="compare__note">${esc(pair.note)}</span>` : ''}</figcaption>
</figure>`;
}

/** Side-by-side before/after card for photos of similar (not identical) spaces */
export function comparePair(pair) {
  return `<figure class="pair">
  <div class="pair__imgs">
    <div class="pair__cell">${img(pair.before, pair.beforeAlt, { sizes: '(min-width: 900px) 25vw, 50vw' })}<span class="pair__tag">Before</span></div>
    <div class="pair__cell">${img(pair.after, pair.afterAlt, { sizes: '(min-width: 900px) 25vw, 50vw' })}<span class="pair__tag pair__tag--after">After</span></div>
  </div>
  <figcaption><strong>${esc(pair.title)}</strong> ${pair.caption}</figcaption>
</figure>`;
}

export const layerSystems = {
  flake: {
    label: 'Full-broadcast flake',
    note: 'The most requested garage system in the Valley. Texture hides dust and gives tires something to grip.',
    layers: [
      { name: 'Clear topcoat', detail: 'Polyaspartic or polyurethane. Takes the UV, the scuffs and the chemicals.', cls: 'l-top' },
      { name: 'Vinyl flake broadcast', detail: 'Thrown to refusal, then scraped and vacuumed so only locked-in chips remain.', cls: 'l-flake' },
      { name: 'Pigmented base coat', detail: 'Epoxy or polyaspartic that the flake falls into while it is still wet.', cls: 'l-base' },
      { name: 'Penetrating primer', detail: 'Soaks into the ground profile and becomes part of the slab surface.', cls: 'l-primer' },
      { name: 'Ground concrete (CSP 2–3)', detail: 'Diamond-ground to open the pores. Cracks and spalls filled before anything goes down.', cls: 'l-slab' },
    ],
  },
  metallic: {
    label: 'Metallic epoxy',
    note: 'A thicker, self-leveling build. More prep time and more cure time, and the result is one of a kind.',
    layers: [
      { name: 'High-gloss or satin topcoat', detail: 'Protects the metallic layer from abrasion and UV yellowing.', cls: 'l-top' },
      { name: 'Metallic epoxy body coat', detail: '100% solids epoxy with metallic pigment, worked by hand while it levels.', cls: 'l-metal' },
      { name: 'Tinted epoxy ground coat', detail: 'Sets the background color the metallic movement shows against.', cls: 'l-base l-base--dark' },
      { name: 'Primer and crack treatment', detail: 'Moisture-tolerant primer; cracks routed and filled flush.', cls: 'l-primer' },
      { name: 'Ground concrete', detail: 'Flat matters more here than anywhere: high spots telegraph through a metallic floor.', cls: 'l-slab' },
    ],
  },
  onedayPa: {
    label: 'One-day polyaspartic',
    note: 'Faster cure and better UV stability than standard epoxy. Usually walkable the same evening.',
    layers: [
      { name: 'Polyaspartic clear coat', detail: 'UV-stable and non-yellowing. Cures in hours instead of days.', cls: 'l-top' },
      { name: 'Flake or solid color', detail: 'Same decorative options as an epoxy system.', cls: 'l-flake' },
      { name: 'Polyaspartic or polyurea base', detail: 'Applied in smaller batches because it sets quickly, especially in summer heat.', cls: 'l-base' },
      { name: 'Ground concrete', detail: 'Prep is identical. Fast chemistry never makes up for skipped grinding.', cls: 'l-slab' },
    ],
  },
};

/** Interactive cross-section of a coating system */
export function layerDiagram({ systems = ['flake', 'metallic', 'onedayPa'] } = {}) {
  const tabs = systems
    .map(
      (k, i) =>
        `<button type="button" role="tab" class="layers__tab" aria-selected="${i === 0}" aria-controls="layers-${k}" id="layers-tab-${k}">${esc(layerSystems[k].label)}</button>`,
    )
    .join('');
  const panels = systems
    .map((k, i) => {
      const s = layerSystems[k];
      const stack = s.layers.map((l) => `<div class="layer ${l.cls}"></div>`).join('');
      const legend = s.layers
        .map((l) => `<li><span class="layers__swatch ${l.cls}"></span><div><strong>${esc(l.name)}</strong><p>${esc(l.detail)}</p></div></li>`)
        .join('');
      return `<div class="layers__panel" role="tabpanel" id="layers-${k}" aria-labelledby="layers-tab-${k}"${i ? ' hidden' : ''}>
  <div class="layers__stack" aria-hidden="true">${stack}</div>
  <div class="layers__legend"><p class="layers__note">${esc(s.note)}</p><ol>${legend}</ol></div>
</div>`;
    })
    .join('');
  return `<div class="layers" data-layers><div class="layers__tabs" role="tablist" aria-label="Coating systems">${tabs}</div>${panels}</div>`;
}
