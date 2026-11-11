import { site, areas } from '../site.config.mjs';
import { img, esc, phoneLink, compareSlider, comparePair, layerDiagram, faqBlock, faqSchema } from '../lib/components.mjs';
import { ctaSection } from '../lib/blocks.mjs';
import { beforeAfterSliders, beforeAfterPairs } from './shared.mjs';

const homeFaqs = [
  {
    q: 'How long does an epoxy garage floor last in Phoenix?',
    a: [
      'A properly prepared, multi-coat system in a residential garage commonly lasts well over a decade, and many go much longer with ordinary care. The two biggest variables are prep and topcoat. A floor that was diamond-ground and finished with a UV-stable topcoat will age very differently from one that was acid-washed and rolled with a single coat of epoxy paint.',
      'Heavy hot-tire traffic, dragging equipment, and direct afternoon sun through an open door all shorten service life. We talk through those conditions during the estimate so the system matches how the garage is actually used.',
    ],
  },
  {
    q: 'Will the coating peel when hot tires park on it?',
    a: [
      'Hot-tire pickup happens when tire rubber, softened by heat, bonds to a weak coating and lifts it when the car pulls out. It is almost always a sign of thin product, poor adhesion, or both. Grinding the slab open and using a primer that penetrates the concrete, followed by a full-build base coat and a hard topcoat, is the reliable way to avoid it. In Phoenix, where tires come off 115°F asphalt, we treat this as a baseline requirement rather than an upgrade.',
    ],
  },
  {
    q: 'Can you coat a floor during the summer?',
    a: [
      'Yes, with adjustments. Heat shortens working time, so summer installs usually start early in the morning, mixes are smaller, and slab temperature is checked before each coat rather than assumed. Monsoon humidity matters too: the slab needs to stay above the dew point while the coating cures, or the surface can blush and lose gloss. If conditions on the day are wrong, the right call is to wait.',
    ],
  },
  {
    q: 'What is the difference between epoxy and polyaspartic?',
    a: [
      'Epoxy builds thickness well, bonds strongly to prepared concrete and costs less per gallon, but it is not UV-stable and will amber with sun exposure. Polyaspartic cures much faster, resists UV yellowing and handles temperature swings well, but it gives the installer less working time. Many of the floors we recommend use both: an epoxy or polyaspartic base, then a polyaspartic topcoat that faces the sunlight.',
    ],
  },
  {
    q: 'Do you have to grind the concrete? Can\'t it just be cleaned and etched?',
    a: [
      'Acid etching can work on some slabs, but it is inconsistent: it does little against sealers, curing compounds or oil-soaked areas, and it leaves salts that need to be rinsed completely. Diamond grinding removes the weak top layer and produces a measurable profile across the whole floor. It is the step we are least willing to skip, because nearly every coating failure we are asked to look at traces back to prep.',
    ],
  },
  {
    q: 'How soon can we use the floor again?',
    a: [
      'It depends on the chemistry. Polyaspartic systems are usually ready for foot traffic within a few hours and for vehicles in roughly a day or two. Standard epoxy systems typically allow light foot traffic after about a day and vehicles after several days, with full chemical resistance taking about a week. Temperature changes all of these numbers, so you will get specific timing for your floor before work begins.',
    ],
  },
  {
    q: 'Is a coated floor slippery?',
    a: [
      'A smooth high-gloss coating can be slick when wet, which is why texture is part of the conversation. Flake floors are naturally grippier, and anti-slip aggregate can be added to the topcoat of any system. Patios, pool decks and commercial entries almost always get added texture; interior living spaces often do not need it.',
    ],
  },
  {
    q: 'Do you offer free estimates across the Valley?',
    a: [
      `Yes. Estimates are free throughout Phoenix and the surrounding communities listed on our <a href="/service-areas/">service areas</a> page. Use the estimate form or call ${esc(site.phone.display)} and we will set up a time to look at the slab.`,
    ],
  },
];

const icons = {
  sun: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="16" cy="16" r="6"/><path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M6.8 25.2l2.8-2.8M22.4 9.6l2.8-2.8"/></svg>',
  drop: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M16 4c5 6.5 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8.5 8-15z"/><path d="M12 20a4 4 0 0 0 4 4"/></svg>',
  broom: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 4l-6 12M9 16h12l3 12H6z"/><path d="M11 22v6M15 22v6M19 22v6"/></svg>',
  light: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M11 21a8 8 0 1 1 10 0v3H11z"/><path d="M12 28h8"/></svg>',
  shield: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M16 3l10 4v8c0 7-4.5 11.5-10 14C10.5 26.5 6 22 6 15V7z"/><path d="M11.5 16l3 3 6-6.5"/></svg>',
  grid: '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="4" y="4" width="10" height="10" rx="2"/><rect x="18" y="4" width="10" height="10" rx="2"/><rect x="4" y="18" width="10" height="10" rx="2"/><rect x="18" y="18" width="10" height="10" rx="2"/></svg>',
};

export function homePage(services) {
  const tabs = beforeAfterSliders
    .map((p, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-controls="ba-${i}" id="ba-tab-${i}">${esc(p.tab)}</button>`)
    .join('');
  const panels = beforeAfterSliders
    .map((p, i) => `<div role="tabpanel" id="ba-${i}" aria-labelledby="ba-tab-${i}"${i ? ' hidden' : ''}>${compareSlider(p, { start: 52 })}</div>`)
    .join('');

  const body = `
<section class="hero" aria-labelledby="hero-h">
  <div class="wrap hero__grid">
    <div class="hero__text">
      <h1 id="hero-h" data-in="1">Concrete floors finished for the way Phoenix lives.</h1>
      <p class="hero__lede" data-in="2">Garage floors, home interiors, shops and warehouses coated with epoxy, polyaspartic and polyurea systems that are chosen for desert heat, prepared by diamond grinding, and built to keep looking good when the slab hits triple digits.</p>
      <div class="btn-row" data-in="3">
        <button type="button" class="btn btn--primary" data-open-estimate>Request a free estimate</button>
        <a class="btn btn--quiet" href="#transformations">See before and after</a>
      </div>
      <ul class="hero__systems" data-in="4" aria-label="Popular floor systems">
        <li><a href="/garage-epoxy-flooring/">Garage floors</a></li>
        <li><a href="/decorative-flake-epoxy-flooring/">Flake</a></li>
        <li><a href="/metallic-epoxy-flooring/">Metallic</a></li>
        <li><a href="/polyaspartic-floor-coatings/">Polyaspartic</a></li>
        <li><a href="/commercial-epoxy-flooring/">Commercial</a></li>
      </ul>
    </div>
    <div class="hero__visual">
      <div class="hero__sun" aria-hidden="true"></div>
      <div class="hero__arch">${img('garage-flake-gym', 'Bright two-car garage with a light gray decorative flake epoxy floor, home gym equipment on a rug and white garage doors', { eager: true, priority: true, sizes: '(min-width: 960px) 46vw, 100vw' })}</div>
      <div class="hero__chip">
        <div class="hero__chip-img">${img('flake-texture-tan', 'Close-up of tan, brown, black and white vinyl flake chips under a clear coat', { sizes: '190px' })}</div>
        <p>Full-broadcast flake under a UV-stable clear coat</p>
      </div>
    </div>
  </div>
</section>

<section class="intro" aria-labelledby="intro-h">
  <div class="wrap">
    <div class="intro__grid">
      <div class="reveal">
        <h2 id="intro-h">A flooring contractor that starts with the slab, not the color chart.</h2>
        <p class="intro__lead">Most people call us about how a floor will look. We spend the first visit on what's underneath it.</p>
      </div>
      <div class="prose reveal">
        <p>${esc(site.name)} installs resinous floor coatings across Phoenix and the wider Valley: decorative flake garages, metallic epoxy living spaces, polyaspartic one-day systems, and hard-working floors for shops, showrooms and warehouses. The finish is what you see every day, but the long-term result is decided earlier, by how the concrete is opened up, repaired and primed before a single color goes down.</p>
        <p>That is why every project begins with a look at the slab itself. We check for moisture, old sealers, oil, cracks, spalling and the high and low spots that will show through a glossy finish. Then we recommend a system for the space you actually have, not the one in a brochure. Sometimes that means a premium metallic floor. Sometimes it means a simple, tough two-coat system that will outlast a fancier option in a busy shop.</p>
        <p>We write estimates in plain language, including the prep method, the number of coats and the products in each layer, so you can compare quotes on what really matters.</p>
      </div>
    </div>
    <div class="counters reveal" aria-label="At a glance">
      <div class="counter"><div class="counter__n" data-count="13">13</div><p>Dedicated floor coating services, from garages to warehouse aisles</p></div>
      <div class="counter"><div class="counter__n" data-count="15">15</div><p>Valley communities on our regular service map</p></div>
      <div class="counter"><div class="counter__n" data-count="5">5</div><p>Distinct layers in a typical full-flake garage system</p></div>
      <div class="counter"><div class="counter__n" data-count="1">1</div><p>Day for many polyaspartic garage installs, start to finish</p></div>
    </div>
  </div>
</section>

<section class="section tone-sand" aria-labelledby="why-h">
  <div class="wrap why__grid">
    <div class="why__media reveal">
      <div class="main">${img('grinder-crew', 'Installer running a diamond floor grinder across a dusty concrete slab', { sizes: '(min-width: 900px) 40vw, 100vw' })}</div>
      <div class="sub">${img('crew-squeegee', 'Gloved hand pulling a squeegee through fresh gray floor coating', { sizes: '240px' })}</div>
    </div>
    <div class="reveal">
      <h2 id="why-h">Why professional epoxy flooring is worth it</h2>
      <div class="prose">
        <p>Hardware-store kits promise a weekend project, and on a small, clean, unsealed slab they can produce a decent result for a while. The trouble is what they are built from. Many are water-based or low-solids epoxy paints applied a few mils thick over concrete that has only been washed or etched. In a Phoenix garage, that thin film sits under hot tires, temperature swings and sun through the open door, and it is usually the first thing to fail.</p>
        <p>A professionally installed floor is a different product. The concrete is mechanically ground so the primer can soak in. Cracks are repaired. Each layer is a higher-solids material applied at a measured thickness, and the top layer is selected for UV and abrasion resistance. The difference shows up a few summers later, when one floor is lifting at the tire lines and the other still cleans up with a mop.</p>
      </div>
      <div class="vs">
        <div><h3>Typical DIY kit</h3><ul><li>Wash or acid etch only</li><li>Thin, single-coat epoxy paint</li><li>Decorative flake sprinkled lightly</li><li>Often no topcoat, or one not built for UV</li></ul></div>
        <div><h3>Professional system</h3><ul><li>Diamond grinding to a measured profile</li><li>Crack, joint and spall repair</li><li>Primer, full-build base and broadcast</li><li>UV-stable polyaspartic or urethane topcoat</li></ul></div>
      </div>
    </div>
  </div>
</section>

<section class="section floors" aria-labelledby="floors-h">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 id="floors-h">Floors we install around Phoenix</h2>
      <p>Different rooms ask different things of a floor. A garage needs grip and hot-tire resistance, a living space needs a finish you want to look at, and a warehouse needs to survive forklifts. Here is how we approach the most common projects.</p>
    </div>

    <article class="floors__feature reveal" aria-labelledby="garage-h">
      <div class="floors__img">${img('garage-flake-white', 'Clean three-car garage with gray decorative flake floor, white doors and overhead LED lighting', { sizes: '(min-width: 960px) 60vw, 100vw' })}</div>
      <div class="floors__text">
        <h3 id="garage-h">Garage epoxy flooring</h3>
        <p>The garage is where most of our work happens, and it's the hardest-working room in a desert home. It takes hot tires, dripping coolant, monsoon dust, pool chemicals and the occasional dropped wrench, often while the door is open to the afternoon sun.</p>
        <p>Our standard garage floor is a ground, primed, full-broadcast flake system with a polyaspartic topcoat. It hides dust between sweeps, gives tires and shoes some grip, and won't yellow where daylight reaches it. Solid colors and metallic finishes are available for owners who want a cleaner, showroom look.</p>
        <a class="textlink" href="/garage-epoxy-flooring/">Garage epoxy flooring</a>
      </div>
    </article>

    <article class="floors__feature is-flipped reveal" aria-labelledby="res-h">
      <div class="floors__img">${img('basement-living', 'Modern living room with a light seamless coated concrete floor, gray sectional and wall-mounted TV', { sizes: '(min-width: 960px) 60vw, 100vw' })}</div>
      <div class="floors__text">
        <h3 id="res-h">Residential epoxy flooring</h3>
        <p>Inside the house, a coated concrete floor is a design decision as much as a practical one. Seamless floors suit the open, modern plans common in newer Phoenix builds, and they are easy to keep clean when dust blows in from the yard.</p>
        <p>We coat living areas, laundry rooms, casitas, home gyms, mudrooms and converted garages, with finishes ranging from quiet satin solids to metallic floors with real depth. Interior work involves more attention to odor, edge detail and furniture moves, and we plan for that up front.</p>
        <a class="textlink" href="/residential-epoxy-flooring/">Residential epoxy flooring</a>
      </div>
    </article>

    <div class="floors__grid">
      <article class="floor-tile reveal" aria-labelledby="com-h">
        <div class="floor-tile__img">${img('showroom-gloss', 'Bright commercial room with tall windows reflected in a glossy light gray floor', { sizes: '(min-width: 960px) 20vw, 50vw' })}</div>
        <div>
          <h3 id="com-h">Commercial epoxy flooring</h3>
          <p>Retail floors, showrooms, offices, salons, clinics and restaurant back-of-house areas each need a balance of appearance, slip resistance and cleanability. We also schedule around your hours, including evening and weekend work where it keeps the doors open.</p>
          <a class="textlink" href="/commercial-epoxy-flooring/">Commercial flooring</a>
        </div>
      </article>
      <article class="floor-tile reveal" aria-labelledby="ind-h">
        <div class="floor-tile__img">${img('factory-mezzanine', 'Industrial space with mezzanine and glossy gray coated floor marked with yellow dashed lines', { sizes: '(min-width: 960px) 20vw, 50vw' })}</div>
        <div>
          <h3 id="ind-h">Industrial flooring solutions</h3>
          <p>Manufacturing floors, warehouses and fleet bays get thicker, harder systems built around their loads and chemicals, with safety striping and marked walkways laid out with your team. Moisture-tolerant primers and joint treatments matter more here than color.</p>
          <a class="textlink" href="/industrial-epoxy-flooring/">Industrial flooring</a>
        </div>
      </article>
      <article class="floor-tile reveal" aria-labelledby="met-h">
        <div class="floor-tile__img">${img('metallic-texture-caramel', 'Swirling caramel, cream and bronze metallic epoxy pattern', { sizes: '(min-width: 960px) 20vw, 50vw' })}</div>
        <div>
          <h3 id="met-h">Decorative and metallic epoxy</h3>
          <p>Metallic pigments suspended in clear epoxy move as the floor levels, creating soft veining, ripples and depth that no two floors share. Warm bronzes and sandstones look at home in desert interiors; cooler pearls and charcoals suit modern spaces.</p>
          <a class="textlink" href="/metallic-epoxy-flooring/">Metallic epoxy</a>
        </div>
      </article>
      <article class="floor-tile reveal" aria-labelledby="flake-h">
        <div class="floor-tile__img">${img('flake-texture-grey', 'Close-up of gray, white and black decorative vinyl flakes in an epoxy floor', { sizes: '(min-width: 960px) 20vw, 50vw' })}</div>
        <div>
          <h3 id="flake-h">Flake epoxy flooring</h3>
          <p>Vinyl chips broadcast into a wet base coat until the surface is completely covered, then sealed under a clear topcoat. The texture is forgiving, the color blends hide dust and tire marks, and blend size can be tuned from fine to bold.</p>
          <a class="textlink" href="/decorative-flake-epoxy-flooring/">Flake flooring</a>
        </div>
      </article>
    </div>
  </div>
</section>

<section class="section tone-ivory" aria-labelledby="prep-h">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 id="prep-h">Concrete preparation and floor coatings</h2>
      <p>Coatings stick to concrete, not to dust, sealers or laitance. Before anything is applied, the slab is diamond-ground to an open, consistent profile. Cracks are routed and filled, spalls are rebuilt, and moisture readings tell us which primer belongs on the floor. Pick a system below to see what goes into it, layer by layer.</p>
    </div>
    <div class="reveal">${layerDiagram()}</div>
    <p class="reveal" style="margin-top:1.5rem;max-width:72ch;color:var(--basalt-2)">Need prep or repair on its own, ahead of tile, polished concrete or another trade? See <a href="/concrete-floor-preparation-repair/">concrete floor preparation and repair</a> or our broader <a href="/concrete-floor-coatings/">concrete floor coatings</a> options.</p>
  </div>
</section>

<section class="section" aria-labelledby="process-h">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 id="process-h">Our installation process</h2>
      <p>Most residential garages take one to three days depending on the system. Larger or commercial projects are phased. Either way, the order of operations stays the same.</p>
    </div>
    <ol class="steps reveal">
      <li class="step"><span class="step__n" aria-hidden="true">01</span><div><h3>Site visit and slab assessment</h3><p>We measure, check moisture and hardness, note cracks and old coatings, and ask how the space is used. That conversation shapes the system more than anything else.</p></div></li>
      <li class="step"><span class="step__n" aria-hidden="true">02</span><div><h3>Written scope and color selection</h3><p>You get a plain-language proposal listing prep, products and coat count. Flake blends and metallic colors are chosen from physical samples, ideally viewed in your own light.</p></div></li>
      <li class="step"><span class="step__n" aria-hidden="true">03</span><div><h3>Diamond grinding and repairs</h3><p>Dust-controlled grinding opens the surface. Cracks, joints, pits and spalls are filled and ground flush, and the floor is vacuumed until it is clean enough to coat.</p></div></li>
      <li class="step"><span class="step__n" aria-hidden="true">04</span><div><h3>Primer and base coats</h3><p>Primer goes on first to penetrate the profile, followed by the pigmented base. On flake floors, chips are broadcast into the wet base until the surface is fully covered.</p></div></li>
      <li class="step"><span class="step__n" aria-hidden="true">05</span><div><h3>Topcoat and texture</h3><p>Excess flake is scraped and vacuumed, then the clear topcoat is applied. Anti-slip aggregate is added where the space calls for it, along with stem walls and coved edges if included.</p></div></li>
      <li class="step"><span class="step__n" aria-hidden="true">06</span><div><h3>Cure, walkthrough and care</h3><p>We walk the finished floor with you, confirm when foot traffic and vehicles can return, and leave simple instructions on cleaners to use and the few to avoid.</p></div></li>
    </ol>
  </div>
</section>

<section class="section tone-sand" aria-labelledby="benefits-h">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 id="benefits-h">What a well-built coating gives you</h2>
      <p>Each of these depends on the right system for the space. A floor chosen for looks alone may not deliver all of them.</p>
    </div>
    <div class="benefits reveal">
      <div class="benefit">${icons.broom}<h3>Easier cleanup</h3><p>A sealed, non-porous surface doesn't hold dust or absorb spills. Most days a dust mop is enough, and a damp mop handles the rest.</p></div>
      <div class="benefit">${icons.drop}<h3>Stain and chemical resistance</h3><p>Oil, coolant, brake fluid, fertilizer and pool chemicals wipe up instead of soaking into bare concrete and leaving a permanent shadow.</p></div>
      <div class="benefit">${icons.light}<h3>A brighter room</h3><p>Light-colored and glossy floors bounce overhead light back into the space, which makes workbenches, closets and storage walls easier to use.</p></div>
      <div class="benefit">${icons.shield}<h3>Protection for the slab</h3><p>A coating takes the abrasion and impact that would otherwise dust, pit and wear the concrete surface over time.</p></div>
      <div class="benefit">${icons.grid}<h3>Room to customize</h3><p>Flake blend, chip size, solid color, metallic movement, sheen, texture and line striping can all be tuned to the space.</p></div>
      <div class="benefit">${icons.sun}<h3>Heat and UV tolerance</h3><p>With the right topcoat, a floor can handle summer slab temperatures and sun exposure without softening or yellowing.</p></div>
    </div>
  </div>
</section>

<section class="section block-climate" aria-labelledby="climate-h" style="padding:0">
  <div class="climate">
    <div class="climate__media">${img('desert-twilight', 'Saguaro and cholla cactus against desert mountains at twilight near Phoenix', { sizes: '(min-width: 960px) 45vw, 100vw' })}</div>
    <div class="climate__body reveal">
      <h2 id="climate-h">Phoenix climate and flooring considerations</h2>
      <p class="climate__intro">A floor coating that performs well in a mild climate can struggle here. The Valley regularly sees summer afternoons above 110°F, and a slab in direct sun can get far hotter than the air around it. These are the conditions we design around.</p>
      <ul class="climate__pts">
        <li><h3>Sun and UV exposure</h3><p>Standard epoxy ambers when sunlight reaches it, starting near the garage door. A polyaspartic or aliphatic urethane topcoat keeps the color true where the light lands.</p></li>
        <li><h3>Heat and slab movement</h3><p>Concrete expands and contracts with big daily temperature swings. Control joints are treated so they can still do their job, and coatings with some flexibility handle the movement better.</p></li>
        <li><h3>Dust and desert grit</h3><p>Fine dust gets everywhere, especially after a haboob. Flake and mid-tone colors disguise it, and the grit is one reason we favor abrasion-resistant topcoats over soft finishes.</p></li>
        <li><h3>Installation-day temperatures</h3><p>Heat shortens working time dramatically. Summer jobs start early, batches stay small, and slab temperature is measured instead of guessed.</p></li>
        <li><h3>Monsoon humidity and moisture</h3><p>Late-summer storms raise humidity and dew points. We check that the slab stays above the dew point during cure and test for moisture vapor coming up through older slabs.</p></li>
        <li><h3>Hot tires and hard water</h3><p>Tires arrive hot from the road, and hard-water spotting from car washing and drips is a fact of life. Both favor hard, well-bonded, easy-to-clean topcoats.</p></li>
      </ul>
    </div>
  </div>
</section>

<section class="section tone-sand" id="transformations" aria-labelledby="ba-h">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 id="ba-h">See the difference a professional epoxy floor can make</h2>
      <p>Bare concrete carries every oil stain, crack and patch from the life of the building. Once it has been ground smooth, repaired and coated, the same slab reads as a finished floor. Drag the handle to compare the same room before and after a coating system, then browse comparisons of similar garage, commercial and outdoor spaces below.</p>
    </div>
    <div class="ba-main reveal">
      <div class="ba-tabs" role="tablist" aria-label="Choose a comparison" data-ba-tabs>${tabs}</div>
      ${panels}
    </div>
    <div class="pairs reveal">${beforeAfterPairs.map(comparePair).join('')}</div>
    <p class="disclaimer">Slider comparisons are 3D-rendered illustrations of the same room before and after coating. Photo pairs are licensed stock images of similar spaces. Neither is presented as a completed project of ours; real project photos will be added as they are documented.</p>
    <div class="btn-row reveal"><button type="button" class="btn btn--primary" data-open-estimate>Start your own floor transformation</button><a class="btn btn--quiet" href="/gallery/">Browse the gallery</a></div>
  </div>
</section>

<section class="band" aria-labelledby="band-h">
  <div class="band__img" data-parallax>${img('metallic-room', 'Large attic-style room with a reflective gray and charcoal metallic epoxy floor and dark wood beams', { sizes: '100vw' })}</div>
  <div class="wrap band__inner">
    <div class="band__panel reveal">
      <h2 id="band-h">A floor worth stepping back to look at</h2>
      <p>Metallic epoxy turns a plain slab into the centerpiece of a room. Each pour is worked by hand, so the movement in your floor will be yours alone.</p>
      <div class="btn-row"><button type="button" class="btn btn--primary" data-open-estimate>Ask about metallic floors</button><a class="btn btn--ghost-light" href="/metallic-epoxy-flooring/">How metallic epoxy works</a></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="gallery-h">
  <div class="wrap">
    <div class="section-head reveal">
      <h2 id="gallery-h">Featured flooring gallery</h2>
      <p>A look at finishes and settings, from full-flake garages to reflective commercial floors. Select any image to see it larger.</p>
    </div>
    <div class="mosaic reveal">
      ${[
        ['garage-flake-white', 'Gray full-flake garage floor with white doors', 'Full-flake garage', 'wide'],
        ['metallic-texture-silver', 'Silver, white and charcoal swirls in a metallic epoxy finish', 'Metallic finish', 'tall'],
        ['warehouse-gloss', 'Large warehouse with reflective light gray coated floor', 'Warehouse floor', ''],
        ['flake-texture-terracotta', 'Terracotta, cream and black flake blend close-up', 'Desert flake blend', ''],
        ['hall-gloss', 'Long room with tall windows reflected in a smooth coated floor', 'Commercial gloss', ''],
        ['patio-gray', 'Modern outdoor patio with gray coated concrete and lounge furniture', 'Outdoor coating', 'wide'],
        ['car-showroom', 'Car showroom with glossy dark floor reflecting overhead lights', 'Showroom floor', ''],
        ['metallic-lobby', 'Curved lobby with a flowing gray and white metallic floor', 'Lobby metallic', ''],
        ['auto-shop-lifts', 'Auto service bay with gray coated floor, blue lift pads and yellow safety striping', 'Service bay striping', ''],
      ]
        .map(
          ([s, alt, cap, sz]) =>
            `<figure class="mosaic__item${sz === 'wide' ? ' is-wide' : ''}${sz === 'tall' ? ' is-tall' : ''}"><button type="button" class="mosaic__btn" data-lightbox="/images/${s}-1600.webp" data-caption="${esc(cap)}" aria-label="Enlarge: ${esc(alt)}">${img(s, alt, { sizes: '(min-width: 900px) 33vw, 50vw' })}</button><figcaption>${esc(cap)}</figcaption></figure>`,
        )
        .join('')}
    </div>
    <div class="btn-row reveal"><a class="btn btn--ghost" href="/gallery/">View the full gallery</a></div>
  </div>
</section>

<section class="section tone-ivory" aria-labelledby="areas-h">
  <div class="wrap areas__grid">
    <div class="areas__img reveal">${img('camelback', 'Camelback Mountain at sunrise above Phoenix neighborhoods', { sizes: '(min-width: 900px) 45vw, 100vw' })}</div>
    <div class="reveal">
      <h2 id="areas-h">Service areas around Phoenix</h2>
      <div class="prose">
        <p>We work throughout Phoenix and across the Valley, from older central neighborhoods with slabs that have decades of history to brand-new builds in the West Valley and the far Southeast. Newer construction often means a cleaner slab but tighter HOA timelines; older homes tend to bring sealers, paint and repairs to deal with first. Both are routine.</p>
        <p>If your city isn't listed, ask anyway. Larger commercial and industrial projects often take us farther out.</p>
      </div>
      <ul class="chips">${areas.map((a) => `<li><a href="/service-areas/#${a.slug}">${a.name}</a></li>`).join('')}</ul>
    </div>
  </div>
</section>

${faqBlock(homeFaqs, { heading: 'Frequently asked questions', intro: 'Short answers to what homeowners and business owners ask us most. Still wondering about something? Ask during your estimate.' })}

${ctaSection({
  h2: 'Tell us about your floor',
  body: [
    'Share a few details and we will follow up to schedule a visit. Photos of the slab are helpful, but not required. Every estimate includes a look at the concrete and a recommendation you can compare against other quotes line by line.',
  ],
  source: 'home',
})}`;

  return {
    title: 'Epoxy Flooring Phoenix AZ | Garage, Metallic & Commercial Floor Coatings',
    description:
      'Epoxy, flake, metallic and polyaspartic floor coatings in Phoenix, AZ. Diamond-ground prep, UV-stable topcoats and systems built for desert heat. Free estimates.',
    ogTitle: 'Phoenix AZ Epoxy Contractor — Garage, Residential & Commercial Floor Coatings',
    preload: 'garage-flake-gym',
    body,
    bodyClass: 'page-home',
    schema: [faqSchema(homeFaqs)],
  };
}
