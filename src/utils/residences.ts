import type { ResidenceTypology, ResidenceUnit } from '../data/nirmanData';

export type SortKey = 'relevant' | 'area-asc' | 'area-desc' | 'price-asc' | 'price-desc';
export type AdaptiveTheme = 'theme_on-color' | 'theme_on-light' | 'theme_on-brand';

export interface ResidenceFilterState {
  typology: ResidenceTypology | 'ALL';
  bedrooms: number | 'ALL';
  sortBy: SortKey;
}

export function filterAndSortResidences(
  units: readonly ResidenceUnit[],
  filter: ResidenceFilterState
): ResidenceUnit[] {
  const filtered = units.filter((unit) => {
    if (filter.typology !== 'ALL' && unit.typology !== filter.typology) {
      return false;
    }
    if (filter.bedrooms !== 'ALL' && unit.bedrooms !== filter.bedrooms) {
      return false;
    }
    return true;
  });

  const copy = [...filtered];
  switch (filter.sortBy) {
    case 'area-asc':
      return copy.sort((a, b) => a.totalAreaSqm - b.totalAreaSqm);
    case 'area-desc':
      return copy.sort((a, b) => b.totalAreaSqm - a.totalAreaSqm);
    case 'price-asc':
      return copy.sort((a, b) => a.priceInrCr - b.priceInrCr);
    case 'price-desc':
      return copy.sort((a, b) => b.priceInrCr - a.priceInrCr);
    case 'relevant':
    default:
      return copy;
  }
}

export function formatScrollPercent(progress: number): string {
  const clamped = Math.max(0, Math.min(1, progress));
  const rounded = Math.round(clamped * 100);
  return String(rounded).padStart(2, '0');
}

export function calculateArcDash(radius: number, hovered: boolean): {
  dasharray: string;
  circumference: number;
} {
  const circumference = 2 * Math.PI * radius;
  const arc = hovered ? circumference * 0.5 : circumference * 0.0417;
  return {
    dasharray: `${arc.toFixed(2)} ${circumference.toFixed(2)}`,
    circumference,
  };
}

export interface SectionThemeBand {
  top: number;
  bottom: number;
  left?: number;
  right?: number;
  bg: 'color' | 'light' | 'brand' | 'dark';
}

export function mapBgToAdaptiveTheme(bg: SectionThemeBand['bg']): AdaptiveTheme {
  if (bg === 'light') return 'theme_on-light';
  if (bg === 'brand') return 'theme_on-brand';
  return 'theme_on-color';
}

/**
 * Resolves the active adaptive theme at an element's center (probeX, probeY),
 * mirroring ERA's per-element ScrollTrigger `initThemeChange` logic.
 */
export function resolveThemeAtPoint(
  bands: readonly SectionThemeBand[],
  probeY: number,
  probeX?: number,
  fallback: AdaptiveTheme = 'theme_on-color'
): AdaptiveTheme {
  let matched: AdaptiveTheme = fallback;
  for (const band of bands) {
    const withinX =
      probeX === undefined ||
      band.left === undefined ||
      band.right === undefined ||
      (probeX >= band.left && probeX <= band.right);
    if (!withinX) continue;
    if (band.top <= probeY && band.bottom >= probeY) {
      matched = mapBgToAdaptiveTheme(band.bg);
    }
  }
  return matched;
}

export function computeHeroScrollMetrics(bgHeight: number, viewportHeight: number, isDesktop: boolean) {
  return {
    initialBgScale: isDesktop ? 0.75 : 1.15,
    contentTargetY: isDesktop ? -(1.25 * bgHeight - viewportHeight) : 0,
    bgTargetY: isDesktop ? -(bgHeight - viewportHeight) : 0,
    zoomTargetScale: 2,
    zoomStartTime: isDesktop ? 0.4 : 0,
  };
}

/**
 * Computes how many interleaved editorial benefit cards fit into the 3-col desktop grid
 * (or 1-col mobile grid), matching ERA's `initBenefitCards()` placement rules.
 */
export function computeBenefitCardPlacements(
  visibleUnitCount: number,
  columns: number,
  maxCards = 3
): Array<{ index: number; gridRow: number; gridColumn: number }> {
  const isMobile = columns <= 1;
  const rowInterval = isMobile ? 8 : 2;
  const colForCard = (cardOrdinal: number) => (isMobile ? 1 : cardOrdinal % 2 === 1 ? columns : 1);

  let unitCount = 0;
  let shownCards = 0;
  let row = 1;

  while (unitCount < visibleUnitCount) {
    for (let col = 1; col <= columns && unitCount < visibleUnitCount; col++) {
      const cardOrdinal = Math.floor(row / rowInterval);
      if (row % rowInterval === 0 && col === colForCard(cardOrdinal)) {
        shownCards++;
      } else {
        unitCount++;
      }
    }
    row++;
  }

  const placements: Array<{ index: number; gridRow: number; gridColumn: number }> = [];
  const count = Math.min(maxCards, shownCards);
  for (let i = 0; i < count; i++) {
    const ordinal = i + 1;
    placements.push({
      index: i,
      gridRow: rowInterval * ordinal,
      gridColumn: colForCard(ordinal),
    });
  }
  return placements;
}

export interface CallBookingPayload {
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

export function validateCallBooking(payload: CallBookingPayload): {
  valid: boolean;
  error?: string;
} {
  const name = payload.name.trim();
  const phone = payload.phone.trim();
  const email = payload.email.trim();

  if (name.length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 7) {
    return { valid: false, error: 'Please provide a valid phone number.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }
  return { valid: true };
}
