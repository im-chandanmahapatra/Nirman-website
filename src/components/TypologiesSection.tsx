import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TYPOLOGIES, type ResidenceTypology } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { ArrowLeftSvg, ArrowRightSvg } from './Icons';
import { PillButton } from './UiPrimitives';

interface TypologiesSectionProps {
  onExploreTypology: (typology: ResidenceTypology) => void;
}

export const TypologiesSection: React.FC<TypologiesSectionProps> = ({ onExploreTypology }) => {
  const [active, setActive] = useState(2);
  const total = TYPOLOGIES.length;
  const current = TYPOLOGIES[active];
  const nextNumber = active === total - 1 ? 1 : active + 2;

  const slideWrapRef = useRef<HTMLDivElement>(null);
  const slideImgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    if (slideWrapRef.current) {
      gsap.fromTo(
        slideWrapRef.current,
        { clipPath: 'polygon(100% 0%, 100% 0%, 101% 100%, 125% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          ease: 'InOut',
          overwrite: true,
        }
      );
    }
    if (slideImgRef.current) {
      gsap.fromTo(
        slideImgRef.current,
        { scale: 1.5, xPercent: 25 },
        { scale: 1, xPercent: 0, duration: 1.2, ease: 'InOut', overwrite: true }
      );
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, yPercent: 25 },
        { opacity: 1, yPercent: 0, duration: 1.0, delay: 0.15, ease: 'Out', overwrite: true }
      );
    }
  }, [active]);

  return (
    <div data-bg="brand" className="theme_on-brand">
      <section className="section theme_on-brand">
        <div className="container">
          <div className="apart-type-s py-[3rem]">
            <div className="grid h-100">
              <div className="apart-type-s_cms">
                <div className="apart-type-slide">
                  <div className="apart-type-slide_t" />

                  <div className="apart-type-slide_img-w max-lg:!static max-lg:!transform-none">
                    <div ref={slideWrapRef} className="apart-type-slide_img rounded-[2px]">
                      <img
                        ref={slideImgRef}
                        key={current.image + current.id}
                        src={current.image}
                        alt={current.name}
                        className="img w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="apart-type-slide_c my-auto">
                    <div className="grid items-center">
                      <div className="apart-type-slide_data">
                        <div className="data-list">
                          <div>
                            <span className="l2 block mb-[0.45rem]">BEDROOMS</span>
                            <span className="h5 block">{current.bedroomsLabel}</span>
                          </div>
                          <div>
                            <span className="l2 block mb-[0.45rem]">AREA UP TO</span>
                            <span className="h5 block">{current.areaUpTo}</span>
                          </div>
                        </div>
                      </div>

                      <div className="apart-type-slide_desc">
                        <p className="p1 mb-[1.6rem]">{current.summary}</p>
                        <div className="apart-type-slide_btn">
                          <PillButton
                            label={current.ctaLabel}
                            onClick={() => onExploreTypology(current.name)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="apart-type-slide_b">
                    <h2 ref={titleRef} className="h2 a-center mb-[1.2rem] whitespace-nowrap">
                      {current.displayName}
                    </h2>

                    <div className="pag" aria-label="Typologies pagination">
                      <button
                        type="button"
                        onClick={() => setActive((prev) => (prev - 1 + total) % total)}
                        className="pag_prev"
                        aria-label="Previous typology"
                      >
                        <ArrowLeftSvg />
                        <span className="pag_prev_label l1">{active + 1}</span>
                      </button>

                      <div className="pag_progress">
                        <div
                          className="pag_progress_fill transition-all duration-500"
                          style={{ width: `${((active + 1) / total) * 100}%` }}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setActive((prev) => (prev + 1) % total)}
                        className="pag_next"
                        aria-label="Next typology"
                      >
                        <span className="pag_prev_label l1">{nextNumber}</span>
                        <ArrowRightSvg />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section theme_on-brand min-h-[54rem] max-lg:min-h-[34rem] flex items-center justify-center relative overflow-clip">
        <div className="container">
          <div className="grid items-center">
            <div className="col-span-6 col-start-3 max-lg:col-span-4 max-lg:col-start-1 a-center flex flex-col items-center">
              <span className="l1 block mb-[2.5rem]">
                A PLACE TO LIVE — TO
                <br />
                RETURN YEAR AFTER YEAR
              </span>
              <h3 className="h4 a-center max-w-[54rem]">
                RESIDENCES RANGE FROM 104 TO 244 SQ.M., OFFERING SPACIOUS SINGLE LEVEL AND DUPLEX
                LAYOUTS WITH GENEROUS TERRACES AND ROOFTOP PAVILIONS.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
