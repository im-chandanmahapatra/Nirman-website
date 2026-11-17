import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { CtaFooterSection } from './CtaFooterSection';
import { ContactSiteMapSvg, NirmanRosette } from './Icons';
import { CircleButton, NavHoverItem } from './UiPrimitives';

interface ContactViewProps {
  onOpenCallModal: () => void;
  onBackHome: () => void;
  onSelectApartments: () => void;
  onScrollToTop: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onOpenCallModal,
  onBackHome,
  onSelectApartments,
  onScrollToTop,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const chars = sectionRef.current?.querySelectorAll('.contact-title-char');
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { opacity: 0, yPercent: 50, rotateY: 90 },
          {
            opacity: 1,
            yPercent: 0,
            rotateY: 0,
            duration: 1.1,
            delay: 0.1,
            stagger: 0.04,
            ease: 'Out',
          }
        );
      }
      const cols = sectionRef.current?.querySelectorAll('[data-contact-col]');
      if (cols?.length) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: '2rem' },
          {
            opacity: 1,
            y: '0rem',
            duration: 1,
            delay: 0.25,
            stagger: 0.08,
            ease: 'Out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* Rotated Left Breadcrumb Trail matching ERA .header-cramps */}
      <div className="header-cramps theme_on-light">
        <NavHoverItem label="HOME" onClick={onBackHome} textClassName="l2" />
        <span className="l2 text-disabled">/</span>
        <span className="l2">CONTACT</span>
      </div>

      <section
        ref={sectionRef}
        data-bg="brand"
        className="contact-s theme_on-brand section relative overflow-x-clip"
      >
        <div className="container relative z-10">
          <div className="u-96 b-desk" />
          <div className="u-160 b-mob" />

          {/* Giant Display Heading */}
          <div className="grid">
            <div className="contact-s_title">
              <h1 className="h1 a-center leading-[0.875]" aria-label="CONTACT US">
                {'CONTACT US'.split(' ').map((word, wIdx, arr) => (
                  <React.Fragment key={`${word}-${wIdx}`}>
                    <span className="inline-block whitespace-nowrap">
                      {word.split('').map((ch, cIdx) => (
                        <span key={`${ch}-${cIdx}`} className="contact-title-char inline-block">
                          {ch}
                        </span>
                      ))}
                    </span>
                    {wIdx < arr.length - 1 ? ' ' : ''}
                  </React.Fragment>
                ))}
              </h1>
            </div>
          </div>

          <div className="u-96" />

          {/* 3-Column Contact Advisory Bar matching ERA .contact-s */}
          <div className="grid items-start gap-y-[2.5rem]">
            <div data-contact-col="" className="contact-s_email a-center">
              <h2 className="l1 reg a-center text-[var(--_colors---base-1000--gray-text)] mb-[0.35rem]">
                WRITE US
              </h2>
              <a
                href="mailto:hello@nirman-residence.com"
                className="l1 inline-block hover:opacity-70 transition-opacity whitespace-nowrap"
              >
                HELLO@NIRMAN-RESIDENCE.COM
              </a>
            </div>

            <div data-contact-col="" className="contact-s_loc a-center">
              <h2 className="l1 reg a-center text-[var(--_colors---base-1000--gray-text)] mb-[0.35rem]">
                SALES OFFICE
              </h2>
              <p className="l1 leading-[1.45]">
                MANDWA JETTY ROAD, 402201
                <br />
                ALIBAUG, MAHARASHTRA, INDIA
              </p>
            </div>

            <div data-contact-col="" className="contact-s_phone a-center">
              <h2 className="l1 reg a-center text-[var(--_colors---base-1000--gray-text)] mb-[0.35rem]">
                CALL US
              </h2>
              <button
                type="button"
                onClick={onOpenCallModal}
                className="l1 hover:opacity-70 transition-opacity whitespace-nowrap"
              >
                +91 (22) 4890-6480
              </button>
            </div>
          </div>
        </div>

        {/* Full-bleed Architectural Map Stage with Social Bar, Pin Callout & Circular CTA */}
        <div className="contact-s_map-w relative mt-[1rem]">
          <div className="w-full overflow-hidden">
            <ContactSiteMapSvg className="w-full h-auto min-h-[28rem] object-cover" />
          </div>

          <div className="contact-s_map_overlay container">
            <div className="grid items-center h-full">
              {/* Left Vertical Framed Socials matching ERA */}
              <div className="contact-s_socials" aria-label="Social channels">
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenCallModal();
                  }}
                  aria-label="NIRMAN LinkedIn"
                  className="contact-s_social_btn"
                >
                  <span className="l2 font-bold">in</span>
                </a>
                <span className="contact-s_social_div" />
                <a
                  href="#facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenCallModal();
                  }}
                  aria-label="NIRMAN Journal"
                  className="contact-s_social_btn"
                >
                  <span className="l2 font-bold">f</span>
                </a>
                <span className="contact-s_social_div" />
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenCallModal();
                  }}
                  aria-label="NIRMAN Instagram"
                  className="contact-s_social_btn"
                >
                  <span className="l2 font-bold">ig</span>
                </a>
              </div>

              {/* Center Dark Sales Office Pin Card matching .contact-s_map_pin_c */}
              <div className="contact-s_pin_wrap">
                <div className="contact-s_map_pin_c theme_on-color">
                  <div>
                    <span className="l2 block text-white font-bold">SALES OFFICE</span>
                    <span className="l2 reg block text-white/80 mt-[0.2rem]">
                      DAILY 09:00 - 21:00
                    </span>
                  </div>
                  <div className="ico-24 text-white">
                    <NirmanRosette />
                  </div>
                  <div className="contact-s_map_pin_arrow" aria-hidden="true" />
                </div>
              </div>

              {/* Right Circular CTA matching ERA .contact-s_btn */}
              <div className="contact-s_btn">
                <CircleButton label={'BOOK A CALL\nNOW'} onClick={onOpenCallModal} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaFooterSection
        onSelectApartments={onSelectApartments}
        onScrollToTop={onScrollToTop}
        onOpenCallModal={onOpenCallModal}
      />
    </div>
  );
};
