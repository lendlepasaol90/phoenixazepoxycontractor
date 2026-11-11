// Before/after material shared by the homepage, gallery and service pages.

// Same-scene renders: identical camera and room, only the floor changes.
export const sliders = {
  garageFlake: {
    tab: 'Garage: flake',
    before: 'render-garage-before',
    after: 'render-garage-flake',
    beforeAlt: 'Rendered garage with stained, cracked bare concrete floor',
    afterAlt: 'The same rendered garage with a tan full-broadcast flake floor and clear topcoat',
    caption: 'Two-car garage, stained slab to full-broadcast flake',
    note: '(rendered illustration)',
  },
  garageMetallic: {
    tab: 'Garage: metallic',
    before: 'render-garage-before',
    after: 'render-garage-metallic',
    beforeAlt: 'Rendered garage with stained, cracked bare concrete floor',
    afterAlt: 'The same rendered garage with a bronze and cream metallic epoxy floor',
    caption: 'Garage workshop, stained slab to bronze metallic epoxy',
    note: '(rendered illustration)',
  },
  showroom: {
    tab: 'Commercial showroom',
    before: 'render-showroom-before',
    after: 'render-showroom-after',
    beforeAlt: 'Rendered commercial showroom with worn, blotchy concrete floor',
    afterAlt: 'The same rendered showroom with a pearl metallic epoxy floor reflecting the ceiling lights',
    caption: 'Retail showroom, worn concrete to pearl metallic',
    note: '(rendered illustration)',
  },
  warehouse: {
    tab: 'Warehouse aisle',
    before: 'render-warehouse-before',
    after: 'render-warehouse-after',
    beforeAlt: 'Rendered warehouse aisle with stained bare concrete between pallet racks',
    afterAlt: 'The same rendered warehouse aisle with a gray coated floor and yellow aisle striping',
    caption: 'Warehouse aisle, bare slab to gray coating with safety striping',
    note: '(rendered illustration)',
  },
};

export const beforeAfterSliders = [sliders.garageFlake, sliders.garageMetallic, sliders.showroom, sliders.warehouse];

// Licensed stock photos of similar (not identical) spaces.
export const pairs = {
  garageTwoCar: {
    title: 'Two-car garage',
    before: 'garage-bare-before-2',
    after: 'garage-flake-white',
    beforeAlt: 'White-walled garage with a stained, worn bare concrete floor',
    afterAlt: 'Similar garage finished with a gray full-flake floor',
    caption: 'Oil shadows and worn cement paste give way to a uniform flake surface that hides dust between sweeps.',
  },
  garageGym: {
    title: 'Garage and home gym',
    before: 'garage-bare-before',
    after: 'garage-flake-gym',
    beforeAlt: 'Empty single garage with blotchy, patched bare concrete',
    afterAlt: 'Garage with light flake floor used as a home gym',
    caption: 'A light flake blend brightens the room and makes a garage feel like part of the house.',
  },
  commercial: {
    title: 'Office to showroom',
    before: 'office-before',
    after: 'showroom-gloss',
    beforeAlt: 'Office with a mottled, unfinished concrete floor',
    afterAlt: 'Commercial space with a smooth, reflective light gray floor',
    caption: 'Smooth, light-reflective finishes suit storefronts, studios and offices that want polish without tile grout lines.',
  },
  patio: {
    title: 'Covered patio',
    before: 'patio-before',
    after: 'patio-gray',
    beforeAlt: 'Patio with weathered stamped concrete and a fire pit',
    afterAlt: 'Modern patio with a smooth gray coated concrete surface',
    caption: 'UV-stable coatings with texture refresh tired outdoor slabs without trapping heat in a dark color.',
  },
};

export const beforeAfterPairs = [pairs.garageTwoCar, pairs.garageGym, pairs.commercial, pairs.patio];
