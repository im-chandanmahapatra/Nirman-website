export type ResidenceTypology =
  | 'Ground Floor + Garden Deck'
  | 'Garden Residence'
  | 'Penthouse Duplex';

export interface ResidenceUnit {
  id: string;
  code: string;
  block: 'East Pavilion' | 'West Pavilion' | 'Ocean Crest';
  typology: ResidenceTypology;
  bedrooms: number;
  bathrooms: number;
  builtAreaSqm: number;
  terraceAreaSqm: number;
  totalAreaSqm: number;
  orientation: 'West Sea Breeze' | 'South Courtyard' | 'East Palm Grove';
  priceInrCr: number;
  priceDisplay: string;
  status: 'Available' | 'Reserved' | 'Last Unit';
  highlights: string[];
  image: string;
  floorplanVariant: 'garden-deck' | 'garden' | 'penthouse';
}

export interface HotspotPin {
  id: string;
  xPercent: number;
  yPercent: number;
  kicker: string;
  title: string;
  description: string;
  metric: string;
}

export interface ReasonSlide {
  id: string;
  title: string;
  description: string;
  caption: string;
  image: string;
}

export interface TypologySlide {
  id: string;
  name: ResidenceTypology;
  displayName: string;
  bedroomsLabel: string;
  areaUpTo: string;
  summary: string;
  ctaLabel: string;
  image: string;
}

export interface AmenityItem {
  id: string;
  tabLabel: string;
  kicker: string;
  headline: string;
  image: string;
}

export interface CredentialItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  entity: string;
}

export interface CoastalNode {
  id: string;
  label: string;
  duration: string;
  x: number;
  y: number;
  isPrimary?: boolean;
}

export const NIRMAN_IMAGES = {
  heroDay: '/src/assets/images/nirman_hero_sky_day_1794908441790.jpg',
  heroNight: '/src/assets/images/nirman_hero_sky_night_1794908442118.jpg',
  bougainvillea: '/src/assets/images/nirman_bougainvillea_corner_1794908441726.jpg',
  quoteDusk: '/src/assets/images/nirman_quote_dusk_pool_1794908442876.jpg',
  ctaPergola: '/src/assets/images/nirman_cta_pergola_sea_1794908443747.jpg',
  terraceSea: '/src/assets/images/nirman_terrace_sea_1794906508040.jpg',
  poolFacade: '/src/assets/images/nirman_pool_facade_1794906508799.jpg',
  aerialCoast: '/src/assets/images/nirman_aerial_coast_1794906509294.jpg',
  gardenLounge: '/src/assets/images/nirman_garden_lounge_1794906509931.jpg',
  rooftopDining: '/src/assets/images/nirman_rooftop_dining_1794906510091.jpg',
  facadeDetail: '/src/assets/images/nirman_facade_detail_1794906511035.jpg',
  interiorSuite: '/src/assets/images/nirman_interior_suite_1794906510076.jpg',
  spaPool: '/src/assets/images/nirman_spa_pool_1794906511677.jpg',
} as const;

export const HERO_HOTSPOTS: HotspotPin[] = [
  {
    id: 'light-flow',
    xPercent: 26.9,
    yPercent: 58.3,
    kicker: '01 — Light & Flow',
    title: 'Light & Flow',
    description:
      'Terraces, rooftop solariums and expansive openings maximize coastal daylight while creating a seamless indoor–outdoor lifestyle.',
    metric: '42 – 88 sq.m. private decks',
  },
  {
    id: 'crafted-to-endure',
    xPercent: 57.5,
    yPercent: 62.5,
    kicker: '02 — Material Permanence',
    title: 'Crafted to Endure',
    description:
      'Natural limestone and travertine façades were selected for their timeless appearance, salt-air durability, and ease of maintenance.',
    metric: 'Hand-dressed Shahabad & Travertine',
  },
  {
    id: 'private-sanctuary',
    xPercent: 76.6,
    yPercent: 73.2,
    kicker: '03 — Boutique Planning',
    title: 'Your Private Sanctuary',
    description:
      'Instead of corridors, shaded walking paths connect the apartments — making NIRMAN feel closer to a cluster of private homes than a standard complex.',
    metric: '25 residences · 1.8 acres',
  },
];

export interface ApartmentBenefitCard {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const APARTMENT_BENEFIT_CARDS: ApartmentBenefitCard[] = [
  {
    id: 'boutique-concept',
    title: 'Boutique concept',
    description:
      'A boutique gated community of 25 residences on Alibaug’s Mandwa coast, designed around privacy, wellbeing and timeless coastal living.',
    image: NIRMAN_IMAGES.facadeDetail,
  },
  {
    id: 'built-to-stay',
    title: 'Built to stay',
    description:
      'Drawing on the spirit of Konkan courtyard homes, the architecture blends natural stone with lush botanical landscaping and serene private spaces.',
    image: NIRMAN_IMAGES.terraceSea,
  },
  {
    id: 'walking-sanctuary',
    title: 'No enclosed corridors',
    description:
      'Instead of hallways, flowering stone garden paths link every home — creating the quiet intimacy of coastal villas across all three pavilions.',
    image: NIRMAN_IMAGES.gardenLounge,
  },
];

export const REASONS_SLIDES: ReasonSlide[] = [
  {
    id: 'real-life-location',
    title: 'REAL-LIFE LOCATION',
    description:
      'Quietly nestled off Mandwa Jetty Road in Alibaug, ten minutes from the Ro-Pax ferry terminal yet surrounded by centuries-old coconut groves and coastal breeze.',
    caption: '10 MIN TO MANDWA JETTY · 45 MIN TO MUMBAI',
    image: NIRMAN_IMAGES.terraceSea,
  },
  {
    id: 'built-to-stay',
    title: 'BUILT TO STAY',
    description:
      'Drawing on the spirit of coastal Konkan courtyard homes, the design blends natural limestone architecture with lush landscaping and thoughtfully crafted spaces.',
    caption: 'DESIGNED AS A COMMUNITY,\nNOT A COMPLEX',
    image: NIRMAN_IMAGES.terraceSea,
  },
  {
    id: 'boutique-concept',
    title: 'BOUTIQUE CONCEPT',
    description:
      'Limited strictly to twenty-five low-rise residences without enclosed corridors—every home opens directly to sunlit garden walkways and private sky terraces.',
    caption: 'ONLY 25 PRIVATE RESIDENCES',
    image: NIRMAN_IMAGES.poolFacade,
  },
];

export const COASTAL_DISTANCE_NODES: CoastalNode[] = [
  { id: 'mumbai', label: 'South Mumbai', duration: '45 min', x: 78, y: 170 },
  { id: 'mandwa', label: 'Mandwa Ferry', duration: '10 min', x: 255, y: 122 },
  { id: 'kihim', label: 'Kihim Beach', duration: '5 min', x: 435, y: 152 },
  { id: 'nirman', label: 'Nirman', duration: '', x: 615, y: 122, isPrimary: true },
  { id: 'alibaug', label: 'Alibaug Town', duration: '12 min', x: 795, y: 146 },
  { id: 'kashid', label: 'Kashid Bay', duration: '25 min', x: 965, y: 120 },
];

export const TYPOLOGIES: TypologySlide[] = [
  {
    id: 'ground-deck',
    name: 'Ground Floor + Garden Deck',
    displayName: 'GROUND FLOOR + DECK',
    bedroomsLabel: '2 & 3',
    areaUpTo: '218 sq.m.',
    summary:
      'Elevated garden residences featuring deep shaded verandas, private lawn decks, and dedicated lower-level studio suites opening onto a quiet sunken courtyard.',
    ctaLabel: 'Explore Garden Deck',
    image: NIRMAN_IMAGES.gardenLounge,
  },
  {
    id: 'garden-residence',
    name: 'Garden Residence',
    displayName: 'GARDEN RESIDENCE',
    bedroomsLabel: '2 & 3',
    areaUpTo: '172 sq.m.',
    summary:
      'Single-level coastal sanctuaries defined by floor-to-ceiling anodized sliding glazing, cross-ventilated living rooms, and direct stepping-stone pool access.',
    ctaLabel: 'Explore Garden',
    image: NIRMAN_IMAGES.poolFacade,
  },
  {
    id: 'penthouse-duplex',
    name: 'Penthouse Duplex',
    displayName: 'PENTHOUSE DUPLEX',
    bedroomsLabel: '2–3',
    areaUpTo: '124 – 243 m²',
    summary:
      'Two floors crowned with panoramic views, topped by sweeping rooftop pergola terraces overlooking Mandwa Bay and evening Arabian Sea horizons.',
    ctaLabel: 'Explore Penthouses',
    image: NIRMAN_IMAGES.terraceSea,
  },
];

export const AMENITIES: AmenityItem[] = [
  {
    id: 'gated',
    tabLabel: 'GATED COMMUNITY',
    kicker: 'GATED COMMUNITY',
    headline:
      'INSTEAD OF CORRIDORS, WALKING PATHS CONNECT THE APARTMENTS — MAKING NIRMAN RESIDENCE FEEL CLOSER TO A GROUP OF PRIVATE HOMES THAN A STANDARD COMPLEX.',
    image: NIRMAN_IMAGES.heroNight,
  },
  {
    id: 'pool',
    tabLabel: 'SWIMMING POOL',
    kicker: 'SWIMMING POOL',
    headline:
      'A 28-METRE HEATED MINERAL LAP POOL SURROUNDED BY SUNLIT TRAVERTINE DECKS, SHADED CABANAS, AND AN INTIMATE PLUNGE BASIN FOR QUIET MORNINGS.',
    image: NIRMAN_IMAGES.poolFacade,
  },
  {
    id: 'parking',
    tabLabel: 'PARKING AREA',
    kicker: 'SUBTERRANEAN ARRIVAL',
    headline:
      'VEHICLES DESCEND DIRECTLY INTO A COVERED BASEMENT WITH PRIVATE EV CHARGING BAYS, KEEPING THE ENTIRE GROUND PLANE PEDESTRIAN AND LUSH.',
    image: NIRMAN_IMAGES.facadeDetail,
  },
  {
    id: 'spa',
    tabLabel: 'SPA & GYM',
    kicker: 'WELLNESS PAVILION',
    headline:
      'NATURAL STONE STEAM CHAMBERS, AN INDOOR-OUTDOOR MOVEMENT STUDIO, AND PRIVATE TREATMENT ROOMS ORIENTED TOWARD TRANQUIL BAMBOO COURTYARDS.',
    image: NIRMAN_IMAGES.spaPool,
  },
  {
    id: 'landscaping',
    tabLabel: 'LANDSCAPING',
    kicker: 'KONKAN BOTANICALS',
    headline:
      'MATURE FRANGIPANI, ARECA PALMS, AND MAGENTA BOUGAINVILLEA TRELLISES DESIGNED TO DEEPEN IN FRAGRANCE AND PRIVACY WITH EVERY MONSOON.',
    image: NIRMAN_IMAGES.gardenLounge,
  },
];

export const INTERIOR_GALLERY = [
  {
    id: 'gallery-1',
    title: 'Indoor–Outdoor Living Salon',
    caption: 'Floor-to-ceiling pocket glazing dissolving the threshold to the sea veranda',
    image: NIRMAN_IMAGES.interiorSuite,
  },
  {
    id: 'gallery-2',
    title: 'Twilight Courtyard & Pool',
    caption: 'Warm architectural uplighting across limestone arches and palms',
    image: NIRMAN_IMAGES.heroNight,
  },
  {
    id: 'gallery-3',
    title: 'Wellness & Travertine Spa',
    caption: 'Fluted stone columns and calm acoustic water reflection pavilion',
    image: NIRMAN_IMAGES.spaPool,
  },
  {
    id: 'gallery-4',
    title: 'Rooftop Pergola Terrace',
    caption: 'Hand-crafted stone dining arbor overlooking the Arabian Sea',
    image: NIRMAN_IMAGES.rooftopDining,
  },
];

export const CREDENTIALS: CredentialItem[] = [
  {
    id: 'developer',
    title: 'Developer',
    subtitle: 'Nirman Estates Pvt. Ltd.',
    description:
      'An independent coastal residential house crafting low-density sanctuaries across Maharashtra and Goa with a focus on natural stone permanence and transparent stewardship.',
    entity: 'MahaRERA Reg. P52000084912',
  },
  {
    id: 'sales',
    title: 'Sales & Marketing',
    subtitle: 'Nirman Private Realty',
    description:
      'Dedicated private client advisory offering twilight site walkthroughs, speedboat transfers from Gateway of India, and bespoke interior customization consultations.',
    entity: '+91 (22) 4890-6480',
  },
  {
    id: 'license',
    title: 'License obtained',
    subtitle: 'Full Coastal & Municipal Clearances',
    description:
      'All environmental, coastal zone, and Raigad town-planning commencement approvals have been fully granted, with structural earthworks underway on site.',
    entity: 'CC & CRZ Approved',
  },
  {
    id: 'year',
    title: '2026',
    subtitle: 'Handover Horizon — Q4 2026',
    description:
      'Targeted handover for all 25 bespoke residences across East Pavilion, West Pavilion, and Ocean Crest, complete with landscaped gardens and wellness pavilion.',
    entity: 'Scheduled Completion',
  },
];

const unitImages: Record<ResidenceTypology, string> = {
  'Ground Floor + Garden Deck': NIRMAN_IMAGES.gardenLounge,
  'Garden Residence': NIRMAN_IMAGES.terraceSea,
  'Penthouse Duplex': NIRMAN_IMAGES.rooftopDining,
};

export const RESIDENCES: ResidenceUnit[] = [
  { id: 'n-101', code: 'N-101', block: 'East Pavilion', typology: 'Ground Floor + Garden Deck', bedrooms: 2, bathrooms: 2, builtAreaSqm: 132, terraceAreaSqm: 54, totalAreaSqm: 186, orientation: 'South Courtyard', priceInrCr: 5.4, priceDisplay: '₹5.40 Cr', status: 'Available', highlights: ['Private Lawn', 'Sunken Studio', 'EV Bay'], image: unitImages['Ground Floor + Garden Deck'], floorplanVariant: 'garden-deck' },
  { id: 'n-102', code: 'N-102', block: 'East Pavilion', typology: 'Ground Floor + Garden Deck', bedrooms: 3, bathrooms: 3, builtAreaSqm: 158, terraceAreaSqm: 60, totalAreaSqm: 218, orientation: 'West Sea Breeze', priceInrCr: 6.35, priceDisplay: '₹6.35 Cr', status: 'Available', highlights: ['Corner Garden', 'Staff Suite', 'Plunge Ready'], image: unitImages['Ground Floor + Garden Deck'], floorplanVariant: 'garden-deck' },
  { id: 'n-103', code: 'N-103', block: 'East Pavilion', typology: 'Garden Residence', bedrooms: 2, bathrooms: 2, builtAreaSqm: 112, terraceAreaSqm: 28, totalAreaSqm: 140, orientation: 'East Palm Grove', priceInrCr: 4.25, priceDisplay: '₹4.25 Cr', status: 'Available', highlights: ['Poolside Path', 'Lime Plaster', 'Smart Shading'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-104', code: 'N-104', block: 'East Pavilion', typology: 'Garden Residence', bedrooms: 3, bathrooms: 3, builtAreaSqm: 138, terraceAreaSqm: 34, totalAreaSqm: 172, orientation: 'South Courtyard', priceInrCr: 5.15, priceDisplay: '₹5.15 Cr', status: 'Reserved', highlights: ['Wrap Veranda', 'Teak Pergola', '2 EV Bays'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-105', code: 'N-105', block: 'East Pavilion', typology: 'Penthouse Duplex', bedrooms: 3, bathrooms: 3, builtAreaSqm: 164, terraceAreaSqm: 68, totalAreaSqm: 232, orientation: 'West Sea Breeze', priceInrCr: 7.4, priceDisplay: '₹7.40 Cr', status: 'Available', highlights: ['Sky Pergola', 'Mandwa Sunset', 'Private Lift'], image: unitImages['Penthouse Duplex'], floorplanVariant: 'penthouse' },
  { id: 'n-106', code: 'N-106', block: 'East Pavilion', typology: 'Garden Residence', bedrooms: 2, bathrooms: 2, builtAreaSqm: 104, terraceAreaSqm: 24, totalAreaSqm: 128, orientation: 'East Palm Grove', priceInrCr: 3.95, priceDisplay: '₹3.95 Cr', status: 'Available', highlights: ['Boutique Scale', 'Cross Breeze', 'Spa Access'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-107', code: 'N-107', block: 'East Pavilion', typology: 'Ground Floor + Garden Deck', bedrooms: 3, bathrooms: 3, builtAreaSqm: 152, terraceAreaSqm: 58, totalAreaSqm: 210, orientation: 'South Courtyard', priceInrCr: 6.1, priceDisplay: '₹6.10 Cr', status: 'Available', highlights: ['Garden Pavilion', 'Home Office', 'Storage Vault'], image: unitImages['Ground Floor + Garden Deck'], floorplanVariant: 'garden-deck' },
  { id: 'n-108', code: 'N-108', block: 'East Pavilion', typology: 'Penthouse Duplex', bedrooms: 4, bathrooms: 4, builtAreaSqm: 176, terraceAreaSqm: 68, totalAreaSqm: 244, orientation: 'West Sea Breeze', priceInrCr: 8.2, priceDisplay: '₹8.20 Cr', status: 'Last Unit', highlights: ['Panoramic Roof', 'Outdoor Kitchen', 'Sea Vista'], image: unitImages['Penthouse Duplex'], floorplanVariant: 'penthouse' },
  { id: 'n-201', code: 'N-201', block: 'West Pavilion', typology: 'Ground Floor + Garden Deck', bedrooms: 2, bathrooms: 2, builtAreaSqm: 126, terraceAreaSqm: 48, totalAreaSqm: 174, orientation: 'West Sea Breeze', priceInrCr: 5.1, priceDisplay: '₹5.10 Cr', status: 'Available', highlights: ['Private Patio', 'Stone Louvers', 'EV Bay'], image: unitImages['Ground Floor + Garden Deck'], floorplanVariant: 'garden-deck' },
  { id: 'n-202', code: 'N-202', block: 'West Pavilion', typology: 'Garden Residence', bedrooms: 2, bathrooms: 2, builtAreaSqm: 108, terraceAreaSqm: 26, totalAreaSqm: 134, orientation: 'South Courtyard', priceInrCr: 4.1, priceDisplay: '₹4.10 Cr', status: 'Available', highlights: ['Courtyard Facing', 'Travertine Floors', 'Acoustic Glazing'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-203', code: 'N-203', block: 'West Pavilion', typology: 'Garden Residence', bedrooms: 3, bathrooms: 3, builtAreaSqm: 134, terraceAreaSqm: 32, totalAreaSqm: 166, orientation: 'West Sea Breeze', priceInrCr: 4.95, priceDisplay: '₹4.95 Cr', status: 'Available', highlights: ['Sunset Terrace', 'Open Kitchen', 'Walk-in Closet'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-204', code: 'N-204', block: 'West Pavilion', typology: 'Penthouse Duplex', bedrooms: 3, bathrooms: 3, builtAreaSqm: 158, terraceAreaSqm: 62, totalAreaSqm: 220, orientation: 'West Sea Breeze', priceInrCr: 7.05, priceDisplay: '₹7.05 Cr', status: 'Available', highlights: ['Double Height', 'Pergola Bar', 'Sea Horizon'], image: unitImages['Penthouse Duplex'], floorplanVariant: 'penthouse' },
  { id: 'n-205', code: 'N-205', block: 'West Pavilion', typology: 'Ground Floor + Garden Deck', bedrooms: 3, bathrooms: 3, builtAreaSqm: 148, terraceAreaSqm: 56, totalAreaSqm: 204, orientation: 'East Palm Grove', priceInrCr: 5.85, priceDisplay: '₹5.85 Cr', status: 'Reserved', highlights: ['Shaded Veranda', 'Lower Lounge', '2 EV Bays'], image: unitImages['Ground Floor + Garden Deck'], floorplanVariant: 'garden-deck' },
  { id: 'n-206', code: 'N-206', block: 'West Pavilion', typology: 'Garden Residence', bedrooms: 2, bathrooms: 2, builtAreaSqm: 114, terraceAreaSqm: 28, totalAreaSqm: 142, orientation: 'South Courtyard', priceInrCr: 4.35, priceDisplay: '₹4.35 Cr', status: 'Available', highlights: ['Zero Corridors', 'Bespoke Joinery', 'Smart Home'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-207', code: 'N-207', block: 'West Pavilion', typology: 'Penthouse Duplex', bedrooms: 3, bathrooms: 4, builtAreaSqm: 168, terraceAreaSqm: 66, totalAreaSqm: 234, orientation: 'West Sea Breeze', priceInrCr: 7.65, priceDisplay: '₹7.65 Cr', status: 'Available', highlights: ['Corner Duplex', 'Outdoor Shower', 'Plunge Terrace'], image: unitImages['Penthouse Duplex'], floorplanVariant: 'penthouse' },
  { id: 'n-208', code: 'N-208', block: 'West Pavilion', typology: 'Garden Residence', bedrooms: 3, bathrooms: 3, builtAreaSqm: 136, terraceAreaSqm: 34, totalAreaSqm: 170, orientation: 'East Palm Grove', priceInrCr: 5.05, priceDisplay: '₹5.05 Cr', status: 'Available', highlights: ['Grove Views', 'Custom Kitchen', 'Direct Garden'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-301', code: 'N-301', block: 'Ocean Crest', typology: 'Ground Floor + Garden Deck', bedrooms: 3, bathrooms: 3, builtAreaSqm: 156, terraceAreaSqm: 60, totalAreaSqm: 216, orientation: 'West Sea Breeze', priceInrCr: 6.45, priceDisplay: '₹6.45 Cr', status: 'Available', highlights: ['Private Plunge', 'Studio Suite', 'Ocean Air'], image: unitImages['Ground Floor + Garden Deck'], floorplanVariant: 'garden-deck' },
  { id: 'n-302', code: 'N-302', block: 'Ocean Crest', typology: 'Garden Residence', bedrooms: 2, bathrooms: 2, builtAreaSqm: 116, terraceAreaSqm: 30, totalAreaSqm: 146, orientation: 'West Sea Breeze', priceInrCr: 4.55, priceDisplay: '₹4.55 Cr', status: 'Available', highlights: ['Sunset Balcony', 'Stone Arch', 'EV Bay'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-303', code: 'N-303', block: 'Ocean Crest', typology: 'Garden Residence', bedrooms: 3, bathrooms: 3, builtAreaSqm: 140, terraceAreaSqm: 32, totalAreaSqm: 172, orientation: 'South Courtyard', priceInrCr: 5.25, priceDisplay: '₹5.25 Cr', status: 'Available', highlights: ['Pool Overlook', 'Pocket Doors', 'Private Pantry'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-304', code: 'N-304', block: 'Ocean Crest', typology: 'Penthouse Duplex', bedrooms: 4, bathrooms: 4, builtAreaSqm: 174, terraceAreaSqm: 70, totalAreaSqm: 244, orientation: 'West Sea Breeze', priceInrCr: 8.35, priceDisplay: '₹8.35 Cr', status: 'Available', highlights: ['Crown Residence', '270° Sea View', 'Private Dining'], image: unitImages['Penthouse Duplex'], floorplanVariant: 'penthouse' },
  { id: 'n-305', code: 'N-305', block: 'Ocean Crest', typology: 'Ground Floor + Garden Deck', bedrooms: 2, bathrooms: 2, builtAreaSqm: 128, terraceAreaSqm: 48, totalAreaSqm: 176, orientation: 'East Palm Grove', priceInrCr: 5.2, priceDisplay: '₹5.20 Cr', status: 'Available', highlights: ['Coconut Canopy', 'Dual Terraces', 'Smart Lock'], image: unitImages['Ground Floor + Garden Deck'], floorplanVariant: 'garden-deck' },
  { id: 'n-306', code: 'N-306', block: 'Ocean Crest', typology: 'Garden Residence', bedrooms: 2, bathrooms: 2, builtAreaSqm: 106, terraceAreaSqm: 26, totalAreaSqm: 132, orientation: 'South Courtyard', priceInrCr: 4.05, priceDisplay: '₹4.05 Cr', status: 'Reserved', highlights: ['Intimate Footprint', 'Shaded Deck', 'Courtyard'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-307', code: 'N-307', block: 'Ocean Crest', typology: 'Penthouse Duplex', bedrooms: 3, bathrooms: 3, builtAreaSqm: 162, terraceAreaSqm: 64, totalAreaSqm: 226, orientation: 'West Sea Breeze', priceInrCr: 7.25, priceDisplay: '₹7.25 Cr', status: 'Available', highlights: ['Rooftop Lounge', 'Sunset Arbor', 'Teak Screens'], image: unitImages['Penthouse Duplex'], floorplanVariant: 'penthouse' },
  { id: 'n-308', code: 'N-308', block: 'Ocean Crest', typology: 'Garden Residence', bedrooms: 3, bathrooms: 3, builtAreaSqm: 136, terraceAreaSqm: 34, totalAreaSqm: 170, orientation: 'West Sea Breeze', priceInrCr: 5.15, priceDisplay: '₹5.15 Cr', status: 'Available', highlights: ['Wide Living', 'Direct Pool', 'Storage Locker'], image: unitImages['Garden Residence'], floorplanVariant: 'garden' },
  { id: 'n-309', code: 'N-309', block: 'Ocean Crest', typology: 'Penthouse Duplex', bedrooms: 4, bathrooms: 4, builtAreaSqm: 172, terraceAreaSqm: 68, totalAreaSqm: 240, orientation: 'West Sea Breeze', priceInrCr: 8.1, priceDisplay: '₹8.10 Cr', status: 'Available', highlights: ['Flagship Sky Deck', 'Ocean Vista', '2 EV Bays'], image: unitImages['Penthouse Duplex'], floorplanVariant: 'penthouse' },
];
