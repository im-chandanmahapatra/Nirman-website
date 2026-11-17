import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AMENITIES } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { CircleButton } from './UiPrimitives';

interface AmenitiesSectionProps {
  onBookCall: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ onBookCall }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const didMountRef = useRef(false);

  // Smooth GSAP indicator bar matching ERA initTabsHilight() (durM=0.8, ease='InOut')
  useEffect(() => {
    const activeEl = tabRefs.current[activeIndex];
    const barEl = highlightRef.current;
    if (!activeEl || !barEl) return;
    ensureGsapRegistered();
    gsap.to(barEl, {
      y: activeEl.offsetTop,
      height: activeEl.offsetHeight,
      duration: 0.8,
      ease: 'InOut',
      overwrite: true,
    });
  }, [activeIndex]);

  // Tab switch polygon clip-path wipe & scale settle
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    if (mediaRef.current) {
      gsap.fromTo(
        mediaRef.current,
        { clipPath: 'polygon(100% 0%, 100% 0%, 101% 100%, 125% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          ease: 'InOut',
          overwrite: 'auto',
        }
      );
    }
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.35 },
        { scale: 1, duration: 1.2, ease: 'InOut', overwrite: 'auto' }
      );
    }
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: '1.6rem' },
        { opacity: 1, y: '0rem', duration: 0.9, delay: 0.15, ease: 'Out', overwrite: true }
      );
    }
  }, [activeIndex]);

  // ERA ScrollTrigger exit zoom & fade + inner img-in parallax (yPercent: -20 -> 0)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (!scrollAreaRef.current || !wrapperRef.current || !mediaRef.current) return;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: scrollAreaRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
          },
        })
        .fromTo(mediaRef.current, { scale: 1 }, { scale: 2, ease: 'In' }, 0)
        .fromTo(wrapperRef.current, { opacity: 1 }, { opacity: 0, ease: 'In' }, 0);

      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: -20, translateZ: 10 },
          {
            yPercent: 0,
            translateZ: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: scrollAreaRef.current,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
            },
          }
        );
      }
    }, scrollAreaRef);

    return () => ctx.revert();
  }, []);

  const current = AMENITIES[activeIndex];

  return (
    <div ref={scrollAreaRef} data-bg="color" className="amen-scroll-area theme_on-color">
      <div className="scroll-area_screen">
        <div ref={wrapperRef} className="amen-w">
          <div className="section theme_on-color amen-s">
            <div className="container h-full relative">
              <div className="amen-s_cms">
                <div ref={mediaRef} className="amen-slide_img">
                  <img
                    ref={imgRef}
                    key={current.image + current.id}
                    src={current.image}
                    alt={current.tabLabel}
                    className="img w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="img-over-grad from-top _4x" />
                  <div
                    className="img-over-grad bot _6x"
                    style={{
                      backgroundImage:
                        'linear-gradient(transparent, rgba(16, 6, 12, 0.72))',
                    }}
                  />
                </div>

                {/* Vertical Interactive Tabs */}
                <div className="amm-s_cms_tabs-w">
                  <div className="grid">
                    <div className="amm-s_cms_tabs">
                      <div className="amm-s_cms_tabs_line">
                        <div ref={highlightRef} className="amm-s_cms_tabs_line_hilight" />
                      </div>

                      <div className="flex flex-col items-start gap-[0.45rem]">
                        {AMENITIES.map((item, idx) => (
                          <button
                            key={item.id}
                            ref={(el) => {
                              tabRefs.current[idx] = el;
                            }}
                            type="button"
                            role="tab"
                            aria-selected={idx === activeIndex}
                            onClick={() => setActiveIndex(idx)}
                            className={`amen-tab h5 text-left whitespace-nowrap transition-opacity duration-300 ${
                              idx === activeIndex ? 'opacity-100' : 'opacity-50 hover:opacity-85'
                            }`}
                          >
                            {item.tabLabel}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Lower-Left Headline */}
                <div className="amen-slide pb-[3rem] pointer-events-none">
                  <div className="amen-slide_b">
                    <div className="grid">
                      <div className="amen-slide_title mb-[0.75rem]">
                        <span className="l1 block">{current.kicker}</span>
                      </div>
                      <div className="amen-slide_desc">
                        <div className="red-line max-lg:hidden" />
                        <p ref={headlineRef} className="h5 leading-[1.06]">
                          {current.headline}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lower-Right Circular CTA */}
                <div className="amm-s_cms_btn-w">
                  <div className="grid">
                    <div className="amm-s_cms_btn flex justify-end">
                      <CircleButton label={'BOOK A CALL\nNOW'} onClick={onBookCall} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
