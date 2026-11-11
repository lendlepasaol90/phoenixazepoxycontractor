import { site, areas } from '../site.config.mjs';
import { img, esc, breadcrumbs, breadcrumbSchema, estimateForm, phoneLink, emailLink, compareSlider, comparePair } from '../lib/components.mjs';
import { ctaSection } from '../lib/blocks.mjs';
import { beforeAfterSliders, beforeAfterPairs } from './shared.mjs';

const crumbs = (name, path) => [
  { name: 'Home', url: '/' },
  { name, url: path },
];

const areaNotes = {
  phoenix: 'From mid-century ranch homes in central Phoenix to newer builds in the north, the city has every kind of slab. Older homes often bring tile, sealers or old paint to remove first; newer homes tend to be ready for grinding right away.',
  scottsdale: 'Scottsdale projects range from condo garages near Old Town to large custom homes farther north, where multi-car garages, metallic interiors and showpiece finishes are common requests.',
  tempe: 'Tempe has a mix of older single-family homes, rentals and commercial spaces. Fast-cure polyaspartic systems are popular with owners and property managers working around turnovers.',
  mesa: 'Mesa covers a lot of ground, and so do its garages. RV bays, workshops and larger lots on the east side make flake systems with tough topcoats a frequent choice.',
  chandler: 'Chandler mixes established neighborhoods with newer master-planned communities and business parks, so we see everything from HOA-timed garage projects to office and light industrial floors.',
  gilbert: 'Gilbert homeowners often want a garage that matches the rest of a newer house. Clean flake blends, solid colors and coated laundry and mudrooms are common here.',
  glendale: 'Glendale projects include older West Valley homes, newer subdivisions and commercial and warehouse space. Moisture testing is especially useful on older slabs.',
  peoria: 'Peoria stretches from established neighborhoods into newer communities to the north. Garage floors, casitas and home gyms make up much of the work.',
  'paradise-valley': 'Paradise Valley homes tend to have large, detailed garages and living spaces, and owners often ask about metallic finishes, collector-car garages and coordinated flooring throughout the property.',
  avondale: 'Avondale has grown quickly, with many newer homes and nearby commercial and logistics space. Both garage and warehouse coatings are common requests.',
  goodyear: 'Goodyear combines newer residential communities with a large amount of distribution and warehouse space along the I-10 corridor, so we plan both residential and phased commercial projects here.',
  surprise: 'Surprise includes active-adult communities and newer subdivisions. Golf cart parking, workshop garages and easy-care flake floors are frequent topics.',
  'fountain-hills': 'Fountain Hills homes often sit on hillside lots with garages that see strong morning or afternoon sun. UV-stable topcoats are a priority for doors facing the light.',
  'queen-creek': 'Queen Creek properties often include larger lots, workshops and outbuildings in addition to the main garage, which suits tough, textured flake and solid systems.',
  'apache-junction': 'Apache Junction sits at the edge of the Superstitions, with older homes, shops and detached garages that often need crack repair and old coating removal before anything new goes down.',
};

export function otherPages(services) {
  const out = [];

  // ---------------------------------------------------------------- services overview
  {
    const path = '/services/';
    const trail = crumbs('Services', path);
    const featured = ['epoxy-flooring-phoenix-az', 'metallic-epoxy-flooring'];
    const cards = services
      .map((s) => {
        const feat = featured.includes(s.slug);
        return `<a class="svc${feat ? ' svc--feature' : ''} reveal" href="/${s.slug}/">
  <div class="svc__img">${img(s.card.img, s.card.alt, { sizes: feat ? '(min-width: 1000px) 45vw, 100vw' : '(min-width: 1000px) 30vw, (min-width: 640px) 50vw, 100vw' })}</div>
  <div class="svc__body"><h2>${esc(s.navLabel)}</h2><p>${esc(s.card.blurb)} ${esc(s.hero.lede.split('. ')[0])}.</p><span class="svc__more">Learn more about ${esc(s.navLabel.toLowerCase())}</span></div>
</a>`;
      })
      .join('\n');
    out.push({
      path,
      title: 'Floor Coating Services Phoenix AZ | Epoxy, Polyaspartic, Polyurea & More',
      description:
        'All floor coating services from Phoenix AZ Epoxy Contractor: garage, residential, commercial, industrial, metallic, flake, polyaspartic, polyurea, patio coatings and concrete prep.',
      preload: services[0].card.img,
      body: `<section class="page-hero"><div class="wrap">${breadcrumbs(trail)}<h1>Floor coating services across Phoenix</h1><p class="lede">Thirteen services, one approach: understand how the floor is used, prepare the concrete properly and choose chemistry that suits the Valley climate. Start with the space you have in mind.</p><div class="btn-row"><button type="button" class="btn btn--primary" data-open-estimate>Request a free estimate</button></div></div></section>
<section class="section" style="padding-top:0" aria-label="All services"><div class="wrap"><div class="svc-index">${cards}</div></div></section>
<section class="section tone-sand" aria-labelledby="choose-h"><div class="wrap prose-grid"><h2 id="choose-h" class="reveal">Not sure where your project fits?</h2><div class="prose reveal"><p>Many projects touch more than one service. A garage floor usually involves <a href="/concrete-floor-preparation-repair/">crack repair and grinding</a>, a <a href="/decorative-flake-epoxy-flooring/">flake system</a> and a <a href="/polyaspartic-floor-coatings/">polyaspartic topcoat</a>. A commercial build-out might combine <a href="/commercial-epoxy-flooring/">decorative front-of-house floors</a> with <a href="/industrial-epoxy-flooring/">heavy-duty back rooms</a>.</p><p>You do not need to sort that out in advance. Describe the space, what is on the slab now and how it gets used, and we will recommend a system during the estimate.</p></div></div></section>
${ctaSection({ h2: 'Tell us what you are working with', body: ['A few details are enough to start the conversation. We will follow up to arrange a look at the slab.'], source: 'services' })}`,
      schema: [
        breadcrumbSchema(trail),
        {
          '@type': 'ItemList',
          itemListElement: services.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: `${site.domain}/${s.slug}/`, name: s.navLabel })),
        },
      ],
    });
  }

  // ---------------------------------------------------------------- about
  {
    const path = '/about-us/';
    const trail = crumbs('About Us', path);
    out.push({
      path,
      title: 'About Us | Phoenix AZ Epoxy Contractor',
      description:
        'How Phoenix AZ Epoxy Contractor approaches floor coatings: slab-first assessments, diamond-ground prep, climate-appropriate systems and written, plain-language estimates.',
      preload: 'crew-trowel',
      body: `<section class="phero phero--arch"><div class="wrap phero__grid"><div class="phero__text">${breadcrumbs(trail)}<h1>About Phoenix AZ Epoxy Contractor</h1><p class="lede">We are a floor coating company focused on one thing: resinous floors for homes and businesses in Phoenix and the surrounding Valley, built to suit the desert they live in.</p><div class="btn-row"><button type="button" class="btn btn--primary" data-open-estimate>Request a free estimate</button><a class="btn btn--quiet" href="/services/">Our services</a></div></div><figure class="phero__media arch">${img('crew-trowel', 'Gloved hand smoothing a fresh coating on a concrete floor with a trowel', { eager: true, priority: true })}</figure></div></section>
<section class="section tone-ivory" aria-labelledby="ab1"><div class="wrap prose-grid"><h2 id="ab1" class="reveal">How we think about floors</h2><div class="prose reveal">
<p>Every coated floor is a stack of decisions: how the slab is opened up, how cracks are handled, which primer suits the moisture in the concrete, how thick each layer goes on, and which topcoat will face the sun and the tires. Most of those decisions are invisible once the floor is finished. They are also the reason one floor still looks good years later and another starts peeling at the tire lines.</p>
<p>So we start with the slab. Every estimate includes a look at the concrete itself, and every proposal explains the preparation, the products and the number of coats in plain language. If a cheaper system will genuinely serve you well, we will say so. If a floor is not a good candidate for the finish you have in mind, we will say that too, and suggest one that will look better on that slab.</p>
<p>We also think the Phoenix climate deserves more attention than it usually gets. Summer heat changes how products behave in the bucket. Sun through a garage door yellows the wrong topcoat. Monsoon humidity can cloud a coating that cures below the dew point. Choosing chemistry for these conditions is a big part of what we do.</p>
</div></div></section>
<section class="section" aria-labelledby="ab2"><div class="wrap"><div class="section-head reveal"><h2 id="ab2">What you can expect working with us</h2></div>
<div class="benefits reveal">
<div class="benefit"><h3>An honest assessment</h3><p>We look at moisture, cracks, old coatings and flatness, then explain what they mean for your floor before recommending a system.</p></div>
<div class="benefit"><h3>A written, itemized scope</h3><p>Prep method, products, coat count and approximate thickness, so you can compare quotes line by line.</p></div>
<div class="benefit"><h3>Proper preparation</h3><p>Dust-controlled diamond grinding and repair on every coated floor. No acid-etch shortcuts.</p></div>
<div class="benefit"><h3>Climate-aware installs</h3><p>Early starts in summer, measured slab temperatures and UV-stable topcoats wherever light reaches the floor.</p></div>
<div class="benefit"><h3>Clear timing</h3><p>Realistic times for walking, moving things back and parking, given for your floor and that week’s weather.</p></div>
<div class="benefit"><h3>A clean finish</h3><p>Masked walls, sealed-off work areas and a walkthrough at the end with simple care instructions.</p></div>
</div></div></section>
<section class="section tone-sand" aria-labelledby="ab3"><div class="wrap split"><figure class="split__media reveal">${img('camelback', 'Camelback Mountain at sunrise over the Phoenix area', { sizes: '(min-width: 860px) 45vw, 100vw' })}</figure><div class="split__text reveal"><h2 id="ab3">Rooted in the Valley</h2><div class="prose"><p>We work across Phoenix and nearby communities, including Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, Peoria and the West and Southeast Valley. The slabs, the building styles and the weather here shape the systems we recommend.</p><p>We are building our project portfolio with real photos from local jobs. Until those are published, the images on this site are licensed stock photography and clearly labeled rendered illustrations, and we will never present them as our own completed projects.</p><p><a href="/service-areas/">See all service areas</a></p></div></div></div></section>
${ctaSection({ h2: 'Let’s look at your floor together', body: ['The best way to see how we work is an estimate. We will look at the slab, talk through options and leave you with a clear written proposal.'], source: 'about' })}`,
      schema: [breadcrumbSchema(trail), { '@type': 'AboutPage', url: site.domain + path, name: 'About Phoenix AZ Epoxy Contractor', about: { '@id': site.domain + '/#business' } }],
    });
  }

  // ---------------------------------------------------------------- service areas
  {
    const path = '/service-areas/';
    const trail = crumbs('Service Areas', path);
    const list = areas
      .map(
        (a) => `<article class="area" id="${a.slug}"><h2>${esc(a.name)}</h2><p>${areaNotes[a.slug]}</p><p><a class="textlink" href="#estimate">Request an estimate in ${esc(a.name)}</a></p></article>`,
      )
      .join('');
    out.push({
      path,
      title: 'Service Areas | Epoxy Flooring in Phoenix, Scottsdale, Mesa, Chandler & More',
      description:
        'Epoxy and floor coating services across Phoenix, Scottsdale, Tempe, Mesa, Chandler, Gilbert, Glendale, Peoria, Paradise Valley, Goodyear, Queen Creek and nearby Valley communities.',
      preload: 'camelback',
      body: `<section class="phero phero--offset"><div class="wrap">${breadcrumbs(trail)}<div class="phero__top"><h1>Floor coatings across Phoenix and the Valley</h1><div><p class="lede">We work throughout the Phoenix metro area, from central Phoenix to the far West Valley and the Southeast Valley. Estimates are free in every community listed below.</p><div class="btn-row"><button type="button" class="btn btn--primary" data-open-estimate>Request a free estimate</button></div></div></div><div class="phero__wide">${img('camelback', 'Camelback Mountain at sunrise above the Phoenix metro area', { sizes: '(min-width: 1300px) 1240px, 100vw', eager: true, priority: true })}</div></div></section>
<section class="section" style="padding-top:2rem" aria-label="Communities we serve"><div class="wrap"><div class="area-list">${list}</div>
<p class="table-note" style="margin-top:2rem">We do not operate offices in each of these cities; our crews travel to projects across the Valley. Do not see your community? Ask anyway, especially for larger commercial and industrial work.</p></div></section>
<section class="section tone-ivory" aria-labelledby="sa2"><div class="wrap prose-grid"><h2 id="sa2" class="reveal">Popular services across the Valley</h2><div class="prose reveal"><p>Wherever you are, the most requested projects are <a href="/garage-epoxy-flooring/">garage floors</a> with <a href="/decorative-flake-epoxy-flooring/">decorative flake</a> and <a href="/polyaspartic-floor-coatings/">polyaspartic topcoats</a>. Interior <a href="/metallic-epoxy-flooring/">metallic floors</a> and <a href="/residential-epoxy-flooring/">residential coatings</a> are common in custom and newer homes, while business owners call about <a href="/commercial-epoxy-flooring/">commercial</a>, <a href="/warehouse-floor-coatings/">warehouse</a> and <a href="/industrial-epoxy-flooring/">industrial</a> floors. Outdoor slabs get <a href="/patio-concrete-coatings/">UV-stable patio coatings</a>.</p></div></div></section>
${ctaSection({ h2: 'Request an estimate in your city', body: ['Let us know where the project is and what kind of floor you are thinking about. We will schedule a visit to look at the slab.'], source: 'service-areas' })}`,
      schema: [breadcrumbSchema(trail)],
    });
  }

  // ---------------------------------------------------------------- gallery
  {
    const path = '/gallery/';
    const trail = crumbs('Gallery', path);
    const groups = [
      ['Garages', [
        ['garage-flake-white', 'Three-car garage with gray full-flake floor', 'wide'],
        ['garage-flake-gym', 'Light flake garage floor used as a home gym', ''],
        ['sports-garage', 'White car in a garage with smooth gray floor', ''],
        ['flake-texture-grey', 'Gray and white flake blend close-up', ''],
        ['flake-texture-tan', 'Tan, brown and cream flake blend', ''],
        ['flake-texture-terracotta', 'Terracotta and black flake blend', 'wide'],
      ]],
      ['Residential and decorative', [
        ['metallic-room', 'Metallic epoxy in a large attic-style room', 'wide'],
        ['metallic-texture-silver', 'Silver and charcoal metallic swirls', 'tall'],
        ['metallic-texture-caramel', 'Caramel and bronze metallic swirls', ''],
        ['basement-living', 'Family room with seamless coated floor', ''],
        ['game-room', 'Game room with polished floor and pool table', ''],
        ['laundry', 'Laundry room with light floor', ''],
        ['metallic-texture-gold', 'Gold and blue metallic marble effect', ''],
        ['mudroom', 'Mudroom with durable floor', ''],
      ]],
      ['Commercial and industrial', [
        ['showroom-gloss', 'Bright commercial room with reflective floor', 'wide'],
        ['car-showroom', 'Car showroom with glossy dark floor', ''],
        ['salon', 'Salon with colored resinous floor', ''],
        ['metallic-lobby', 'Lobby with flowing metallic floor', ''],
        ['factory-mezzanine', 'Industrial floor with mezzanine and lane markings', 'wide'],
        ['warehouse-gloss', 'Large warehouse with reflective floor', ''],
        ['auto-shop-lifts', 'Service bays with lift pads and striping', ''],
        ['hangar', 'Small aircraft in a hangar with blue floor', 'tall'],
        ['fleet-hall', 'Maintenance hall with truck and floor markings', ''],
        ['kitchen-commercial', 'Commercial stainless steel kitchen', ''],
      ]],
      ['Outdoor', [
        ['patio-gray', 'Modern patio with gray coated concrete', 'wide'],
        ['patio-covered', 'Covered patio opening to a desert garden', ''],
        ['patio-lounge', 'Outdoor lounge on a smooth slab', ''],
      ]],
    ];
    const mosaics = groups
      .map(
        ([h, items], gi) => `<section class="section${gi % 2 ? ' tone-ivory' : ''}" aria-labelledby="g${gi}"><div class="wrap"><div class="section-head reveal"><h2 id="g${gi}">${h}</h2></div><div class="mosaic reveal">${items
          .map(
            ([s, alt, sz]) =>
              `<figure class="mosaic__item${sz === 'wide' ? ' is-wide' : ''}${sz === 'tall' ? ' is-tall' : ''}"><button type="button" class="mosaic__btn" data-lightbox="/images/${s}-1600.webp" data-caption="${esc(alt)}" aria-label="Enlarge: ${esc(alt)}">${img(s, alt, { sizes: '(min-width: 900px) 33vw, 50vw' })}</button><figcaption>${esc(alt)}</figcaption></figure>`,
          )
          .join('')}</div></div></section>`,
      )
      .join('\n');
    const tabs = beforeAfterSliders.map((p, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-controls="gba-${i}" id="gba-tab-${i}">${esc(p.tab)}</button>`).join('');
    const panels = beforeAfterSliders.map((p, i) => `<div role="tabpanel" id="gba-${i}" aria-labelledby="gba-tab-${i}"${i ? ' hidden' : ''}>${compareSlider(p)}</div>`).join('');
    out.push({
      path,
      title: 'Epoxy Floor Gallery | Garage, Metallic, Commercial & Outdoor Finishes',
      description:
        'Browse epoxy and floor coating finishes: flake garages, metallic interiors, commercial and industrial floors, outdoor coatings, and before-and-after comparisons.',
      preload: 'metallic-room',
      body: `<section class="page-hero"><div class="wrap">${breadcrumbs(trail)}<h1>Floor coating gallery</h1><p class="lede">Finishes, settings and before-and-after comparisons to help you picture what is possible on your own slab. Select any photo to view it larger.</p><p class="disclaimer" style="margin-top:1rem">Images are licensed stock photography and clearly labeled rendered illustrations, shown to illustrate finishes and settings. They are not presented as our completed projects. Real project photos will be added as jobs are documented.</p></div></section>
<section class="section tone-sand" id="before-after" aria-labelledby="gba-h"><div class="wrap"><div class="section-head reveal"><h2 id="gba-h">Before and after</h2><p>Sliders compare the same rendered room with and without a coating. Photo pairs compare similar real spaces.</p></div><div class="ba-main reveal"><div class="ba-tabs" role="tablist" aria-label="Choose a comparison" data-ba-tabs>${tabs}</div>${panels}</div><div class="pairs reveal">${beforeAfterPairs.map(comparePair).join('')}</div></div></section>
${mosaics}
${ctaSection({ h2: 'See something you like?', body: ['Tell us which finish caught your eye and where it would go. We will bring physical samples to the estimate.'], source: 'gallery' })}`,
      schema: [breadcrumbSchema(trail)],
    });
  }

  // ---------------------------------------------------------------- contact
  {
    const path = '/contact/';
    const trail = crumbs('Contact', path);
    out.push({
      path,
      title: 'Contact Us | Free Epoxy Flooring Estimates in Phoenix, AZ',
      description:
        'Request a free floor coating estimate in Phoenix and the surrounding Valley. Tell us about your garage, home, commercial or industrial floor and we will follow up.',
      body: `<section class="page-hero"><div class="wrap">${breadcrumbs(trail)}<h1>Request a free estimate</h1><p class="lede">Tell us about your floor and we will follow up to schedule a visit. Every estimate includes a look at the slab and a written recommendation.</p></div></section>
<section class="section" style="padding-top:0" aria-label="Contact details and form"><div class="wrap contact-grid">
<div class="reveal">
<h2>How to reach us</h2>
<ul class="contact-list">
<li><span>Phone</span>${phoneLink()}</li>
<li><span>Email</span>${emailLink()}</li>
<li><span>Hours</span>${esc(site.hours)}</li>
<li><span>Service area</span><span>Phoenix and surrounding Valley communities. <a href="/service-areas/">See the full list</a>.</span></li>
</ul>
<h2 style="font-size:var(--step-2)">What happens next</h2>
<ol class="steps" style="grid-template-columns:1fr;border-top:0">
<li class="step"><span class="step__n" aria-hidden="true">01</span><div><h3>We reply</h3><p>We get back to you to ask a few questions and set up a time to see the space.</p></div></li>
<li class="step"><span class="step__n" aria-hidden="true">02</span><div><h3>We look at the slab</h3><p>Measurements, moisture readings, cracks and existing coatings are checked on site, and you can see samples in your own light.</p></div></li>
<li class="step"><span class="step__n" aria-hidden="true">03</span><div><h3>You get a written proposal</h3><p>Prep method, system, coat count and schedule in plain language, ready to compare.</p></div></li>
</ol>
</div>
<div class="contact-card reveal">${estimateForm({ heading: 'Tell us about your project', intro: 'All fields except the message are required.', source: 'contact' })}</div>
</div></section>`,
      schema: [breadcrumbSchema(trail), { '@type': 'ContactPage', url: site.domain + path, name: 'Contact Phoenix AZ Epoxy Contractor' }],
    });
  }

  // ---------------------------------------------------------------- privacy
  {
    const path = '/privacy-policy/';
    const trail = crumbs('Privacy Policy', path);
    out.push({
      path,
      title: 'Privacy Policy | Phoenix AZ Epoxy Contractor',
      description: 'How Phoenix AZ Epoxy Contractor collects and uses the information you submit through our website estimate forms.',
      body: `<section class="page-hero"><div class="wrap">${breadcrumbs(trail)}<h1>Privacy policy</h1><div class="prose legal">
<p>This policy explains what information ${esc(site.name)} collects through this website and how it is used.</p>
<h2>Information you give us</h2><p>When you submit an estimate request, we receive the name, phone number, email address, project type and message you enter, along with the page you submitted it from. We use this information only to respond to your request, schedule an estimate and communicate about your project.</p>
<h2>How information is shared</h2><p>We do not sell your information. Form submissions are delivered to us through our website hosting and email or messaging providers, which process the data on our behalf.</p>
<h2>Cookies and analytics</h2><p>This website does not set advertising cookies. The embedded Google Map in the footer is provided by Google and is subject to Google’s own privacy policy when it loads.</p>
<h2>Your choices</h2><p>You can ask us to update or delete the information you submitted by contacting us using the details on our <a href="/contact/">contact page</a>.</p>
<h2>Changes</h2><p>We may update this policy as our website or practices change. The current version will always be posted on this page.</p>
</div></div></section>`,
      schema: [breadcrumbSchema(trail)],
    });
  }

  // ---------------------------------------------------------------- thank you (non-JS form fallback)
  out.push({
    path: '/thank-you/',
    noindex: true,
    title: 'Request Received | Phoenix AZ Epoxy Contractor',
    description: 'Your estimate request has been received.',
    body: `<section class="section notfound"><div class="wrap"><h1>Request received</h1><p class="lede" style="margin-inline:auto">Thanks for reaching out. We have your details and will be in touch to talk through your floor.</p><div class="btn-row" style="justify-content:center"><a class="btn btn--primary" href="/">Back to the homepage</a><a class="btn btn--quiet" href="/gallery/">Browse the gallery</a></div></div></section>`,
  });

  // ---------------------------------------------------------------- 404
  out.push({
    path: '/404',
    noindex: true,
    title: 'Page Not Found | Phoenix AZ Epoxy Contractor',
    description: 'The page you were looking for could not be found.',
    body: `<section class="section notfound"><div class="wrap"><h1>That page isn’t here</h1><p class="lede" style="margin-inline:auto">The link may be old or mistyped. These pages will get you back on track.</p><div class="btn-row" style="justify-content:center"><a class="btn btn--primary" href="/">Homepage</a><a class="btn btn--quiet" href="/services/">All services</a><a class="btn btn--quiet" href="/contact/">Contact</a></div></div></section>`,
  });

  return out;
}
