import { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ResidenceTypology } from './data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from './utils/motion';
import {
  resolveThemeAtPoint,
  type SectionThemeBand,
} from './utils/residences';
import { Preloader } from './components/Preloader';
import { FixedChrome, type AdaptiveTheme, type ChromeThemes } from './components/FixedChrome';
import { HeroSection } from './components/HeroSection';
import { ReasonsSection } from './components/ReasonsSection';
import { QuoteSection } from './components/QuoteSection';
import { ConceptLocationTrack } from './components/ConceptLocationTrack';
import { MasterPlanSection } from './components/MasterPlanSection';
import { TypologiesSection } from './components/TypologiesSection';
import { AmenitiesSection } from './components/AmenitiesSection';
import { SpaceToLiveSection } from './components/SpaceToLiveSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { CredentialsAccordion } from './components/CredentialsAccordion';
import { CtaFooterSection } from './components/CtaFooterSection';
import { BookACallModal, LightboxModal, MobileMenuModal } from './components/Modals';
import { ApartmentsView } from './components/ApartmentsView';
import { ContactView } from './components/ContactView';

type ActiveRoute = 'home' | 'apartments' | 'contact';

function getRouteFromPath(): ActiveRoute {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/apartments')) return 'apartments';
  if (path.startsWith('/contact')) return 'contact';
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState<ActiveRoute>(getRouteFromPath);
  const [initialTypology, setInitialTypology] = useState<ResidenceTypology | 'ALL'>('ALL');
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [heroRevealReady, setHeroRevealReady] = useState(false);
  const [chromeThemes, setChromeThemes] = useState<ChromeThemes>({
    logo: 'theme_on-color',
    nav: 'theme_on-color',
    rail: 'theme_on-color',
    scrollDown: 'theme_on-color',
  });
  const [scrollDownOpacity, setScrollDownOpacity] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxState, setLightboxState] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 0,
  });

  useEffect(() => {
    const onPopState = () => {
      setRoute(getRouteFromPath());
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => ScrollTrigger.refresh(true), 60);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Sync smooth Lenis scroll & ScrollTrigger
  useEffect(() => {
    ensureGsapRegistered();
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);
    const updateTicker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  // Independent per-element adaptive theme resolution matching ERA's initThemeChange()
  useEffect(() => {
    const updateScrollAndThemes = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
      setScrollProgress(progress);

      const sectionEls = document.querySelectorAll<HTMLElement>('[data-bg]');
      const bands: SectionThemeBand[] = [];
      sectionEls.forEach((sec) => {
        const bg = sec.dataset.bg as SectionThemeBand['bg'] | undefined;
        if (!bg) return;
        const rect = sec.getBoundingClientRect();
        bands.push({
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          bg,
        });
      });

      const defaultTheme: AdaptiveTheme =
        route === 'apartments'
          ? 'theme_on-light'
          : route === 'contact'
            ? 'theme_on-brand'
            : 'theme_on-color';

      const offsetX = vw >= 992 ? (48 / 16) * (vw / 100) : 20;
      const cellSize = vw >= 992 ? (136 / 16) * (vw / 100) : 64;

      const logoX = offsetX + cellSize * 0.5;
      const logoY = offsetX + cellSize * 0.5;
      const navX = vw - offsetX - 60;
      const navY = offsetX + 28;
      const railX = logoX;
      const railY = vh * 0.5;
      const sDownX = offsetX + 24;
      const sDownY = vh - offsetX - 36;

      setChromeThemes((prev) => {
        const next: ChromeThemes = {
          logo: resolveThemeAtPoint(bands, logoY, logoX, defaultTheme),
          nav: resolveThemeAtPoint(bands, navY, navX, defaultTheme),
          rail: resolveThemeAtPoint(bands, railY, railX, defaultTheme),
          scrollDown: resolveThemeAtPoint(bands, sDownY, sDownX, defaultTheme),
        };
        if (
          prev.logo === next.logo &&
          prev.nav === next.nav &&
          prev.rail === next.rail &&
          prev.scrollDown === next.scrollDown
        ) {
          return prev;
        }
        return next;
      });

      // Fade SCROLL indicator out cleanly as `.footer-w` moves into center bottom (ERA initScroll)
      const footerEl = document.querySelector<HTMLElement>('.footer-w');
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        const startTop = vh;
        const endTop = vh - rect.height * 0.5;
        const span = Math.max(1, startTop - endTop);
        const fade = Math.max(0, Math.min(1, (rect.top - endTop) / span));
        setScrollDownOpacity(fade);
      } else {
        setScrollDownOpacity(1);
      }
    };

    updateScrollAndThemes();
    window.addEventListener('scroll', updateScrollAndThemes, { passive: true });
    window.addEventListener('resize', updateScrollAndThemes);
    return () => {
      window.removeEventListener('scroll', updateScrollAndThemes);
      window.removeEventListener('resize', updateScrollAndThemes);
    };
  }, [route, preloaderDone]);

  const navigateTo = useCallback(
    (next: ActiveRoute, typologyFilter: ResidenceTypology | 'ALL' = 'ALL') => {
      setInitialTypology(typologyFilter);
      setRoute(next);
      setMobileMenuOpen(false);
      setHeroRevealReady(true);
      const targetPath = next === 'home' ? '/' : `/${next}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState(null, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => ScrollTrigger.refresh(true), 60);
    },
    []
  );

  const handleScrollToPercent = useCallback((p: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: p * maxScroll, behavior: 'auto' });
  }, []);

  const handleScrollDownHint = useCallback(() => {
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen">
      <Preloader
        onHeroReveal={() => setHeroRevealReady(true)}
        onComplete={() => {
          setHeroRevealReady(true);
          setPreloaderDone(true);
        }}
      />

      <FixedChrome
        chromeThemes={chromeThemes}
        scrollProgress={scrollProgress}
        scrollDownOpacity={scrollDownOpacity}
        isHomePage={route === 'home'}
        isMobileMenuOpen={mobileMenuOpen}
        onNavigate={(next) => navigateTo(next)}
        onOpenCallModal={() => setCallModalOpen(true)}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
        onScrollToPercent={handleScrollToPercent}
        onScrollDownHint={handleScrollDownHint}
      />

      {route === 'home' && (
        <main>
          <HeroSection
            revealReady={heroRevealReady}
            onSelectApartments={() => navigateTo('apartments')}
          />
          <ReasonsSection />
          <QuoteSection />
          <ConceptLocationTrack onSelectApartments={() => navigateTo('apartments')} />
          <MasterPlanSection />
          <TypologiesSection
            onExploreTypology={(typ) => navigateTo('apartments', typ)}
          />
          <AmenitiesSection onBookCall={() => setCallModalOpen(true)} />
          <SpaceToLiveSection
            onSelectApartments={() => navigateTo('apartments')}
            onOpenLightbox={(idx) => setLightboxState({ open: true, index: idx })}
          />
          <ArchitectureSection onSelectApartments={() => navigateTo('apartments')} />
          <CredentialsAccordion />
          <CtaFooterSection
            onSelectApartments={() => navigateTo('apartments')}
            onScrollToTop={handleScrollToTop}
            onOpenCallModal={() => setCallModalOpen(true)}
          />
        </main>
      )}

      {route === 'apartments' && (
        <ApartmentsView
          initialTypology={initialTypology}
          onBookCall={() => setCallModalOpen(true)}
          onBackHome={() => navigateTo('home')}
          onSelectApartments={() => navigateTo('apartments')}
          onScrollToTop={handleScrollToTop}
        />
      )}

      {route === 'contact' && (
        <ContactView
          onOpenCallModal={() => setCallModalOpen(true)}
          onBackHome={() => navigateTo('home')}
          onSelectApartments={() => navigateTo('apartments')}
          onScrollToTop={handleScrollToTop}
        />
      )}

      <BookACallModal open={callModalOpen} onClose={() => setCallModalOpen(false)} />

      <MobileMenuModal
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onNavigate={(next) => navigateTo(next)}
        onOpenCallModal={() => setCallModalOpen(true)}
      />

      <LightboxModal
        open={lightboxState.open}
        index={lightboxState.index}
        onClose={() => setLightboxState((s) => ({ ...s, open: false }))}
        onChangeIndex={(idx) => setLightboxState({ open: true, index: idx })}
      />
    </div>
  );
}
