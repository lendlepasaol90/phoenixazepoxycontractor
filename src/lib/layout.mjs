import { site, areas } from '../site.config.mjs';
import { esc, phoneLink, emailLink, estimateForm } from './components.mjs';

let ASSET_VERSION = 'dev';
export const setAssetVersion = (v) => (ASSET_VERSION = v);

function head(page) {
  const url = site.domain + page.path;
  const ogImg = site.domain + (page.ogImage || site.ogImage);
  const ld = page.schema?.length
    ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': page.schema })}</script>`
    : '';
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1600">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${ogImg}">
<meta name="theme-color" content="#f6f0e6">
<meta name="format-detection" content="telephone=no">
<!-- Favicon: add /favicon.ico and /apple-touch-icon.png when the brand files are supplied -->
<link rel="preload" href="/fonts/archivo-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/source-serif-4-var.woff2" as="font" type="font/woff2" crossorigin>
${page.preload ? `<link rel="preload" as="image" href="/images/${page.preload}-960.webp" imagesrcset="/images/${page.preload}-480.webp 480w, /images/${page.preload}-960.webp 960w, /images/${page.preload}-1600.webp 1600w" imagesizes="(min-width: 1100px) 50vw, 100vw" fetchpriority="high">` : ''}
<link rel="stylesheet" href="/assets/site.css?v=${ASSET_VERSION}">
<script src="/assets/site.js?v=${ASSET_VERSION}" defer></script>
${ld}
</head>`;
}

function header(services, current) {
  const svcLinks = services
    .map(
      (s) =>
        `<li><a href="/${s.slug}/"${current === '/' + s.slug + '/' ? ' aria-current="page"' : ''}><span class="menu__name">${esc(s.navLabel)}</span><span class="menu__desc">${esc(s.menuNote)}</span></a></li>`,
    )
    .join('');
  const link = (href, label) => `<li><a class="nav__link" href="${href}"${current === href ? ' aria-current="page"' : ''}>${label}</a></li>`;
  return `<a class="skip" href="#main">Skip to content</a>
<div class="topbar">
  <div class="wrap topbar__inner">
    <p>Epoxy, polyaspartic and concrete coatings across Phoenix and the Valley</p>
    <p class="topbar__contact">Call ${phoneLink('topbar__phone')}</p>
  </div>
</div>
<header class="site-header" data-header>
  <div class="wrap site-header__inner">
    <a class="logo" href="/" aria-label="${esc(site.name)} home">
      <span class="logo__slot" aria-hidden="true">Logo</span>
      <span class="logo__text">${esc(site.name)}</span>
    </a>
    <nav class="nav" aria-label="Main">
      <ul class="nav__list">
        ${link('/', 'Home')}
        <li class="nav__item--menu">
          <button class="nav__link nav__toggle" type="button" aria-expanded="false" aria-controls="services-menu">Services<svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button>
          <div class="menu" id="services-menu">
            <div class="menu__inner">
              <div class="menu__intro">
                <p class="menu__title">Floor coating services</p>
                <p>Every system we install starts with diamond grinding and ends with a floor matched to how the space is used.</p>
                <a class="btn btn--ghost btn--sm" href="/services/">See all services</a>
              </div>
              <ul class="menu__grid">${svcLinks}</ul>
            </div>
          </div>
        </li>
        ${link('/about-us/', 'About Us')}
        ${link('/service-areas/', 'Service Areas')}
        ${link('/gallery/', 'Gallery')}
        ${link('/contact/', 'Contact')}
      </ul>
    </nav>
    <div class="site-header__cta">
      ${phoneLink('btn btn--quiet btn--phone')}
      <button class="btn btn--primary" type="button" data-open-estimate>Free estimate</button>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu" data-burger><span></span><span></span><span></span></button>
    </div>
  </div>
  <div class="mobile-nav" id="mobile-nav" hidden>
    <ul>
      <li><a href="/">Home</a></li>
      <li><details><summary>Services</summary><ul><li><a href="/services/">All services</a></li>${services
        .map((s) => `<li><a href="/${s.slug}/">${esc(s.navLabel)}</a></li>`)
        .join('')}</ul></details></li>
      <li><a href="/about-us/">About Us</a></li>
      <li><a href="/service-areas/">Service Areas</a></li>
      <li><a href="/gallery/">Gallery</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
    <div class="mobile-nav__cta">${phoneLink('btn btn--quiet btn--block', 'Call ' + site.phone.display)}<button class="btn btn--primary btn--block" type="button" data-open-estimate>Request a free estimate</button></div>
  </div>
</header>
<div class="drawer" id="estimate-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title" hidden data-drawer>
  <div class="drawer__scrim" data-close-estimate></div>
  <div class="drawer__panel">
    <div class="drawer__head">
      <p class="drawer__title" id="drawer-title">Tell us about your floor</p>
      <button class="drawer__close" type="button" aria-label="Close estimate form" data-close-estimate><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" stroke-width="1.8"/></svg></button>
    </div>
    <p class="drawer__lede">A few details are enough to start. We'll follow up to talk through the slab, the system options and a time to see the space.</p>
    ${estimateForm({ heading: '', compact: true, source: 'header-drawer' })}
  </div>
</div>`;
}

function footer(services) {
  const half = Math.ceil(services.length / 2);
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="footer__top">
      <div class="footer__brand">
        <a class="logo logo--footer" href="/" aria-label="${esc(site.name)} home"><span class="logo__slot" aria-hidden="true">Logo</span><span class="logo__text">${esc(site.name)}</span></a>
        <p>Floor coatings for garages, homes, shops and warehouses in Phoenix and the surrounding Valley. Ground, repaired and coated with systems chosen for desert heat.</p>
        <ul class="footer__contact">
          <li><span>Phone</span>${phoneLink()}</li>
          <li><span>Email</span>${emailLink()}</li>
          <li><span>Hours</span>${esc(site.hours)}</li>
        </ul>
      </div>
      <nav class="footer__col" aria-label="Services">
        <p class="footer__h">Services</p>
        <ul>${services.slice(0, half).map((s) => `<li><a href="/${s.slug}/">${esc(s.navLabel)}</a></li>`).join('')}</ul>
      </nav>
      <nav class="footer__col" aria-label="More services">
        <p class="footer__h footer__h--spacer" aria-hidden="true">&nbsp;</p>
        <ul>${services.slice(half).map((s) => `<li><a href="/${s.slug}/">${esc(s.navLabel)}</a></li>`).join('')}<li><a href="/services/">All services</a></li></ul>
      </nav>
      <nav class="footer__col" aria-label="Company">
        <p class="footer__h">Company</p>
        <ul>
          <li><a href="/about-us/">About Us</a></li>
          <li><a href="/service-areas/">Service Areas</a></li>
          <li><a href="/gallery/">Gallery</a></li>
          <li><a href="/contact/">Contact</a></li>
          <li><a href="/privacy-policy/">Privacy Policy</a></li>
        </ul>
      </nav>
    </div>
    <div class="footer__map">
      <div class="footer__map-text">
        <p class="footer__h">Where we work</p>
        <p>Based around Phoenix and serving ${areas
          .slice(1, -1)
          .map((a) => `<a href="/service-areas/#${a.slug}">${a.name}</a>`)
          .join(', ')} and <a href="/service-areas/#${areas.at(-1).slug}">${areas.at(-1).name}</a>.</p>
      </div>
      <div class="map-frame" data-map>
        <iframe title="Map of Phoenix, Arizona" data-src="${site.mapEmbed}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        <noscript><iframe title="Map of Phoenix, Arizona" src="${site.mapEmbed}" loading="lazy"></iframe></noscript>
      </div>
    </div>
    <div class="footer__bottom">
      <p>&copy; <span data-year>2026</span> ${esc(site.name)}. All rights reserved.</p>
      <p>Photography is licensed stock and illustrative imagery unless noted as a project photo.</p>
    </div>
  </div>
</footer>
<div class="mobile-cta" data-mobile-cta>
  ${phoneLink('mobile-cta__call', 'Call')}
  <button type="button" class="mobile-cta__est" data-open-estimate>Free estimate</button>
</div>`;
}

export function render(page, services) {
  return `<!doctype html>
<html lang="en">
${head(page)}
<body class="${page.bodyClass || ''}">
${header(services, page.path)}
<main id="main">
${page.body}
</main>
${footer(services)}
</body>
</html>
`;
}
