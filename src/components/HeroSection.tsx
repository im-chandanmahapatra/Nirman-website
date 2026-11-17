import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { HERO_HOTSPOTS, NIRMAN_IMAGES, type HotspotPin } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { computeHeroScrollMetrics } from '../utils/residences';
import { PinPlusSvg } from './Icons';
import { ChamferFrame, CircleButton } from './UiPrimitives';

interface HeroSectionProps {
  revealReady: boolean;
  onSelectApartments: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  revealReady,
  onSelectApartments,
}) => {
  const [mode, setMode] = useState<'day' | 'night'>('day');
  const [activePin, setActivePin] = useState<HotspotPin | null>(null);
  const [hoveredPin, setHoveredPin] = useState<HotspotPin | null>(null);

  const areaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgMasterImgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nightLayerRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const floatingTipRef = useRef<HTMLDivElement>(null);
  const lastCursorRef = useRef({ x: 0, y: 0 });
  const tipCardBoundsRef = useRef({ left: false, top: false });
  const [tipFlip, setTipFlip] = useState({ left: false, top: false });
  const prevModeRef = useRef<'day' | 'night'>('day');

  // Entrance animations synchronized with Preloader arch-dive handoff (matching ERA durL=1.2, delayReveal=0.3, ease='Out')
  useEffect(() => {
    if (!revealReady || prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (!areaRef.current) return;

      const headingLines = areaRef.current.querySelectorAll('.hero-reveal-char');
      const scriptChars = areaRef.current.querySelectorAll('.hero-reveal-script-char');
      const tabsEl = areaRef.current.querySelector('.hero-s_tabs');
      const bgImgEl = bgMasterImgRef.current;

      // Subtle background settle when entering without preloader curtain
      if (bgImgEl && !document.querySelector('[data-preloader]')) {
        gsap.fromTo(
          bgImgEl,
          { scale: window.innerWidth >= 992 ? 0.94 : 1.06, transformOrigin: 'center top' },
          { scale: 1, duration: 1.5, ease: 'InOut', clearProps: 'transform' }
        );
      }

      if (headingLines.length) {
        gsap.fromTo(
          headingLines,
          { opacity: 0, yPercent: 50, rotateY: 90 },
          {
            opacity: 1,
            yPercent: 0,
            rotateY: 0,
            duration: 1.2,
            delay: 0.25,
            stagger: 0.04,
            ease: 'Out',
            overwrite: true,
          }
        );
      }

      if (scriptChars.length) {
        gsap.fromTo(
          scriptChars,
          { opacity: 0, rotateX: 90, x: '4rem', transformOrigin: 'center bottom' },
          {
            opacity: 1,
            rotateX: 0,
            x: '0rem',
            duration: 1.2,
            delay: 0.35,
            stagger: 0.07,
            ease: 'Out',
            overwrite: true,
          }
        );
      }

      if (tabsEl) {
        gsap.fromTo(
          tabsEl,
          { opacity: 0, y: window.innerWidth >= 992 ? '3.333rem' : '8vw' },
          {
            opacity: 1,
            y: '0rem',
            duration: 1.2,
            delay: 0.3,
            ease: 'Out',
            overwrite: true,
          }
        );
      }
    }, areaRef);

    return () => ctx.revert();
  }, [revealReady]);

  // Scroll-driven Hero choreography & ScrollTrigger entrance for `.hero-s_btn`
  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (!areaRef.current || !bgRef.current || !contentRef.current) return;

      const isDesktop = window.innerWidth >= 992;
      const bgHeight = bgRef.current.offsetHeight || window.innerWidth * 0.9;
      const vh = window.innerHeight;
      const metrics = computeHeroScrollMetrics(bgHeight, vh, isDesktop);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: areaRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      if (isDesktop) {
        tl.fromTo(
          contentRef.current,
          { y: 0 },
          { y: metrics.contentTargetY, ease: 'Ease', duration: 0.6 },
          0
        ).fromTo(
          bgRef.current,
          { y: 0 },
          { y: metrics.bgTargetY, ease: 'Ease', duration: 0.6 },
          0
        );
      }

      tl.fromTo(
        bgRef.current,
        { scale: 1, translateZ: 10, transformOrigin: '50% 75%' },
        { scale: metrics.zoomTargetScale, translateZ: 10, ease: 'In', duration: 0.6 },
        metrics.zoomStartTime
      );

      // Reveal circular CTA when `.hero-s_b` enters the viewport (`opacity: 0, y: 3.333rem -> 1, 0`)
      if (ctaWrapRef.current) {
        gsap.fromTo(
          ctaWrapRef.current,
          { opacity: 0, y: isDesktop ? '3.333rem' : '2.5rem' },
          {
            opacity: 1,
            y: '0rem',
            duration: 1.2,
            delay: 0.3,
            ease: 'Out',
            scrollTrigger: {
              trigger: ctaWrapRef.current,
              start: 'top bottom',
              once: true,
            },
          }
        );
      }

      // Staggered infinite pin pulse animations matching ERA initPins()
      areaRef.current.querySelectorAll('[data-pin]').forEach((pinEl) => {
        const pulses = pinEl.querySelectorAll('[data-pin-pulse]');
        const baseW = (pinEl as HTMLElement).offsetWidth || 32;
        if (pulses.length) {
          gsap.fromTo(
            pulses,
            { opacity: 1, width: baseW, height: baseW },
            {
              opacity: 0,
              width: 1.6 * baseW,
              height: 1.6 * baseW,
              duration: 1.2,
              ease: 'In',
              stagger: 0.2,
              repeat: -1,
            }
          );
        }
      });
    }, areaRef);

    return () => ctx.revert();
  }, []);

  // ERA initTabsHero smooth cross-layer dissolve on day/night toggle
  useEffect(() => {
    if (prevModeRef.current === mode) return;
    prevModeRef.current = mode;
    if (!nightLayerRef.current) return;
    ensureGsapRegistered();

    gsap.killTweensOf(nightLayerRef.current);
    gsap.to(nightLayerRef.current, {
      opacity: mode === 'night' ? 1 : 0,
      duration: 0.8,
      ease: 'InOut',
    });
  }, [mode]);

  // ERA initFloatingTips smooth cursor tracking (2.4s power3 follow) anchored immediately on hover
  useLayoutEffect(() => {
    if (!hoveredPin || window.innerWidth < 992) return;
    ensureGsapRegistered();
    const tipEl = floatingTipRef.current;
    if (!tipEl) return;

    const updateFlip = (x: number, y: number) => {
      const rect = tipEl.getBoundingClientRect();
      const left = x + rect.width > window.innerWidth;
      const top = y + rect.height > window.innerHeight;
      if (
        tipCardBoundsRef.current.left !== left ||
        tipCardBoundsRef.current.top !== top
      ) {
        tipCardBoundsRef.current = { left, top };
        setTipFlip({ left, top });
      }
    };

    const { x, y } = lastCursorRef.current;
    gsap.killTweensOf(tipEl);
    gsap.set(tipEl, { x, y });
    updateFlip(x, y);

    const onMove = (e: MouseEvent) => {
      lastCursorRef.current = { x: e.clientX, y: e.clientY };
      updateFlip(e.clientX, e.clientY);
      gsap.to(tipEl, {
        x: e.clientX,
        y: e.clientY,
        duration: 2.4,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
    };
  }, [hoveredPin]);

  const handlePinMouseEnter = (pin: HotspotPin, e: React.MouseEvent<HTMLElement>) => {
    const plusEl = e.currentTarget.querySelector('[data-ico-plus="v"]');
    if (plusEl && !prefersReducedMotion()) {
      gsap.fromTo(plusEl, { rotate: 0 }, { rotate: -90, duration: 0.8, ease: 'Out', overwrite: true });
    }
    if (window.innerWidth >= 992) {
      const rect = e.currentTarget.getBoundingClientRect();
      lastCursorRef.current = {
        x: e.clientX || rect.left + rect.width * 0.5,
        y: e.clientY || rect.top + rect.height * 0.5,
      };
      setHoveredPin(pin);
    }
  };

  const handlePinMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const plusEl = e.currentTarget.querySelector('[data-ico-plus="v"]');
    if (plusEl && !prefersReducedMotion()) {
      gsap.to(plusEl, { rotate: -180, duration: 0.8, ease: 'Out', overwrite: true });
    }
    setHoveredPin(null);
  };

  const renderSplitHeading = (text: string) =>
    text.split(' ').map((word, wIdx, arr) => (
      <React.Fragment key={`${word}-${wIdx}`}>
        <span className="split-word inline-block whitespace-nowrap">
          {word.split('').map((ch, cIdx) => (
            <span key={`${ch}-${cIdx}`} className="split-char hero-reveal-char inline-block">
              {ch}
            </span>
          ))}
        </span>
        {wIdx < arr.length - 1 ? ' ' : ''}
      </React.Fragment>
    ));

  return (
    <section
      id="hero"
      ref={areaRef}
      data-bg="color"
      className="hero-scroll-area theme_on-color"
      style={{ backgroundColor: 'var(--_global-colors---brand-500--velvet-plum)' }}
    >
      <div className="hero-w overflow-clip">
        <div className="container h-full relative">
          <div ref={bgRef} className="hero-w_bg">
            <div className="hero-w_bg_master">
              <div ref={bgMasterImgRef} className="hero-w_bg_master_img">
                <div className="hero-w_bg_master_img_day">
                  <img
                    src={NIRMAN_IMAGES.heroDay}
                    alt="NIRMAN Residence coastal courtyard and travertine pool by day"
                    className="img hero-img w-full h-full object-cover object-bottom"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div
                  ref={nightLayerRef}
                  className="hero-w_bg_master_img_night"
                  style={{ opacity: mode === 'night' ? 1 : 0 }}
                >
                  <img
                    src={NIRMAN_IMAGES.heroNight}
                    alt="NIRMAN Residence illuminated courtyard and pool by night"
                    className="img hero-img w-full h-full object-cover object-bottom"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="img-over-grad from-top _4x" />
                <div className="img-over-grad bot _4x" />

                <div className="pins-cms">
                  <div className="pins-cms_list">
                    {HERO_HOTSPOTS.map((pin) => (
                      <div
                        key={pin.id}
                        data-pin={pin.id}
                        className="pins-cms_list_item"
                        style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                      >
                        <button
                          type="button"
                          onClick={() => setActivePin(activePin?.id === pin.id ? null : pin)}
                          onMouseEnter={(e) => handlePinMouseEnter(pin, e)}
                          onMouseLeave={handlePinMouseLeave}
                          className="pin"
                          aria-label={pin.title}
                        >
                          <span className="pin_bg">
                            <span data-pin-pulse="" className="pin_bg_pulse" />
                            <span data-pin-pulse="" className="pin_bg_pulse" />
                          </span>
                          <span className="pin_dot">
                            <span data-ico-plus="v" className="ico-16 theme_on-light flex items-center justify-center">
                              <PinPlusSvg className="w-[10px] h-[10px]" />
                            </span>
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Positioned inside hero-w_bg_master like ERA Residence */}
              <div className="hero-s_b">
                <div className="grid">
                  <div className="hero-s_desc flex flex-col items-center">
                    <div ref={ctaWrapRef} className="hero-s_btn e-auto">
                      <CircleButton
                        label={'VIEW AVAILABLE\nAPARTMENTS'}
                        onClick={onSelectApartments}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div ref={contentRef} className="hero-s">
            <div className="u-32" />
            <div className="grid">
              <div className="hero-s_logo">
                <h1 className="h1 a-center select-none" aria-label="NIRMAN RESIDENCE">
                  {renderSplitHeading('NIRMAN')}
                  <br />
                  {renderSplitHeading('RESIDENCE')}
                </h1>
                <div className="hero-s_logo_a" aria-label="Alibaug">
                  <span className="a1 block text-white leading-[0.85]">
                    {'Alibaug'.split('').map((ch, idx) => (
                      <span
                        key={`${ch}-${idx}`}
                        className="split-char hero-reveal-script-char inline-block"
                      >
                        {ch}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            <div className="u-48" />

            <div className="grid items-center">
              <div className="hero-s_title">
                <span className="h6 whitespace-nowrap" aria-label="A PLACE">
                  {renderSplitHeading('A PLACE')}
                </span>

                <div className="hero-s_tabs" role="tablist" aria-label="Day or Night atmosphere">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'day'}
                    onClick={() => setMode('day')}
                    className={`nav-item l2 transition-opacity ${
                      mode === 'day' ? 'opacity-100 is-active' : 'opacity-45 hover:opacity-80'
                    }`}
                  >
                    <span className="nav-item_label">
                      <span className="nav-item_label_text l2">BY DAY</span>
                      <span className="nav-item_label_text is-2 l2">BY DAY</span>
                    </span>
                  </button>
                  <span className={`hero-s_tabs_divider is-${mode}`} />
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mode === 'night'}
                    onClick={() => setMode('night')}
                    className={`nav-item l2 transition-opacity ${
                      mode === 'night' ? 'opacity-100 is-active' : 'opacity-45 hover:opacity-80'
                    }`}
                  >
                    <span className="nav-item_label">
                      <span className="nav-item_label_text l2">BY NIGHT</span>
                      <span className="nav-item_label_text is-2 l2">BY NIGHT</span>
                    </span>
                  </button>
                </div>

                <span className="h6 whitespace-nowrap a-right" aria-label="TO RETURN TO">
                  {renderSplitHeading('TO RETURN TO')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop cursor-following floating tip card (ERA initFloatingTips) */}
      {hoveredPin && (
        <div
          ref={floatingTipRef}
          className={`floating-tip is-active ${tipFlip.left ? 'is-left' : ''} ${
            tipFlip.top ? 'is-top' : ''
          }`}
          aria-hidden="true"
        >
          <div className="floating-tip-card theme_on-light shadow-2xl">
            <ChamferFrame small />
            <div className="floating-tip-card_t relative z-10">
              <span className="l2 text-gray block mb-[0.4rem]">{hoveredPin.kicker}</span>
              <h3 className="h5">{hoveredPin.title}</h3>
            </div>
            <div className="floating-tip-card_b relative z-10">
              <p className="p1 text-gray mb-[0.8rem]">{hoveredPin.description}</p>
              <span className="l1 block pt-[0.5rem] border-t border-[var(--_colors---base-1000--line)]">
                {hoveredPin.metric}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Click / Mobile detail modal dialog */}
      {activePin && (
        <div
          className="fixed bottom-[3rem] left-[50%] -translate-x-1/2 z-[1500] theme_on-light pointer-events-auto"
          role="dialog"
          aria-label={activePin.title}
        >
          <div className="relative bg-[var(--_global-colors---base-0--100)] text-[var(--_global-colors---base-1000--100)] px-[2.4rem] py-[2rem] w-[26rem] max-w-[90vw] rounded-[4px] shadow-2xl">
            <ChamferFrame small />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-[0.8rem]">
                <span className="l2 text-gray">{activePin.kicker}</span>
                <button
                  type="button"
                  onClick={() => setActivePin(null)}
                  className="l2 opacity-60 hover:opacity-100"
                  aria-label="Close hotspot detail"
                >
                  CLOSE ✕
                </button>
              </div>
              <h3 className="h5 mb-[0.8rem]">{activePin.title}</h3>
              <p className="p1 text-gray mb-[1rem]">{activePin.description}</p>
              <span className="l1 block pt-[0.6rem] border-t border-[var(--_colors---base-1000--line)]">
                {activePin.metric}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
