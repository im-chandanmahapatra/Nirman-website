import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  APARTMENT_BENEFIT_CARDS,
  RESIDENCES,
  type ResidenceTypology,
  type ResidenceUnit,
} from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import {
  computeBenefitCardPlacements,
  filterAndSortResidences,
  type SortKey,
} from '../utils/residences';
import { CtaFooterSection } from './CtaFooterSection';
import { ArchitecturalFloorplanSvg, ChevronDownSvg, CornerBougainvillea } from './Icons';
import { ChamferFrame, DualLink, NavHoverItem, PillButton } from './UiPrimitives';

interface ApartmentsViewProps {
  initialTypology?: ResidenceTypology | 'ALL';
  onBookCall: () => void;
  onBackHome: () => void;
  onSelectApartments: () => void;
  onScrollToTop: () => void;
}

const TYPOLOGY_OPTIONS: Array<{ value: ResidenceTypology | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All' },
  { value: 'Ground Floor + Garden Deck', label: 'Ground floor + deck' },
  { value: 'Garden Residence', label: 'Garden residence' },
  { value: 'Penthouse Duplex', label: 'Penthouse duplex' },
];

const BEDROOM_OPTIONS: Array<{ value: number | 'ALL'; label: string }> = [
  { value: 'ALL', label: 'All' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: 'relevant', label: 'Relevant' },
  { value: 'area-asc', label: 'Smallest area' },
  { value: 'area-desc', label: 'Largest area' },
  { value: 'price-asc', label: 'Lowest price' },
  { value: 'price-desc', label: 'Highest price' },
];

type DropdownKey = 'typology' | 'bedrooms' | 'sort' | null;

export const ApartmentsView: React.FC<ApartmentsViewProps> = ({
  initialTypology = 'ALL',
  onBookCall,
  onBackHome,
  onSelectApartments,
  onScrollToTop,
}) => {
  const [typology, setTypology] = useState<ResidenceTypology | 'ALL'>(initialTypology);
  const [bedrooms, setBedrooms] = useState<number | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<SortKey>('relevant');
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [selectedUnit, setSelectedUnit] = useState<ResidenceUnit | null>(null);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 992 : true
  );

  const pageRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTypology(initialTypology);
  }, [initialTypology]);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (filterBarRef.current && !filterBarRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setSelectedUnit(null);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const titleChars = pageRef.current?.querySelectorAll('.apart-title-char');
      if (titleChars?.length) {
        gsap.fromTo(
          titleChars,
          { opacity: 0, yPercent: 50, rotateY: 90 },
          {
            opacity: 1,
            yPercent: 0,
            rotateY: 0,
            duration: 1.05,
            delay: 0.1,
            stagger: 0.035,
            ease: 'Out',
          }
        );
      }
      if (filterBarRef.current) {
        gsap.fromTo(
          filterBarRef.current,
          { opacity: 0, y: '2.5rem' },
          { opacity: 1, y: '0rem', duration: 0.9, delay: 0.25, ease: 'Out' }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const filteredUnits = useMemo(
    () => filterAndSortResidences(RESIDENCES, { typology, bedrooms, sortBy }),
    [typology, bedrooms, sortBy]
  );

  const benefitPlacements = useMemo(
    () =>
      computeBenefitCardPlacements(
        filteredUnits.length,
        isDesktop ? 3 : 1,
        APARTMENT_BENEFIT_CARDS.length
      ),
    [filteredUnits.length, isDesktop]
  );

  const hasCustomFilter = typology !== 'ALL' || bedrooms !== 'ALL' || sortBy !== 'relevant';

  const activeTypologyLabel =
    TYPOLOGY_OPTIONS.find((o) => o.value === typology)?.label ?? 'All';
  const activeBedroomLabel =
    BEDROOM_OPTIONS.find((o) => o.value === bedrooms)?.label ?? 'All';
  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Relevant';

  const resetFilters = () => {
    setTypology('ALL');
    setBedrooms('ALL');
    setSortBy('relevant');
    setOpenDropdown(null);
  };

  return (
    <div ref={pageRef} className="relative">
      {/* Rotated Left Breadcrumb Trail matching ERA .header-cramps */}
      <div className="header-cramps theme_on-light">
        <NavHoverItem label="HOME" onClick={onBackHome} textClassName="l2" />
        <span className="l2 text-disabled">/</span>
        <span className="l2">SELECT AN APARTMENT</span>
      </div>

      <section data-bg="light" className="section theme_on-light relative overflow-x-clip pb-[6rem]">
        {/* Corner Bougainvillea matching ERA .flower.apart */}
        <CornerBougainvillea className="apart" />

        <div className="container relative z-10">
          <div className="u-160 b-desk" />
          <div className="u-96 b-mob" />

          {/* Header: APARTMENTS + Count */}
          <div className="grid mb-[2.5rem]">
            <div className="apart-s_title">
              <h1 className="h1 apart-s_headline leading-[0.86]" aria-label="APARTMENTS">
                {'APARTMENTS'.split('').map((ch, idx) => (
                  <span key={`${ch}-${idx}`} className="apart-title-char inline-block">
                    {ch}
                  </span>
                ))}
              </h1>
              <div className="apart-s_count" aria-live="polite">
                <span className="h1 leading-[0.86] tabular-nums block">
                  {filteredUnits.length}
                </span>
              </div>
            </div>
          </div>

          {/* Chamfered Filter Bar matching ERA .apart-s_cms_filter */}
          <div className="grid mb-[2rem] relative z-30">
            <div className="apart-s_cms">
              <div ref={filterBarRef} className="apart-s_cms_filter">
                <ChamferFrame small />
                <div className="apart-s_cms_filter_c relative z-10">
                  <div className="grid _9-columns">
                    {/* Typology Select */}
                    <div className="apart-s_cms_filter_item">
                      <div className={`filter_select ${openDropdown === 'typology' ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          aria-expanded={openDropdown === 'typology'}
                          aria-label={`Filter by typology: ${activeTypologyLabel}`}
                          onClick={() =>
                            setOpenDropdown((d) => (d === 'typology' ? null : 'typology'))
                          }
                          className="filter_select_btn"
                        >
                          <span className="l2 reg">Typology</span>
                          <span className="filter_select_btn_label">
                            <span className="l2">{activeTypologyLabel.toUpperCase()}</span>
                            <span
                              className={`ico-12 transition-transform duration-300 ${
                                openDropdown === 'typology' ? 'rotate-180' : ''
                              }`}
                            >
                              <ChevronDownSvg className="w-full h-full" />
                            </span>
                          </span>
                        </button>

                        {openDropdown === 'typology' && (
                          <div className="filter_select_drop-down" role="listbox" aria-label="Typology options">
                            <div className="filter_select_drop-down_list">
                              {TYPOLOGY_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  role="option"
                                  aria-selected={typology === opt.value}
                                  onClick={() => {
                                    setTypology(opt.value);
                                    setOpenDropdown(null);
                                  }}
                                  className={`filter_select_drop-down_list_item ${
                                    typology === opt.value ? 'is-active' : ''
                                  }`}
                                >
                                  <span className="l1">{opt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bedrooms Select */}
                    <div className="apart-s_cms_filter_item">
                      <div className={`filter_select ${openDropdown === 'bedrooms' ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          aria-expanded={openDropdown === 'bedrooms'}
                          aria-label={`Filter by bedrooms: ${activeBedroomLabel}`}
                          onClick={() =>
                            setOpenDropdown((d) => (d === 'bedrooms' ? null : 'bedrooms'))
                          }
                          className="filter_select_btn"
                        >
                          <span className="l2 reg">Bedrooms</span>
                          <span className="filter_select_btn_label">
                            <span className="l2">{activeBedroomLabel.toUpperCase()}</span>
                            <span
                              className={`ico-12 transition-transform duration-300 ${
                                openDropdown === 'bedrooms' ? 'rotate-180' : ''
                              }`}
                            >
                              <ChevronDownSvg className="w-full h-full" />
                            </span>
                          </span>
                        </button>

                        {openDropdown === 'bedrooms' && (
                          <div className="filter_select_drop-down" role="listbox" aria-label="Bedroom options">
                            <div className="filter_select_drop-down_list">
                              {BEDROOM_OPTIONS.map((opt) => (
                                <button
                                  key={String(opt.value)}
                                  type="button"
                                  role="option"
                                  aria-selected={bedrooms === opt.value}
                                  onClick={() => {
                                    setBedrooms(opt.value);
                                    setOpenDropdown(null);
                                  }}
                                  className={`filter_select_drop-down_list_item ${
                                    bedrooms === opt.value ? 'is-active' : ''
                                  }`}
                                >
                                  <span className="l1">
                                    {opt.value === 'ALL' ? 'All' : `${opt.label} Bedrooms`}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sort Select + Reset */}
                    <div className="apart-s_cms_filter_item is-last">
                      <div className={`filter_select ${openDropdown === 'sort' ? 'is-open' : ''}`}>
                        <button
                          type="button"
                          aria-expanded={openDropdown === 'sort'}
                          aria-label={`Sort residences: ${activeSortLabel}`}
                          onClick={() => setOpenDropdown((d) => (d === 'sort' ? null : 'sort'))}
                          className="filter_select_btn"
                        >
                          <span className="l2 reg">Sort by</span>
                          <span className="filter_select_btn_label">
                            <span className="l2">{activeSortLabel.toUpperCase()}</span>
                            <span
                              className={`ico-12 transition-transform duration-300 ${
                                openDropdown === 'sort' ? 'rotate-180' : ''
                              }`}
                            >
                              <ChevronDownSvg className="w-full h-full" />
                            </span>
                          </span>
                        </button>

                        {openDropdown === 'sort' && (
                          <div className="filter_select_drop-down" role="listbox" aria-label="Sort options">
                            <div className="filter_select_drop-down_list">
                              {SORT_OPTIONS.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  role="option"
                                  aria-selected={sortBy === opt.value}
                                  onClick={() => {
                                    setSortBy(opt.value);
                                    setOpenDropdown(null);
                                  }}
                                  className={`filter_select_drop-down_list_item ${
                                    sortBy === opt.value ? 'is-active' : ''
                                  }`}
                                >
                                  <span className="l1">{opt.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={resetFilters}
                        disabled={!hasCustomFilter}
                        className={`nav-item l2 transition-opacity ${
                          hasCustomFilter ? 'opacity-100 cursor-pointer' : 'opacity-30 cursor-default'
                        }`}
                      >
                        RESET
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3-Column Residences Grid + Interleaved Benefit Cards */}
          <div className="grid relative z-10">
            <div className="apart-s_cms">
              {filteredUnits.length === 0 ? (
                <div className="apart-s_cms_empty text-center py-[6rem]">
                  <h2 className="h3 mb-[1rem]">NO RESIDENCES MATCH</h2>
                  <p className="p1 text-gray mb-[2rem]">
                    Reset your filters to inspect all twenty-five bespoke Alibaug coastal homes.
                  </p>
                  <PillButton label="SHOW ALL 25 RESIDENCES" onClick={resetFilters} />
                </div>
              ) : (
                <div className="apart-cms_list">
                  {filteredUnits.map((unit) => (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => setSelectedUnit(unit)}
                      className="apart-card group text-left"
                      aria-label={`${unit.code}, ${unit.bedrooms} bedroom, ${unit.totalAreaSqm} square meters`}
                    >
                      <ChamferFrame small />
                      <div className="apart-card_shadow" aria-hidden="true" />

                      <div className="apart-card_c relative z-10">
                        <div className="apart-card_t">
                          <span className="l2 a-center block">{unit.typology.toUpperCase()}</span>
                          <div className="u-4" />
                          <span className="l2 reg a-center text-gray block">
                            COMPLETION: 4Q 2026
                          </span>
                        </div>

                        <div className="apart-card_img my-[1.2rem]">
                          <ArchitecturalFloorplanSvg variant={unit.floorplanVariant} />
                        </div>

                        <div className="apart-card_b">
                          <div className="apart-card_data-list">
                            <span className="l2 reg">№ {unit.code}</span>
                            <span className="data-divider" />
                            <span className="l2 reg">{unit.block.toUpperCase()}</span>
                            <span className="data-divider" />
                            <span className="l2 reg">{unit.status.toUpperCase()}</span>
                          </div>
                          <div className="u-12" />
                          <div className="apart-card_info">
                            <span className="h5">{unit.bedrooms} BED</span>
                            <span className="h5">/</span>
                            <span className="h5">{unit.totalAreaSqm} M²</span>
                          </div>
                          <div className="u-12" />
                          <div className="apart-card_add">
                            <span className="l1 a-center block">
                              + {unit.terraceAreaSqm} M² TERRACE
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}

                  {benefitPlacements.map((placement) => {
                    const card = APARTMENT_BENEFIT_CARDS[placement.index];
                    if (!card) return null;
                    return (
                      <div
                        key={card.id}
                        className="benefit-card theme_on-color"
                        style={{
                          gridArea: `${placement.gridRow} / ${placement.gridColumn}`,
                        }}
                      >
                        <div className="benefit-card_info">
                          <h3 className="h5 text-white mb-[0.75rem]">{card.title}</h3>
                          <p className="p1 text-white/90">{card.description}</p>
                        </div>
                        <div className="benefit-card_bg">
                          <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="img-over-grad from-top _4x" />
                          <div className="img-over-grad bot _4x" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Residence Detail Modal */}
        {selectedUnit && (
          <div
            className="modal show"
            role="dialog"
            aria-modal="true"
            aria-label={`Residence ${selectedUnit.code} Floorplan`}
          >
            <div className="modal_over" onClick={() => setSelectedUnit(null)} />
            <div className="modal_c justify-center items-center">
              <div className="bg-[var(--_global-colors---base-0--100)] theme_on-light p-[3rem] max-w-[54rem] w-full relative z-10 shadow-2xl rounded-[4px]">
                <ChamferFrame small />
                <button
                  type="button"
                  onClick={() => setSelectedUnit(null)}
                  className="modal_cta_close btn-ico z-20"
                  aria-label="Close floorplan detail"
                >
                  <span className="l1">✕</span>
                </button>

                <div className="grid _6-columns gap-[2rem] items-center max-lg:!grid-cols-1 relative z-10">
                  <div className="col-span-3 aspect-square border border-[var(--_colors---base-1000--line)] p-[2rem] bg-white/40">
                    <ArchitecturalFloorplanSvg variant={selectedUnit.floorplanVariant} />
                  </div>

                  <div className="col-span-3 flex flex-col justify-between gap-[1.5rem]">
                    <div>
                      <span className="l2 text-gray block mb-[0.4rem]">
                        {selectedUnit.block} · {selectedUnit.orientation}
                      </span>
                      <h2 className="h3 leading-none mb-[0.5rem]">{selectedUnit.code}</h2>
                      <span className="l1 text-gray block">{selectedUnit.typology}</span>
                    </div>

                    <div className="grid _4-columns gap-[1rem] py-[1rem] border-y border-[var(--_colors---base-1000--line)]">
                      <div className="col-span-2">
                        <span className="l2 text-gray block">INTERIOR</span>
                        <span className="h6">{selectedUnit.builtAreaSqm} sq.m.</span>
                      </div>
                      <div className="col-span-2">
                        <span className="l2 text-gray block">TERRACE / DECK</span>
                        <span className="h6">{selectedUnit.terraceAreaSqm} sq.m.</span>
                      </div>
                      <div className="col-span-2">
                        <span className="l2 text-gray block">TOTAL AREA</span>
                        <span className="h6">{selectedUnit.totalAreaSqm} sq.m.</span>
                      </div>
                      <div className="col-span-2">
                        <span className="l2 text-gray block">GUIDE PRICE</span>
                        <span className="h6">{selectedUnit.priceDisplay}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-[0.5rem]">
                      {selectedUnit.highlights.map((tag) => (
                        <span
                          key={tag}
                          className="l2 px-[0.8rem] py-[0.3rem] border border-[var(--_colors---base-1000--line)] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <DualLink
                      label="REQUEST DOSSIER & FLOORPLAN PDF"
                      onClick={() => {
                        setSelectedUnit(null);
                        onBookCall();
                      }}
                      textClassName="l1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <CtaFooterSection
        onSelectApartments={onSelectApartments}
        onScrollToTop={onScrollToTop}
        onOpenCallModal={onBookCall}
      />
    </div>
  );
};
