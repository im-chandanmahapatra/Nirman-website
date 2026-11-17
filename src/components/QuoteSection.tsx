import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NIRMAN_IMAGES } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';

export const QuoteSection: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (!wrapRef.current || !imgRef.current) return;
      gsap.fromTo(
        imgRef.current,
        { yPercent: 0, translateZ: 10 },
        {
          yPercent: 20,
          translateZ: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        }
      );
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section data-bg="color" className="quote-w theme_on-color relative overflow-clip">
      <div className="container">
        <div ref={wrapRef} className="quote-w_bg overflow-hidden">
          <img
            ref={imgRef}
            src={NIRMAN_IMAGES.quoteDusk}
            alt="NIRMAN Residence golden hour limestone pavilion reflected in infinity pool"
            className="img w-full h-[75rem] max-md:h-[65vh] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="img-over-grad bot _6x" />
        </div>

        <div className="quote-s pb-[4rem]">
          <div className="grid items-end">
            <div className="quote-s_c">
              <span className="h3 text-white block leading-none mb-[0.4rem]" aria-hidden="true">
                “
              </span>
              <blockquote className="h5 text-white leading-[1.02] mb-[1.5rem]">
                INSTEAD OF CORRIDORS, WALKING PATHS CONNECT THE APARTMENTS — MAKING NIRMAN FEEL
                CLOSER TO A GROUP OF PRIVATE HOMES THAN A STANDARD COMPLEX.
              </blockquote>
              <span className="l1 block opacity-75">STUDIO SAHYADRI · ARCHITECTURE TEAM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
