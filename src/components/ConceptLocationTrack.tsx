import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NIRMAN_IMAGES } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { CoastlineMapSvg, CornerBougainvillea, NirmanRosette } from './Icons';
import { CircleButton } from './UiPrimitives';

interface ConceptLocationTrackProps {
  onSelectApartments: () => void;
}

export const ConceptLocationTrack: React.FC<ConceptLocationTrackProps> = ({
  onSelectApartments,
}) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);
  const infoContentRef = useRef<HTMLDivElement>(null);
  const coastlineWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      // Panel 1 (`loc-info-w`) scale/fade scrubbed entrance matching ERA st[17]
      if (infoPanelRef.current && infoContentRef.current) {
        gsap.fromTo(
          infoContentRef.current,
          { opacity: 0, scale: 0.75 },
          {
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: infoPanelRef.current,
              start: 'top 30%',
              end: 'bottom bottom',
              scrub: 0.5,
            },
          }
        );
      }

      // Panel 1 & Panel 2 flower parallax (`ctn-down`: yPercent -10 -> 10)
      const infoFlower = areaRef.current?.querySelector('.flower.loc-info');
      if (infoFlower) {
        gsap.fromTo(
          infoFlower,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: infoFlower,
              start: 'top 125%',
              end: 'bottom -25%',
              scrub: 0.5,
            },
          }
        );
      }

      const mm = gsap.matchMedia();
      mm.add('(min-width: 992px)', () => {
        if (!areaRef.current || !trackRef.current) return;
        const totalW = trackRef.current.scrollWidth;
        const dist = totalW - areaRef.current.offsetWidth;
        areaRef.current.style.height = `${totalW}px`;

        const horizontalTween = gsap.to(trackRef.current, {
          x: -dist,
          ease: 'horScroll',
          scrollTrigger: {
            trigger: areaRef.current,
            start: '2.5% top',
            end: '97.5% bottom',
            scrub: 0.25,
          },
        });

        const lines = areaRef.current.querySelectorAll('.loc-intro-s_title_line');
        gsap.fromTo(
          lines,
          { xPercent: gsap.utils.wrap([-5, 25, -15]) },
          {
            xPercent: gsap.utils.wrap([5, -25, 25]),
            ease: 'none',
            scrollTrigger: {
              trigger: areaRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.25,
            },
          }
        );

        const introFlower = areaRef.current.querySelector('.flower.loc-intro');
        if (introFlower) {
          gsap.fromTo(
            introFlower,
            { xPercent: 0 },
            {
              xPercent: -25,
              ease: 'none',
              scrollTrigger: {
                trigger: areaRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.25,
              },
            }
          );
        }

        const pathFlower = areaRef.current.querySelector('.flower.loc-path');
        if (pathFlower) {
          gsap.fromTo(
            pathFlower,
            { yPercent: 0 },
            {
              yPercent: 25,
              ease: 'none',
              scrollTrigger: {
                trigger: areaRef.current,
                start: 'bottom bottom',
                end: 'bottom top',
                scrub: 0.25,
              },
            }
          );
        }

        // Coastline SVG horizontal clip-path draw animation when Panel 3 enters horizontally
        if (coastlineWrapRef.current) {
          gsap.fromTo(
            coastlineWrapRef.current,
            { clipPath: 'inset(0% 100% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 2.4,
              delay: 0.4,
              ease: 'Out',
              scrollTrigger: {
                trigger: coastlineWrapRef.current,
                containerAnimation: horizontalTween,
                start: 'left bottom',
                once: true,
              },
            }
          );
        }
      });

      mm.add('(max-width: 991px)', () => {
        if (coastlineWrapRef.current) {
          gsap.fromTo(
            coastlineWrapRef.current,
            { clipPath: 'inset(0% 100% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 2.0,
              ease: 'Out',
              scrollTrigger: {
                trigger: coastlineWrapRef.current,
                start: 'top bottom',
                once: true,
              },
            }
          );
        }
      });
    }, areaRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={areaRef} data-bg="light" className="loc-scroll-area section theme_on-light">
      <div className="loc-scroll-area_screen">
        <div ref={trackRef} className="loc-scroll-area_track">
          {/* Panel 1: The Concept */}
          <div ref={infoPanelRef} className="loc-info-w relative">
            <CornerBougainvillea className="flower loc-info" />
            <div className="container loc h-full">
              <div ref={infoContentRef} className="loc-info-s py-[4rem] relative">
                <div className="loc-info-s_t" />
                <div className="flex flex-col items-center">
                  <div className="mb-[2rem]">
                    <span className="l1 block a-center">THE CONCEPT</span>
                  </div>
                  <div className="grid w-full">
                    <div className="info-s_lead">
                      <h3 className="h4 a-center">
                        NIRMAN RESIDENCE IS A BOUTIQUE GATED COMMUNITY OF ONLY 25 RESIDENCES,
                        DESIGNED AROUND PRIVACY, WELLBEING AND TIMELESS COASTAL LIVING
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="loc-info-s_b">
                  <div className="grid">
                    <div className="info-s_desc flex flex-col items-center">
                      <p className="p1 a-center mb-[2rem]">
                        Inspired by the quiet grace of Konkan courtyard architecture, the sanctuary
                        combines weathered limestone, lime-washed walls, native palms, and curated
                        gardens.
                      </p>
                      <div className="ico-48">
                        <NirmanRosette />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Location Intro & Vertical Sea Terrace */}
          <div className="loc-intro-w relative">
            <CornerBougainvillea className="flower loc-intro" />
            <div className="container loc h-full">
              <div className="loc-intro-s justify-center py-[4rem]">
                <div className="grid _13-columns items-center">
                  <div className="loc-intro-s_cap a-center">
                    <span className="c1 block">INDIA</span>
                  </div>

                  <div className="loc-intro-s_title pointer-events-none">
                    <div className="loc-intro-s_title_line is-1">
                      <span className="h1 block">MANDWA</span>
                    </div>
                    <div className="loc-intro-s_title_line is-2">
                      <span className="h1 block">GOLDEN</span>
                    </div>
                    <div className="loc-intro-s_title_line">
                      <span className="h1 block">COAST</span>
                    </div>
                  </div>

                  <div className="loc-intro-s_img aspect-[3/4] overflow-hidden">
                    <img
                      src={NIRMAN_IMAGES.terraceSea}
                      alt="Sunlit stone terrace looking across the Konkan coastline"
                      className="img w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="loc-intro-s_desc">
                    <span className="l1 block mb-[0.8rem]">BETWEEN MANDWA JETTY AND KIHIM</span>
                    <p className="p1">
                      Surrounded by mature coastal groves, NIRMAN Residence combines serene
                      coastal tranquility with effortless access to South Mumbai and island bays. A
                      location made for staying—and returning to year after year.
                    </p>
                  </div>

                  <div className="loc-intro-s_btn">
                    <CircleButton
                      label={'VIEW\nAVAILABLE\nAPARTMENTS'}
                      onClick={onSelectApartments}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Coastal Distance Map */}
          <div className="loc-path-w relative">
            <CornerBougainvillea className="flower loc-path" />
            <div className="container h-full">
              <div className="loc-path-s py-[4rem]">
                <div className="u-32" />
                <div className="grid">
                  <div className="loc-path-s_title a-center">
                    <h3 className="h3 a-center">THE COAST YOU WANTED</h3>
                    <span className="loc-path-s_title_a a2 block">Minutes away</span>
                    <h3 className="h3 a-center">YOURS THIS YEAR</h3>
                  </div>
                </div>

                <div className="grid my-auto">
                  <div className="loc-path-s_path">
                    <div ref={coastlineWrapRef} className="loc-path-s_path_c">
                      <CoastlineMapSvg />
                    </div>
                  </div>
                </div>

                <div className="u-24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
