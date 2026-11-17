import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NIRMAN_IMAGES } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { NirmanRosette } from './Icons';
import { CircleButton, DualLink } from './UiPrimitives';

interface CtaFooterSectionProps {
  onSelectApartments: () => void;
  onScrollToTop: () => void;
  onOpenCallModal: () => void;
}

export const CtaFooterSection: React.FC<CtaFooterSectionProps> = ({
  onSelectApartments,
  onScrollToTop,
  onOpenCallModal,
}) => {
  const clipImgRef = useRef<HTMLDivElement>(null);
  const footerWrapRef = useRef<HTMLElement>(null);
  const footerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (!footerWrapRef.current || !clipImgRef.current || !footerInnerRef.current) return;
      const targetClip =
        window.innerWidth >= 992 ? 'inset(8% 22% 8% 22%)' : 'inset(4% 16% 4% 16%)';

      gsap
        .timeline({
          scrollTrigger: {
            trigger: footerWrapRef.current,
            start: 'top 30%',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        })
        .fromTo(
          clipImgRef.current,
          { clipPath: 'inset(0% 0% 0% 0%)' },
          { clipPath: targetClip, ease: 'none' },
          0
        )
        .fromTo(
          footerInnerRef.current,
          { opacity: 0.2, scale: 0.75 },
          { opacity: 1, scale: 1, ease: 'none' },
          0
        );
    }, footerWrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div data-bg="color" className="theme_on-color bg-[var(--_global-colors---brand-500--velvet-plum)]">
      {/* Pre-Footer Rooftop CTA */}
      <section className="cta-w relative">
        <div className="container">
          <div className="cta-s py-[5rem] flex flex-col justify-between">
            <div ref={clipImgRef} data-footer-clip="" className="w_bg overflow-clip">
              <img
                src={NIRMAN_IMAGES.ctaPergola}
                alt="NIRMAN coastal pergola terrace framing the open Arabian Sea"
                className="img w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 48%, rgba(16, 26, 44, 0.44) 0%, rgba(16, 26, 44, 0.22) 48%, rgba(16, 26, 44, 0.08) 100%)',
                }}
              />
              <div className="img-over-grad from-top _4x" />
              <div className="img-over-grad bot _6x" />
            </div>

            <div className="grid relative z-10 pt-[2rem]">
              <div className="cta-s_desc a-center">
                <p className="l1 text-white block">
                  A SHORT CONVERSATION IS ENOUGH TO UNDERSTAND WHICH APARTMENT FITS YOUR USE CASE —
                  WHETHER IT IS A FAMILY SECOND HOME, A LONGER STAY, OR A PLACE TO RETURN TO YEAR
                  AFTER YEAR.
                </p>
              </div>
            </div>

            <div className="grid relative z-10 my-auto">
              <div className="cta-s_title a-center">
                <h2 className="h1 text-white a-center leading-[0.875] mb-[1.5rem]">
                  PERFECT
                  <br />
                  SEA VIEWS
                </h2>
                <span className="c1 text-white block a-center mb-[3rem]">
                  FROM ROOFTOP TERRACES
                </span>
                <div className="cta-s_title_btn">
                  <CircleButton
                    label={'VIEW AVAILABLE\nAPARTMENTS'}
                    onClick={onSelectApartments}
                  />
                </div>
              </div>
            </div>

            <div className="u-64" />
          </div>
        </div>
      </section>

      {/* Velvet Plum Footer */}
      <footer ref={footerWrapRef} className="footer-w relative theme_on-color">
        <div className="footer-w_bg" />
        <div className="container relative">
          <div ref={footerInnerRef} className="footer-s py-[3rem]">
            <div className="footer-s_t" />

            <div className="my-auto flex flex-col items-center">
              <div className="ico-64 mb-[2.5rem] text-white">
                <NirmanRosette />
              </div>

              <div className="grid w-full">
                <div className="footer-s_contact a-center">
                  <button
                    type="button"
                    onClick={onOpenCallModal}
                    className="h2 text-white hover:opacity-80 transition-opacity leading-none whitespace-nowrap"
                  >
                    +91 (22) 4890-6480
                  </button>
                </div>
              </div>

              <div className="u-32" />

              <div className="grid w-full">
                <div className="footer-s_address a-center">
                  <span className="l1 reg text-white/70 block mb-[0.4rem]">SALES OFFICE</span>
                  <p className="l1 text-white leading-[1.45]">
                    MANDWA JETTY ROAD, 402201
                    <br />
                    ALIBAUG, MAHARASHTRA, INDIA
                  </p>
                </div>
              </div>
            </div>

            <div className="footer-s_b">
              <div className="grid items-end">
                <div className="footer-s_info">
                  <p className="l1 reg text-white/85 mb-[0.3rem]">
                    NIRMAN RESIDENCE.
                    <br />©2026 ALL RIGHTS RESERVED
                  </p>
                  <div className="flex gap-[0.6rem] items-center">
                    <DualLink
                      label="PRIVACY POLICY"
                      onClick={onOpenCallModal}
                      textClassName="l1 text-white"
                    />
                    <span className="text-white/40 l1">,</span>
                    <DualLink
                      label="TERMS OF USE"
                      onClick={onOpenCallModal}
                      textClassName="l1 text-white"
                    />
                  </div>
                </div>

                <div className="footer-s_credits">
                  <div className="text-right">
                    <span className="l1 reg text-white/70 block mb-[0.2rem]">MADE BY</span>
                    <span className="l1 text-white">NIRMAN STUDIO</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onScrollToTop}
              className="footer-s_s-top cursor-pointer text-white hover:opacity-75 transition-opacity"
              aria-label="Scroll back to top"
            >
              <span className="l1">↑</span>
              <span className="l1">TO TOP</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
