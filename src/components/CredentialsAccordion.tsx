import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CREDENTIALS } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { CornerBougainvillea, PlusMinusSvg } from './Icons';

export const CredentialsAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const flower = sectionRef.current?.querySelector('.flower.other');
      if (flower) {
        gsap.fromTo(
          flower,
          { yPercent: -10 },
          {
            yPercent: 10,
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

  const toggleItem = (id: string) => {
    const nextOpenId = openId === id ? null : id;
    setOpenId(nextOpenId);

    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    Object.entries(panelRefs.current).forEach(([key, panel]) => {
      if (!panel) return;
      if (key === nextOpenId) {
        gsap.to(panel, {
          height: 'auto',
          opacity: 1,
          duration: 1.0,
          ease: 'Out',
          overwrite: true,
          onComplete: () => ScrollTrigger.refresh(),
        });
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'Out',
          overwrite: true,
          onComplete: () => ScrollTrigger.refresh(),
        });
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      data-bg="light"
      className="other-w section theme_on-light py-[8rem] relative overflow-clip"
    >
      <CornerBougainvillea className="flower other max-lg:hidden" />

      <div className="container">
        <div className="grid mb-[3rem]">
          <div className="other-s flex flex-col items-center">
            <span className="l1 block a-center mb-[2rem]">
              A PLACE TO LIVE — TO
              <br />
              RETURN YEAR AFTER YEAR
            </span>
            <div className="divider">
              <div className="line-v" />
            </div>
          </div>
        </div>

        <div className="grid">
          <div className="other-s_cms">
            <div className="flex flex-col gap-[0.4rem]">
              {CREDENTIALS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="other-card py-[0.8rem]">
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="w-full"
                      aria-expanded={isOpen}
                    >
                      <div className="other-card_name">
                        <span className="other-card_name_label h3 a-center">
                          {item.title}
                          <span className="other-card_ico">
                            <PlusMinusSvg rotated={isOpen} className="ico-16" />
                          </span>
                        </span>
                      </div>
                    </button>

                    <div
                      ref={(el) => {
                        panelRefs.current[item.id] = el;
                      }}
                      className="overflow-hidden"
                      style={{ height: 0, opacity: 0 }}
                    >
                      <div className="pt-[1.5rem] pb-[1rem]">
                        <div className="grid _6-columns">
                          <div className="other-card_info_desc text-center">
                            <span className="l1 block mb-[0.75rem]">{item.subtitle}</span>
                            <div className="info_divider line-h my-[0.75rem]" />
                            <p className="p1 text-gray mb-[1rem] max-w-[34rem]">
                              {item.description}
                            </p>
                            <span className="l2 text-gray tracking-widest">{item.entity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
