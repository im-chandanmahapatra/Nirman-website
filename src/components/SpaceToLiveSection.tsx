import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { INTERIOR_GALLERY, NIRMAN_IMAGES } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { ArrowLeftSvg, ArrowRightSvg, CornerBougainvillea } from './Icons';
import { CircleButton } from './UiPrimitives';

interface SpaceToLiveSectionProps {
  onSelectApartments: () => void;
  onOpenLightbox: (startIndex: number) => void;
}

export const SpaceToLiveSection: React.FC<SpaceToLiveSectionProps> = ({
  onSelectApartments,
  onOpenLightbox,
}) => {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const total = INTERIOR_GALLERY.length;
  const activeSlide = INTERIOR_GALLERY[galleryIdx];

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const galleryFrameRef = useRef<HTMLDivElement>(null);
  const galleryImgRef = useRef<HTMLImageElement>(null);
  const didMountRef = useRef(false);

  // ERA interior parallax (`interior-s_l` ctn-down, `flower.interior` ctn-up)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      const isDesktop = window.innerWidth >= 992;

      if (leftColRef.current && isDesktop) {
        gsap.fromTo(
          leftColRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 125%',
              end: 'bottom -25%',
              scrub: 0.5,
            },
          }
        );
      }

      const flower = sectionRef.current.querySelector('.flower.interior');
      if (flower) {
        gsap.fromTo(
          flower,
          { yPercent: 10 },
          {
            yPercent: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: flower,
              start: 'top 125%',
              end: 'bottom -25%',
              scrub: 0.5,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Gallery slide clip-path wipe transition
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    if (galleryFrameRef.current) {
      gsap.fromTo(
        galleryFrameRef.current,
        { clipPath: 'polygon(100% 0%, 100% 0%, 101% 100%, 125% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          ease: 'InOut',
          overwrite: true,
        }
      );
    }
    if (galleryImgRef.current) {
      gsap.fromTo(
        galleryImgRef.current,
        { scale: 1.35, xPercent: 15 },
        { scale: 1, xPercent: 0, duration: 1.2, ease: 'InOut', overwrite: true }
      );
    }
  }, [galleryIdx]);

  return (
    <div ref={sectionRef} data-bg="light" className="interior-w theme_on-light">
      <section className="section arch theme_on-light overflow-clip">
        <div className="container">
          <div className="interior-s pt-[10rem] pb-[14rem]">
            <div className="grid">
              <div className="interior-s_title">
                <h2 className="h1 a-center leading-[0.86]">
                  THE
                  <br />
                  SPACE
                  <br />
                  TO
                </h2>
                <div className="interior-s_title_a">
                  <span className="a1 block leading-none">Live in</span>
                </div>
              </div>
            </div>

            <div className="u-96" />

            {/* Dual Column Feature Composition */}
            <div className="interior-s_imgs">
              {/* Left Column: Velvet Plum Frame with Narrow Trapezoid Slit & Cascading Bougainvillea */}
              <div ref={leftColRef} className="interior-s_l">
                <div className="grid _5-columns">
                  <div className="interior-s_l_img-w">
                    <div
                      className="w-full h-[76%] overflow-hidden"
                      style={{
                        clipPath: 'polygon(14% 0%, 86% 0%, 100% 100%, 0% 100%)',
                      }}
                    >
                      <img
                        src={NIRMAN_IMAGES.gardenLounge}
                        alt="Bougainvillea garden chair corner"
                        className="img interior-s_l_img w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <CornerBougainvillea className="flower interior" transparentCutout />
                  </div>

                  <div className="interior-s_l_desc pt-[2rem]">
                    <span className="l1 block mb-[0.75rem]">OPTIONAL UPGRADES ARE AVAILABLE:</span>
                    <p className="p1">
                      • Private plunge pool
                      <br />
                      • EV charging point installation
                      <br />• Custom teak louver screens
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Angled Terrace + Detail Copy + Circular CTA */}
              <div className="interior-s_r">
                <div className="grid _5-columns">
                  <div
                    className="interior-s_r_img"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 24% 100%)',
                    }}
                  >
                    <img
                      src={NIRMAN_IMAGES.terraceSea}
                      alt="Shaded coastal pergola terrace"
                      className="img w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="interior-s_r_lead pt-[5rem]">
                    <h3 className="h5 leading-[1.04]">
                      EVERY DETAIL WAS SELECTED TO CREATE HOMES THAT FEEL ELEGANT, INTUITIVE AND
                      EFFORTLESS TO LIVE IN
                    </h3>
                  </div>

                  <div className="interior-s_r_desc pt-[2rem]">
                    <p className="p1">
                      Hand-honed Kota and travertine flooring throughout, discreet climate automation,
                      biometric smart entry, anodized storm-rated aluminum glazing, and concealed
                      acoustic drapery pockets.
                    </p>
                  </div>

                  <div className="interior-s_r_btn pt-[3rem]">
                    <CircleButton
                      label={'SELECT AN\nAPARTMENT'}
                      onClick={onSelectApartments}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="u-96" />

            {/* Interactive Interior & Lifestyle Gallery Slider */}
            <div className="grid items-end">
              <div className="interior-s_gallery-cms">
                <div
                  ref={galleryFrameRef}
                  className="gallery-cms rounded-[2px] cursor-pointer group relative"
                  onClick={() => onOpenLightbox(galleryIdx)}
                >
                  <img
                    ref={galleryImgRef}
                    key={activeSlide.image + activeSlide.id}
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    className="img w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-[2rem] left-[2rem] bg-[var(--_global-colors---base-0--100)] px-[1.5rem] py-[0.8rem] rounded-[2px] shadow-md">
                    <span className="l1 block">{activeSlide.title}</span>
                    <span className="p2 text-gray block">{activeSlide.caption}</span>
                  </div>
                  <div className="absolute top-[2rem] right-[2rem] bg-[var(--_global-colors---base-0--100)] px-[1rem] py-[0.5rem] rounded-full">
                    <span className="l2">EXPAND GALLERY ↗</span>
                  </div>
                </div>

                <div className="u-16" />
                <div className="interior-s_gallery-cms_pag">
                  <div className="pag">
                    <button
                      type="button"
                      onClick={() => setGalleryIdx((prev) => (prev - 1 + total) % total)}
                      className="pag_prev"
                      aria-label="Previous interior photo"
                    >
                      <ArrowLeftSvg />
                      <span className="pag_prev_label l1">{galleryIdx + 1}</span>
                    </button>

                    <div className="pag_progress">
                      <div
                        className="pag_progress_fill transition-all duration-500"
                        style={{ width: `${((galleryIdx + 1) / total) * 100}%` }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setGalleryIdx((prev) => (prev + 1) % total)}
                      className="pag_next"
                      aria-label="Next interior photo"
                    >
                      <span className="pag_prev_label l1">{total}</span>
                      <ArrowRightSvg />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
