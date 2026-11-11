// Central business details. Replace the placeholder values once the real
// contact information is confirmed — every page, schema block and form
// reads from this file.
export const site = {
  name: 'Phoenix AZ Epoxy Contractor',
  shortName: 'Phoenix AZ Epoxy',
  domain: 'https://phoenixazepoxycontractor.com',
  locale: 'en_US',
  city: 'Phoenix',
  region: 'AZ',

  // PLACEHOLDERS — not real contact details.
  phone: {
    display: '(XXX) XXX-XXXX',
    href: '', // e.g. 'tel:+16025550000' once a real number exists
    isPlaceholder: true,
  },
  email: {
    display: 'email@your-domain.com',
    href: '', // e.g. 'mailto:info@phoenixazepoxycontractor.com'
    isPlaceholder: true,
  },
  hours: 'Hours to be confirmed',

  // Leave false until a verified street address exists. Without it the
  // structured data uses service-area-business markup (no address).
  address: null,

  mapEmbed: 'https://www.google.com/maps?q=Phoenix,+Arizona&z=10&output=embed',
  ogImage: '/images/garage-flake-gym-1600.webp',
};

export const projectTypes = [
  'Garage floor',
  'Residential interior floor',
  'Metallic epoxy floor',
  'Decorative flake floor',
  'Polyaspartic coating',
  'Polyurea coating',
  'Patio or outdoor concrete',
  'Commercial space',
  'Industrial or warehouse floor',
  'Concrete grinding or repair',
  'Not sure yet',
];

export const areas = [
  { name: 'Phoenix', slug: 'phoenix' },
  { name: 'Scottsdale', slug: 'scottsdale' },
  { name: 'Tempe', slug: 'tempe' },
  { name: 'Mesa', slug: 'mesa' },
  { name: 'Chandler', slug: 'chandler' },
  { name: 'Gilbert', slug: 'gilbert' },
  { name: 'Glendale', slug: 'glendale' },
  { name: 'Peoria', slug: 'peoria' },
  { name: 'Paradise Valley', slug: 'paradise-valley' },
  { name: 'Avondale', slug: 'avondale' },
  { name: 'Goodyear', slug: 'goodyear' },
  { name: 'Surprise', slug: 'surprise' },
  { name: 'Fountain Hills', slug: 'fountain-hills' },
  { name: 'Queen Creek', slug: 'queen-creek' },
  { name: 'Apache Junction', slug: 'apache-junction' },
];
