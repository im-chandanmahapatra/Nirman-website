import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { ChamferFrame } from './UiPrimitives';

interface PreloaderProps {
  onHeroReveal?: () => void;
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onHeroReveal, onComplete }) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (
      params.get('skipLoader') === '1' ||
      params.get('autostart') === '1' ||
      prefersReducedMotion()
    ) {
      setDone(true);
      onHeroReveal?.();
      onComplete();
      return;
    }

    ensureGsapRegistered();
    const el = document.querySelector('[data-preloader]') as HTMLElement | null;
    const track = document.querySelector('.preloader_progress_track') as HTMLElement | null;
    const heroImg = document.querySelector('.hero-w_bg_master_img') as HTMLElement | null;
    if (!el) {
      setDone(true);
      onHeroReveal?.();
      onComplete();
      return;
    }

    const isDesktop = window.innerWidth >= 992;
    const startW = isDesktop ? '24vw' : '40vw';
    const midW = isDesktop ? '36vw' : '50vw';
    const initialBgScale = isDesktop ? 0.75 : 1.15;
    let revealed = false;

    const triggerHeroReveal = () => {
      if (revealed) return;
      revealed = true;
      onHeroReveal?.();
    };

    if (heroImg) {
      gsap.set(heroImg, { scale: initialBgScale, transformOrigin: 'center top' });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        triggerHeroReveal();
        setDone(true);
        onComplete();
      },
    });

    tl.set(el, { '--arch-w': startW, '--arch-y': '104vh' })
      .fromTo(
        track,
        { yPercent: -100 },
        { yPercent: 0, duration: 2.2, ease: 'loaderEase' },
        0
      )
      .fromTo(
        el,
        { '--arch-w': startW, '--arch-y': '104vh' },
        { '--arch-w': midW, '--arch-y': '15vh', duration: 1.5, ease: 'InOut' },
        0.65
      )
      .to(
        el,
        {
          '--arch-w': '125vw',
          '--arch-y': '-100vh',
          duration: 2.4,
          ease: 'diveIn',
          onStart: () => {
            if (heroImg) {
              gsap.fromTo(
                heroImg,
                { scale: initialBgScale },
                { scale: 1, duration: 1.5, ease: 'InOut', clearProps: 'transform' }
              );
            }
          },
          onUpdate: function () {
            if (!revealed && this.progress() >= 0.25) {
              triggerHeroReveal();
            }
          },
        },
        '>-0.15'
      );

    return () => {
      tl.kill();
    };
  }, [onComplete, onHeroReveal]);

  if (done) return null;

  return (
    <div data-preloader="" className="preloader theme_on-color" aria-label="Loading NIRMAN Residence">
      <div className="preloader_bg">
        <div className="preloader_bg_decor">
          <ChamferFrame />
        </div>
        <div className="preloader_bg_a" aria-hidden="true">
          <span className="a1 text-white">Alibaug</span>
        </div>
      </div>

      <div className="preloader_ctn">
        <div className="preloader_t" />
        <div className="grid items-center">
          <div className="preloader_title-l a-center">
            <span className="l1 block">KONKAN</span>
          </div>
          <div className="preloader_logo">
            <h2 className="h4 a-center leading-none">
              NIRMAN
              <br />
              RESIDENCE
            </h2>
            <div className="preloader_logo_a">
              <span className="a2 preloader_a block text-white">Alibaug</span>
            </div>
          </div>
          <div className="preloader_title-r a-center">
            <span className="l1 block">COAST</span>
          </div>
        </div>
        <div className="preloader_b pb-[3rem]">
          <div className="preloader_progress">
            <div className="preloader_progress_fill">
              <div className="preloader_progress_track" />
            </div>
            <div className="u-16" />
            <button
              type="button"
              onClick={() => {
                onHeroReveal?.();
                setDone(true);
                onComplete();
              }}
              className="l2 opacity-60 hover:opacity-100 transition-opacity"
            >
              ENTER SANCTUARY
            </button>
          </div>
        </div>
      </div>

      <div className="preloader_bg_arch" aria-hidden="true">
        <div className="preloader_bg_arch_is-1" />
        <div className="preloader_bg_arch_is-2" />
      </div>
    </div>
  );
};
