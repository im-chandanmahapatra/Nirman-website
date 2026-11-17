import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { NIRMAN_IMAGES } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';

export const MasterPlanSection: React.FC = () => {
  const wrapRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (!wrapRef.current || !imgRef.current) return;
      gsap.from(imgRef.current, {
        scale: 1.15,
        transformOrigin: 'center bottom',
        ease: 'Ease',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 0.25,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} data-bg="color" className="loc-w theme_on-color relative overflow-clip">
      <div className="container">
        <div className="loc-w_bg">
          <div className="loc-w_over-grad" />

          <div
            className="loc-w_clouds h-[24rem]"
            style={{
              background:
                'radial-gradient(ellipse 65% 55% at 25% 30%, rgba(243,243,236,0.92), transparent 72%), radial-gradient(ellipse 70% 60% at 75% 40%, rgba(243,243,236,0.85), transparent 75%)',
              filter: 'blur(18px)',
            }}
            aria-hidden="true"
          />

          <img
            ref={imgRef}
            src={NIRMAN_IMAGES.aerialCoast}
            alt="Aerial view of NIRMAN Alibaug sanctuary bordering the Arabian Sea"
            className="img loc-w_bg_img w-full h-[87.5rem] max-md:h-[75vh] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="img-over-grad bot _6x" />
        </div>

        <div className="loc-s pb-[4rem]">
          <div className="grid items-end">
            <div className="loc-s_desc">
              <div className="loc-s_desc_line line-v h-full" />
              <span className="l1 block mb-[0.8rem]">MANDWA COAST, ALIBAUG</span>
              <span className="p1 block opacity-85 mb-[0.25rem]">Konkan Coast</span>
              <span className="p1 block opacity-70">India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
