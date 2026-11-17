import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NIRMAN_IMAGES } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { CornerBougainvillea } from './Icons';
import { CircleButton } from './UiPrimitives';

interface ArchitectureSectionProps {
  onSelectApartments: () => void;
}

export const ArchitectureSection: React.FC<ArchitectureSectionProps> = ({ onSelectApartments }) => {
  const areaRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const leftClipRef = useRef<HTMLDivElement>(null);
  const rightClipRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const resizeHeadline = () => {
      const el = titleRef.current;
      if (!el || !el.parentElement) return;
      el.style.whiteSpace = 'nowrap';
      el.style.fontSize = '';
      el.style.width = 'max-content';
      const parentW = el.parentElement.clientWidth;
      const elW = el.offsetWidth;
      const currentSize = parseFloat(getComputedStyle(el).fontSize);
      el.style.width = '';
      if (elW > 0) {
        el.style.fontSize = `${currentSize * (parentW / elW)}px`;
      }
    };

    resizeHeadline();
    window.addEventListener('resize', resizeHeadline);
    return () => window.removeEventListener('resize', resizeHeadline);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 992px)', () => {
        if (
          !introRef.current ||
          !leftClipRef.current ||
          !rightClipRef.current ||
          !contentRef.current
        )
          return;

        const leftFlower = introRef.current.querySelector('.flower.arch-intro-l');
        const rightFlower = introRef.current.querySelector('.flower.arch-intro-r');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: areaRef.current,
            start: 'top 65%',
            end: '65% top',
            scrub: true,
          },
        });

        tl.fromTo(
          leftClipRef.current,
          {
            clipPath:
              'polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 36.111%, 98.889% 36.111%, 98.889% 99.074%, 44.444% 99.074%, 1.111% 100%, 100% 100%, 100% 0%)',
          },
          {
            clipPath:
              'polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 98.889% 18.519%, 98.889% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)',
            ease: 'none',
            duration: 0.5,
          }
        )
          .fromTo(
            rightClipRef.current,
            {
              clipPath:
                'polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 0.926%, 55.556% 0.926%, 55.556% 63.889%, 1.111% 63.889%, 1.111% 100%, 100% 100%, 100% 0%)',
            },
            {
              clipPath:
                'polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 1.111% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)',
              ease: 'none',
              duration: 0.5,
            },
            '<'
          )
          .to(leftClipRef.current, {
            clipPath:
              'polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 100% 18.519%, 100% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)',
            ease: 'none',
            duration: 0.1,
          })
          .to(
            rightClipRef.current,
            {
              clipPath:
                'polygon(0% 0%, 0% 100%, 0% 100%, 0% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 0% 81.481%, 0% 100%, 100% 100%, 100% 0%)',
              ease: 'none',
              duration: 0.1,
            },
            '<'
          )
          .fromTo(introRef.current, { scale: 1 }, { scale: 1.84, ease: 'InOut', duration: 0.45 });

        if (leftFlower) {
          tl.to(leftFlower, { scale: 1.84, xPercent: -50, ease: 'InOut', duration: 0.45 }, '<');
        }
        if (rightFlower) {
          tl.to(rightFlower, { scale: 1.84, xPercent: 50, ease: 'InOut', duration: 0.45 }, '<');
        }

        tl.fromTo(
          contentRef.current,
          { scale: 0.75, transformOrigin: 'center top' },
          { scale: 1, ease: 'InOut', duration: 0.45 },
          '<'
        );

        // Backdrop parallax scrub (`st[27]` yPercent: 25 from '55% top' to 'bottom top')
        if (bgImgRef.current && areaRef.current) {
          gsap.to(bgImgRef.current, {
            yPercent: 25,
            ease: 'none',
            scrollTrigger: {
              trigger: areaRef.current,
              start: '55% top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, areaRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={areaRef} data-bg="light" className="arch-scroll-area section theme_on-light">
      <div ref={introRef} className="arch-intro-s max-lg:!hidden" aria-hidden="true">
        <div ref={leftClipRef} className="arch-intro-s_bg_l" />
        <div ref={rightClipRef} className="arch-intro-s_bg_r" />
        <CornerBougainvillea className="flower arch-intro-l" />
        <CornerBougainvillea className="flower arch-intro-r" />
      </div>

      <div ref={contentRef} className="arch-w theme_on-color">
        <div className="container">
          <div className="arch-s pt-[7rem] pb-[5rem] relative">
            <div className="w_bg overflow-clip">
              <img
                ref={bgImgRef}
                src={NIRMAN_IMAGES.facadeDetail}
                alt="Monumental travertine colonnade and bougainvillea pergola"
                className="img w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="img-over-grad from-top _4x" />
              <div className="img-over-grad bot _6x" />
            </div>

            <div className="arch-s_t relative z-10 w-full">
              <div className="overflow-hidden w-full mb-[1.5rem]">
                <h2 ref={titleRef} className="h1 text-white leading-[0.85] text-center">
                  ARCHITECTURE
                </h2>
              </div>
              <div className="grid">
                <div className="arch-s_desc">
                  <p className="p1 a-center text-white/90">
                    Three stepped limestone pavilions calibrated to coastal monsoon light, deep
                    shadow overhangs, and uninterrupted cross-ventilation.
                  </p>
                </div>
              </div>
            </div>

            <div className="arch-s_b relative z-10 mt-auto">
              <div className="grid items-end">
                <div className="arch-s_quote">
                  <blockquote className="h5 text-white mb-[1.2rem]">
                    “TRUE COASTAL LUXURY IS QUIET PERMANENCE — NATURAL STONE THAT GROWS RICHER WITH
                    SALT AIR AND MONSOON RAIN.”
                  </blockquote>
                  <span className="l1 text-white/75 block">
                    STUDIO SAHYADRI ARCHITECTS · MUMBAI & ALIBAUG
                  </span>
                </div>

                <div className="arch-s_btn">
                  <CircleButton
                    label={'VIEW\nRESIDENCES'}
                    onClick={onSelectApartments}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
