import assert from 'node:assert/strict';
import test from 'node:test';
import { RESIDENCES } from '../data/nirmanData.ts';
import {
  calculateArcDash,
  computeBenefitCardPlacements,
  computeHeroScrollMetrics,
  filterAndSortResidences,
  formatScrollPercent,
  resolveThemeAtPoint,
  validateCallBooking,
} from './residences.ts';

test('RESIDENCES catalog contains exactly 25 boutique Alibaug units', () => {
  assert.equal(RESIDENCES.length, 25);
});

test('filterAndSortResidences filters by typology and bedroom count', () => {
  const penthouses = filterAndSortResidences(RESIDENCES, {
    typology: 'Penthouse Duplex',
    bedrooms: 4,
    sortBy: 'relevant',
  });
  assert.ok(penthouses.length > 0);
  for (const unit of penthouses) {
    assert.equal(unit.typology, 'Penthouse Duplex');
    assert.equal(unit.bedrooms, 4);
  }
});

test('filterAndSortResidences sorts correctly by area and price', () => {
  const byAreaDesc = filterAndSortResidences(RESIDENCES, {
    typology: 'ALL',
    bedrooms: 'ALL',
    sortBy: 'area-desc',
  });
  assert.ok(byAreaDesc[0].totalAreaSqm >= byAreaDesc[byAreaDesc.length - 1].totalAreaSqm);

  const byPriceAsc = filterAndSortResidences(RESIDENCES, {
    typology: 'ALL',
    bedrooms: 'ALL',
    sortBy: 'price-asc',
  });
  assert.ok(byPriceAsc[0].priceInrCr <= byPriceAsc[byPriceAsc.length - 1].priceInrCr);
});

test('formatScrollPercent clamps and zero-pads scroll progress', () => {
  assert.equal(formatScrollPercent(-0.2), '00');
  assert.equal(formatScrollPercent(0), '00');
  assert.equal(formatScrollPercent(0.084), '08');
  assert.equal(formatScrollPercent(0.5), '50');
  assert.equal(formatScrollPercent(1.4), '100');
});

test('calculateArcDash expands arc from 4.17% idle to 50% hovered', () => {
  const idle = calculateArcDash(103.5, false);
  const hover = calculateArcDash(103.5, true);
  assert.ok(Math.abs(idle.circumference - 650.31) < 0.2);
  assert.ok(hover.dasharray.startsWith('325.15'));
});

test('validateCallBooking enforces valid contact details', () => {
  assert.equal(
    validateCallBooking({ name: 'A', phone: '+91 98200 12345', email: 'a@b.com' }).valid,
    false
  );
  assert.equal(
    validateCallBooking({ name: 'Rohan Mehta', phone: '123', email: 'a@b.com' }).valid,
    false
  );
  assert.equal(
    validateCallBooking({ name: 'Rohan Mehta', phone: '+91 98200 12345', email: 'bad-email' }).valid,
    false
  );
  assert.equal(
    validateCallBooking({ name: 'Rohan Mehta', phone: '+91 98200 12345', email: 'rohan@nirman.in' }).valid,
    true
  );
});

test('resolveThemeAtPoint evaluates independent Y probes accurately', () => {
  const bands = [
    { top: -300, bottom: 720, bg: 'color' as const },
    { top: 720, bottom: 1620, bg: 'brand' as const },
    { top: 1620, bottom: 2600, bg: 'light' as const },
  ];
  assert.equal(resolveThemeAtPoint(bands, 104), 'theme_on-color');
  assert.equal(resolveThemeAtPoint(bands, 797), 'theme_on-brand');
  assert.equal(resolveThemeAtPoint(bands, 1700), 'theme_on-light');
});

test('computeHeroScrollMetrics computes exact ERA scroll travel at 1440x900', () => {
  const desktop = computeHeroScrollMetrics(1296, 900, true);
  assert.equal(desktop.initialBgScale, 0.75);
  assert.equal(desktop.contentTargetY, -720);
  assert.equal(desktop.bgTargetY, -396);
  assert.equal(desktop.zoomStartTime, 0.4);

  const mobile = computeHeroScrollMetrics(900, 844, false);
  assert.equal(mobile.initialBgScale, 1.15);
  assert.equal(mobile.zoomStartTime, 0);
});

test('computeBenefitCardPlacements mirrors ERA interleaved card positions', () => {
  const all = computeBenefitCardPlacements(25, 3, 3);
  assert.deepEqual(all, [
    { index: 0, gridRow: 2, gridColumn: 3 },
    { index: 1, gridRow: 4, gridColumn: 1 },
    { index: 2, gridRow: 6, gridColumn: 3 },
  ]);

  const few = computeBenefitCardPlacements(4, 3, 3);
  assert.equal(few.length, 0);
});
