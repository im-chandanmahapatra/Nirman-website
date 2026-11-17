import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { formatScrollPercent, type AdaptiveTheme } from '../utils/residences';
import { NirmanRosette, RotatingSealText, VerticalArrowDown } from './Icons';
import { ChamferFrame, DualLink, NavHoverItem } from './UiPrimitives';

export type { AdaptiveTheme };

export interface ChromeThemes {
  logo: AdaptiveTheme;
  nav: AdaptiveTheme;
  rail: AdaptiveTheme;
  scrollDown: AdaptiveTheme;
}

interface FixedChromeProps {
  chromeThemes: ChromeThemes;
  scrollProgress: number;
  scrollDownOpacity: number;
  isHomePage: boolean;
  isMobileMenuOpen: boolean;
  onNavigate: (view: 'home' | 'apartments' | 'contact') => void;
  onOpenCallModal: () => void;
  onToggleMobileMenu: () => void;
  onScrollToPercent: (p: number) => void;
  onScrollDownHint: () => void;
}

export const FixedChrome: React.FC<FixedChromeProps> = ({
  chromeThemes,
  scrollProgress,
  scrollDownOpacity,
  isHomePage,
  isMobileMenuOpen,
  onNavigate,
  onOpenCallModal,
  onToggleMobileMenu,
  onScrollToPercent,
  onScrollDownHint,
}) => {
  const sealRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const cookieCardRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const rotationRef = useRef(0);
  const speedRef = useRef(30);

  const [cookieStatus, setCookieStatus] = useState<'pending' | 'dismissed'>(() => {
    try {
      return localStorage.getItem('nirman_cookies') ? 'dismissed' : 'pending';
    } catch {
      return 'pending';
    }
  });

  useEffect(() => {
    let rafId = 0;
    let lastTime = performance.now();

    const onScroll = () => {
      const currY = window.scrollY;
      const dy = currY - lastScrollYRef.current;
      lastScrollYRef.current = currY;
      if (dy !== 0) {
        const dir = dy > 0 ? 1 : -1;
        speedRef.current = dir * (30 + Math.min(240, Math.abs(dy) * 5));
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 64) / 1000;
      lastTime = now;
      const base = speedRef.current >= 0 ? 30 : -30;
      speedRef.current += (base - speedRef.current) * 0.08;
      rotationRef.current += speedRef.current * dt;
      if (sealRef.current) {
        sealRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (cookieStatus !== 'pending' || prefersReducedMotion() || !cookieCardRef.current) return;
    ensureGsapRegistered();
    gsap.fromTo(
      cookieCardRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.8, delay: 0.3, ease: 'Out', overwrite: true }
    );
  }, [cookieStatus]);

  const handleRailDrag = (clientY: number) => {
    if (!railRef.current) return;
    const rect = railRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    onScrollToPercent(p);
  };

  const acceptCookies = (choice: 'accepted' | 'declined') => {
    try {
      localStorage.setItem('nirman_cookies', choice);
    } catch {
      // storage blocked fallback
    }
    if (cookieCardRef.current && !prefersReducedMotion()) {
      ensureGsapRegistered();
      gsap.to(cookieCardRef.current, {
        yPercent: 100,
        duration: 0.6,
        ease: 'In',
        onComplete: () => setCookieStatus('dismissed'),
      });
    } else {
      setCookieStatus('dismissed');
    }
  };

  const logoTheme = isMobileMenuOpen ? 'theme_on-color' : chromeThemes.logo;
  const navTheme = isMobileMenuOpen ? 'theme_on-color' : chromeThemes.nav;
  const railTheme = isMobileMenuOpen ? 'theme_on-color' : chromeThemes.rail;
  const scrollDownTheme = isMobileMenuOpen ? 'theme_on-color' : chromeThemes.scrollDown;

  return (
    <>
      <button
        type="button"
        onClick={() => onNavigate('home')}
        data-theme=""
        className={`header-logo ${logoTheme}`}
        aria-label="NIRMAN Residence Home"
      >
        <div ref={sealRef} className="header-logo_bg">
          <RotatingSealText />
        </div>
        <div className="logo_symbol header">
          <NirmanRosette />
        </div>
      </button>

      <nav data-theme="" className={`header-nav ${navTheme}`} aria-label="Primary Navigation">
        <div className="header-nav_list f-desk items-end">
          <DualLink
            label={'SELECT\nAN APARTMENT'}
            onClick={() => onNavigate('apartments')}
            textClassName="h6 text-right leading-[1] whitespace-pre-line"
          />
          <div className="u-16" />
          <div className="flex flex-col items-end gap-[0.25rem]">
            <NavHoverItem label="BOOK A CALL" onClick={onOpenCallModal} textClassName="l1" />
            <NavHoverItem label="CONTACT" onClick={() => onNavigate('contact')} textClassName="l1" />
          </div>
        </div>

        <div className="header-nav_list f-mob items-end">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="btn-menu l1 flex items-center gap-[0.5rem]"
            aria-expanded={isMobileMenuOpen}
          >
            <span>{isMobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            <span className="ico-24 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                {isMobileMenuOpen ? (
                  <>
                    <path d="M5 5L19 19" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" />
                  </>
                ) : (
                  <>
                    <circle cx="12" cy="5" r="1.4" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.4" fill="currentColor" />
                    <circle cx="12" cy="19" r="1.4" fill="currentColor" />
                  </>
                )}
              </svg>
            </span>
          </button>
        </div>
      </nav>

      {isHomePage && (
        <div
          data-theme=""
          className={`s-bar-w ${railTheme}`}
          style={{ '--progress': `${Math.round(scrollProgress * 1000) / 10}%` } as React.CSSProperties}
        >
          <div
            ref={railRef}
            className="s-bar"
            onPointerDown={(e) => {
              draggingRef.current = true;
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              handleRailDrag(e.clientY);
            }}
            onPointerMove={(e) => {
              if (draggingRef.current) handleRailDrag(e.clientY);
            }}
            onPointerUp={() => {
              draggingRef.current = false;
            }}
          >
            <div className="s-bar_track" />
            <div className="s-bar_fill" />
            <div className="s-bar_thumb">
              <span className="l1">{formatScrollPercent(scrollProgress)}</span>
            </div>
          </div>
        </div>
      )}

      {isHomePage && scrollDownOpacity > 0.01 && (
        <button
          type="button"
          onClick={onScrollDownHint}
          data-theme=""
          className={`s-down ${scrollDownTheme} cursor-pointer`}
          style={{ opacity: scrollDownOpacity }}
          aria-label="Scroll down"
        >
          <div className="s-down_arrow">
            <VerticalArrowDown />
          </div>
          <span className="l1">SCROLL</span>
        </button>
      )}

      {cookieStatus === 'pending' && (
        <aside className="cookies" role="dialog" aria-label="Cookie Notice">
          <div className="cookies_c">
            <div className="grid">
              <div ref={cookieCardRef} className="cookies_card theme_on-light">
                <ChamferFrame small />
                <div className="cookies_card_t">
                  <div className="cookies_card_title">
                    <span className="a2 block b-desk">Cookies</span>
                    <span className="l1 reg b-mob">COOKIES</span>
                  </div>
                </div>
                <div className="cookies_card_b">
                  <p className="l2 a-center max-lg:!text-left mb-[1.1rem]">
                    THIS WEBSITE USES COOKIES TO
                    <br className="max-lg:hidden" /> ENSURE YOU GET THE BEST
                    <br className="max-lg:hidden" /> EXPERIENCE ON WEBSITE.
                  </p>
                  <div className="cookies_card_btn-list max-lg:!justify-start">
                    <DualLink
                      label="ACCEPT"
                      onClick={() => acceptCookies('accepted')}
                      textClassName="h6"
                    />
                    <span className="opacity-25 h6">/</span>
                    <DualLink
                      label="DECLINE"
                      onClick={() => acceptCookies('declined')}
                      textClassName="h6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
