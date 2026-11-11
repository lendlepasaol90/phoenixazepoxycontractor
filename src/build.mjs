// Static site build: renders every page to ./dist
// Usage: node src/build.mjs
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, areas } from './site.config.mjs';
import { render, setAssetVersion } from './lib/layout.mjs';
import { breadcrumbs, breadcrumbSchema, faqBlock, faqSchema } from './lib/components.mjs';
import { renderBlocks, serviceHero, relatedServices, ctaSection } from './lib/blocks.mjs';
import { services } from './content/services/index.mjs';
import { homePage } from './content/home.mjs';
import { otherPages } from './content/pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const BUILD_DATE = new Date().toISOString().slice(0, 10);

rmSync(DIST, { recursive: true, force: true });
mkdirSync(join(DIST, 'assets'), { recursive: true });

// Static assets (fingerprinted by query string)
const css = readFileSync(join(ROOT, 'src/static/site.css'), 'utf8');
const js = readFileSync(join(ROOT, 'src/static/site.js'), 'utf8');
const minCss = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}').trim();
writeFileSync(join(DIST, 'assets/site.css'), minCss);
writeFileSync(join(DIST, 'assets/site.js'), js);
setAssetVersion(createHash('sha1').update(minCss + js).digest('hex').slice(0, 10));
if (existsSync(join(ROOT, 'public'))) cpSync(join(ROOT, 'public'), DIST, { recursive: true });

export const business = {
  '@type': 'HomeAndConstructionBusiness',
  '@id': site.domain + '/#business',
  name: site.name,
  url: site.domain + '/',
  image: site.domain + site.ogImage,
  description:
    'Epoxy, polyaspartic, polyurea and concrete floor coatings for garages, homes, commercial spaces and warehouses in Phoenix, Arizona and surrounding Valley communities.',
  areaServed: areas.map((a) => ({ '@type': 'City', name: `${a.name}, AZ` })),
  ...(site.phone.isPlaceholder ? {} : { telephone: site.phone.display }),
  ...(site.email.isPlaceholder ? {} : { email: site.email.display }),
  ...(site.address ? { address: site.address } : {}),
  knowsAbout: ['Epoxy flooring', 'Polyaspartic coatings', 'Polyurea coatings', 'Concrete grinding', 'Metallic epoxy', 'Flake epoxy floors'],
};
const website = { '@type': 'WebSite', '@id': site.domain + '/#website', url: site.domain + '/', name: site.name, publisher: { '@id': business['@id'] } };

const pages = [];
const write = (path, html) => {
  const out = path === '/' ? join(DIST, 'index.html') : path === '/404' ? join(DIST, '404.html') : join(DIST, path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
};
const add = (page) => {
  write(page.path, render(page, services));
  pages.push(page);
};

// ---- Service pages
for (const s of services) {
  const path = `/${s.slug}/`;
  const trail = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/' },
    { name: s.navLabel, url: path },
  ];
  const related = s.related
    .map((slug) => {
      const r = services.find((x) => x.slug === slug);
      if (!r) throw new Error(`Related slug "${slug}" not found (in ${s.slug})`);
      return r;
    });
  const body = [
    serviceHero({ ...s, crumbs: breadcrumbs(trail) }),
    renderBlocks(s.blocks),
    faqBlock(s.faqs, { heading: s.faqHeading || 'Questions we hear about ' + s.navLabel.toLowerCase(), intro: s.faqIntro || '' }),
    relatedServices(related),
    ctaSection({ h2: s.cta.h2, body: s.cta.body, preset: s.cta.preset, source: s.slug }),
  ].join('\n');
  add({
    path,
    title: s.title,
    description: s.description,
    preload: s.hero.img,
    ogImage: `/images/${s.hero.img}-1600.webp`,
    body,
    bodyClass: 'page-service',
    schema: [
      business,
      website,
      {
        '@type': 'Service',
        '@id': site.domain + path + '#service',
        name: s.schemaName || s.navLabel,
        serviceType: s.serviceType || s.navLabel,
        description: s.description,
        url: site.domain + path,
        provider: { '@id': business['@id'] },
        areaServed: { '@type': 'City', name: 'Phoenix, AZ' },
        image: site.domain + `/images/${s.hero.img}-1600.webp`,
      },
      breadcrumbSchema(trail),
      faqSchema(s.faqs),
    ],
  });
}

// ---- Home
add({ ...homePage(services), path: '/', schema: [business, website, ...homePage(services).schema] });

// ---- Other pages
for (const p of otherPages(services)) {
  add({ ...p, schema: [business, website, ...(p.schema || [])] });
}

// ---- sitemap.xml & robots.txt
const indexable = pages.filter((p) => !p.noindex && p.path !== '/404');
const priority = (p) => (p.path === '/' ? '1.0' : services.some((s) => '/' + s.slug + '/' === p.path) ? '0.9' : '0.7');
writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${site.domain}${p.path}</loc><lastmod>${BUILD_DATE}</lastmod><priority>${priority(p)}</priority></url>`).join('\n')}
</urlset>
`,
);
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /thank-you/\n\nSitemap: ${site.domain}/sitemap.xml\n`);
writeFileSync(
  join(DIST, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/images/*
  Cache-Control: public, max-age=2592000
`,
);

console.log(`Built ${pages.length} pages to dist/`);
