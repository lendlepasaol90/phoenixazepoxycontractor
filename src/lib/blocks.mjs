import { esc, img, compareSlider, comparePair, layerDiagram, estimateForm, phoneLink } from './components.mjs';
import { site } from '../site.config.mjs';

const paras = (body = []) => (Array.isArray(body) ? body : [body]).map((p) => (p.startsWith('<') ? p : `<p>${p}</p>`)).join('\n');
const sid = (h) => (h || '').toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);

const B = {
  prose(b) {
    return `<section class="section block-prose${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap prose-grid">
    <h2 id="${sid(b.h2)}" class="reveal">${b.h2}</h2>
    <div class="prose reveal">${paras(b.body)}</div>
    ${b.aside ? `<aside class="prose-aside reveal">${b.aside.title ? `<p class="prose-aside__t">${b.aside.title}</p>` : ''}${paras(b.aside.body)}</aside>` : ''}
  </div>
</section>`;
  },

  split(b) {
    return `<section class="section block-split${b.flip ? ' is-flipped' : ''}${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap split">
    <figure class="split__media reveal${b.arch ? ' arch' : ''}">${img(b.img, b.alt)}${b.caption ? `<figcaption>${b.caption}</figcaption>` : ''}</figure>
    <div class="split__text reveal">
      <h2 id="${sid(b.h2)}">${b.h2}</h2>
      <div class="prose">${paras(b.body)}</div>
      ${b.list ? `<ul class="ticks">${b.list.map((l) => `<li>${l}</li>`).join('')}</ul>` : ''}
    </div>
  </div>
</section>`;
  },

  cards(b) {
    const items = b.items
      .map(
        (it) => `<article class="card${it.img ? ' card--img' : ''}">
  ${it.img ? `<div class="card__media">${img(it.img, it.alt || '', { sizes: '(min-width: 900px) 30vw, 100vw' })}</div>` : ''}
  <div class="card__body"><h3>${it.h3}</h3>${paras(it.body)}${it.link ? `<a class="textlink" href="${it.link.href}">${it.link.label}</a>` : ''}</div>
</article>`,
      )
      .join('');
    return `<section class="section block-cards${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap">
    <div class="section-head reveal"><h2 id="${sid(b.h2)}">${b.h2}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>
    <div class="cards cards--${b.cols || 3} reveal">${items}</div>
  </div>
</section>`;
  },

  list(b) {
    const items = b.items.map((it) => `<div class="deflist__row"><dt>${it.h3}</dt><dd>${paras(it.body)}</dd></div>`).join('');
    return `<section class="section block-list${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap list-grid">
    <div class="section-head section-head--side reveal"><h2 id="${sid(b.h2)}">${b.h2}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}
    ${b.img ? `<figure class="list-grid__img arch">${img(b.img, b.alt, { sizes: '(min-width: 900px) 30vw, 100vw' })}</figure>` : ''}</div>
    <dl class="deflist reveal">${items}</dl>
  </div>
</section>`;
  },

  table(b) {
    return `<section class="section block-table${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap">
    <div class="section-head reveal"><h2 id="${sid(b.h2)}">${b.h2}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>
    <div class="table-wrap reveal" tabindex="0" role="region" aria-label="${esc(b.h2.replace(/<[^>]+>/g, ''))}">
      <table>
        <thead><tr>${b.head.map((h) => `<th scope="col">${h}</th>`).join('')}</tr></thead>
        <tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>
    ${b.note ? `<p class="table-note">${b.note}</p>` : ''}
  </div>
</section>`;
  },

  steps(b) {
    const steps = b.steps
      .map((s, i) => `<li class="step"><span class="step__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><div><h3>${s.h3}</h3>${paras(s.body)}</div></li>`)
      .join('');
    return `<section class="section block-steps${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap">
    <div class="section-head reveal"><h2 id="${sid(b.h2)}">${b.h2}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>
    <ol class="steps${b.img ? ' steps--with-img' : ''} reveal">${steps}</ol>
  </div>
</section>`;
  },

  climate(b) {
    const pts = b.points.map((p) => `<li><h3>${p.h3}</h3>${paras(p.body)}</li>`).join('');
    return `<section class="section block-climate" aria-labelledby="${sid(b.h2)}">
  <div class="climate">
    <div class="climate__media">${img(b.img, b.alt, { sizes: '(min-width: 900px) 45vw, 100vw' })}</div>
    <div class="climate__body reveal">
      <h2 id="${sid(b.h2)}">${b.h2}</h2>
      ${b.intro ? `<p class="climate__intro">${b.intro}</p>` : ''}
      <ul class="climate__pts">${pts}</ul>
    </div>
  </div>
</section>`;
  },

  callout(b) {
    return `<section class="section block-callout" aria-label="${esc((b.h2 || 'Note').replace(/<[^>]+>/g, ''))}">
  <div class="wrap"><div class="callout reveal">${b.h2 ? `<h2>${b.h2}</h2>` : ''}${paras(b.body)}</div></div>
</section>`;
  },

  checklist(b) {
    return `<section class="section block-checklist${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap check-grid">
    <div class="section-head section-head--side reveal"><h2 id="${sid(b.h2)}">${b.h2}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>
    <ul class="checks reveal">${b.items.map((i) => `<li>${i}</li>`).join('')}</ul>
  </div>
</section>`;
  },

  gallery(b) {
    const items = b.images
      .map(
        (g) =>
          `<figure class="mosaic__item${g.wide ? ' is-wide' : ''}${g.tall ? ' is-tall' : ''}"><button type="button" class="mosaic__btn" data-lightbox="/images/${g.img}-1600.webp" data-caption="${esc(g.caption || g.alt)}" aria-label="Enlarge: ${esc(g.alt)}">${img(g.img, g.alt, { sizes: '(min-width: 900px) 33vw, 50vw' })}</button>${g.caption ? `<figcaption>${g.caption}</figcaption>` : ''}</figure>`,
      )
      .join('');
    return `<section class="section block-gallery${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap">
    <div class="section-head reveal"><h2 id="${sid(b.h2)}">${b.h2}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>
    <div class="mosaic reveal">${items}</div>
  </div>
</section>`;
  },

  beforeafter(b) {
    return `<section class="section block-ba tone-sand" aria-labelledby="${sid(b.h2)}">
  <div class="wrap">
    <div class="section-head reveal"><h2 id="${sid(b.h2)}">${b.h2}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>
    ${b.slider ? `<div class="ba-main reveal">${compareSlider(b.slider)}</div>` : ''}
    ${b.pairs ? `<div class="pairs reveal">${b.pairs.map(comparePair).join('')}</div>` : ''}
    <p class="disclaimer">${b.disclaimer || 'Comparison images are representative examples (licensed stock photography and rendered illustrations) and are not presented as completed projects of ours.'}</p>
  </div>
</section>`;
  },

  layers(b) {
    return `<section class="section block-layers${b.tone ? ' tone-' + b.tone : ''}" aria-labelledby="${sid(b.h2)}">
  <div class="wrap">
    <div class="section-head reveal"><h2 id="${sid(b.h2)}">${b.h2}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>
    <div class="reveal">${layerDiagram({ systems: b.systems })}</div>
  </div>
</section>`;
  },

  band(b) {
    return `<section class="band" aria-labelledby="${sid(b.h2)}">
  <div class="band__img" data-parallax>${img(b.img, b.alt, { sizes: '100vw' })}</div>
  <div class="wrap band__inner">
    <div class="band__panel reveal">
      <h2 id="${sid(b.h2)}">${b.h2}</h2>
      ${paras(b.body)}
      <div class="btn-row"><button type="button" class="btn btn--primary" data-open-estimate>${b.cta || 'Request a free estimate'}</button>${b.link ? `<a class="btn btn--ghost-light" href="${b.link.href}">${b.link.label}</a>` : ''}</div>
    </div>
  </div>
</section>`;
  },
};

export function renderBlocks(blocks) {
  return blocks
    .map((b) => {
      if (!B[b.type]) throw new Error('Unknown block type ' + b.type);
      return B[b.type](b);
    })
    .join('\n');
}

export function serviceHero(s) {
  const facts = s.facts
    ? `<dl class="facts">${s.facts.map((f) => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl>`
    : '';
  const ctas = `<div class="btn-row"><button type="button" class="btn btn--primary" data-open-estimate>Request a free estimate</button>${phoneLink('btn btn--quiet', 'Call ' + site.phone.display)}</div>`;
  const v = s.hero.variant || 'arch';
  if (v === 'band') {
    return `<section class="phero phero--band">
  <div class="phero__bg">${img(s.hero.img, s.hero.alt, { sizes: '100vw', eager: true, priority: true })}</div>
  <div class="wrap phero__inner">
    <div class="phero__panel">
      ${s.crumbs}
      <h1>${s.h1}</h1>
      <p class="lede">${s.hero.lede}</p>
      ${ctas}
    </div>
  </div>
</section>
${facts ? `<div class="wrap facts-wrap">${facts}</div>` : ''}`;
  }
  if (v === 'offset') {
    return `<section class="phero phero--offset">
  <div class="wrap">
    ${s.crumbs}
    <div class="phero__top">
      <h1>${s.h1}</h1>
      <div><p class="lede">${s.hero.lede}</p>${ctas}</div>
    </div>
    <div class="phero__wide">
      ${img(s.hero.img, s.hero.alt, { sizes: '(min-width: 1300px) 1240px, 100vw', eager: true, priority: true })}
      ${s.hero.inset ? `<div class="phero__inset">${img(s.hero.inset, s.hero.insetAlt, { sizes: '220px' })}</div>` : ''}
    </div>
    ${facts}
  </div>
</section>`;
  }
  return `<section class="phero phero--arch">
  <div class="wrap phero__grid">
    <div class="phero__text">
      ${s.crumbs}
      <h1>${s.h1}</h1>
      <p class="lede">${s.hero.lede}</p>
      ${ctas}
      ${facts}
    </div>
    <figure class="phero__media arch">${img(s.hero.img, s.hero.alt, { eager: true, priority: true })}</figure>
  </div>
</section>`;
}

export function relatedServices(list) {
  return `<section class="section related" aria-labelledby="related-h">
  <div class="wrap">
    <div class="section-head reveal"><h2 id="related-h">Related services</h2></div>
    <div class="related__grid reveal">${list
      .map(
        (r) => `<a class="related__card" href="/${r.slug}/">
  <div class="related__img">${img(r.card.img, r.card.alt, { sizes: '(min-width: 900px) 25vw, 50vw' })}</div>
  <h3>${esc(r.navLabel)}</h3><p>${esc(r.card.blurb)}</p></a>`,
      )
      .join('')}</div>
  </div>
</section>`;
}

export function ctaSection({ h2, body, preset = '', source }) {
  return `<section class="section cta-final" id="estimate" aria-labelledby="cta-h">
  <div class="wrap cta-final__grid">
    <div class="cta-final__text reveal">
      <h2 id="cta-h">${h2}</h2>
      ${paras(body)}
      <ul class="cta-final__list">
        <li>On-site look at the slab before any price is final</li>
        <li>Written scope that spells out prep, system and coat count</li>
        <li>Straight answers on cure times and when you can drive on it</li>
      </ul>
      <p class="cta-final__phone">Prefer to talk? Call ${phoneLink()}</p>
    </div>
    <div class="cta-final__form reveal">${estimateForm({ preset, source })}</div>
  </div>
</section>`;
}
