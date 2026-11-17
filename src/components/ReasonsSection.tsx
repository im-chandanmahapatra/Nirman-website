import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { REASONS_SLIDES } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { ArrowLeftSvg, ArrowRightSvg, NirmanRosette } from './Icons';

export const ReasonsSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const total = REASONS_SLIDES.length;

  const introRef = useRef<HTMLDivElement>(null);
  const sliderSectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const slideImgWrapRef = useRef<HTMLDivElement>(null);
  const slideImgElRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const capRef = useRef<HTMLParagraphElement>(null);
  const didMountRef = useRef(false);

  // Word-spacing arch curve parallax on "THREE REASONS TO CHOOSE NIRMAN"
  useEffect(() => {
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      if (!introRef.current) return;
      const circleText = introRef.current.querySelectorAll('[data-circle-text]');
      gsap.fromTo(
        circleText,
        { wordSpacing: '0rem' },
        {
          wordSpacing: '10rem',
          ease: 'none',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, introRef);

    return () => ctx.revert();
  }, []);

  // Track visibility matching ERA IntersectionObserver (threshold: 0.2) for 6s auto-advance
  useEffect(() => {
    const target = sliderSectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    ensureGsapRegistered();

    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { width: '0%' },
        { width: '100%', duration: 6, ease: 'none', overwrite: true }
      );
    }

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
      if (progressBarRef.current) {
        gsap.fromTo(
          progressBarRef.current,
          { width: '0%' },
          { width: '100%', duration: 6, ease: 'none', overwrite: true }
        );
      }
    }, 6000);

    return () => {
      window.clearInterval(timer);
      if (progressBarRef.current) {
        gsap.killTweensOf(progressBarRef.current);
      }
    };
  }, [inView, index, total]);

  // ERA animateSlide + text stagger reveal on slide transition
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    if (prefersReducedMotion()) return;
    ensureGsapRegistered();

    if (slideImgWrapRef.current) {
      gsap.fromTo(
        slideImgWrapRef.current,
        { clipPath: 'polygon(100% 0%, 100% 0%, 101% 100%, 125% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.2,
          ease: 'InOut',
          overwrite: true,
        }
      );
    }
    if (slideImgElRef.current) {
      gsap.fromTo(
        slideImgElRef.current,
        { scale: 1.5, xPercent: 25 },
        { scale: 1, xPercent: 0, duration: 1.2, ease: 'InOut', overwrite: true }
      );
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, yPercent: 25 },
        { opacity: 1, yPercent: 0, duration: 1.0, delay: 0.15, ease: 'Out', overwrite: true }
      );
    }
    if (descRef.current && capRef.current) {
      gsap.fromTo(
        [descRef.current, capRef.current],
        { opacity: 0, y: '1.6rem' },
        {
          opacity: 1,
          y: '0rem',
          duration: 0.9,
          delay: 0.2,
          stagger: 0.1,
          ease: 'Out',
          overwrite: true,
        }
      );
    }
  }, [index]);

  const currentSlide = REASONS_SLIDES[index];
  const nextNumber = index === total - 1 ? 1 : index + 2;

  return (
    <div ref={introRef} data-bg="brand" className="benefits-intro-w theme_on-brand">
      <div className="section arch theme_on-brand overflow-clip">
        <div className="container">
          <div className="benefits-intro-s">
            <div className="benefits-intro-s_title pointer-events-none" aria-hidden="true">
              <svg viewBox="0 0 1440 760" className="w-full h-auto" fill="none">
                <defs>
                  <path
                    id="nirman-arch-text-path"
                    d="M 110,720 A 610,610 0 0,1 1330,720"
                  />
                </defs>
                <text
                  data-circle-text=""
                  fill="currentColor"
                  fontSize="54"
                  fontFamily="'ambroise-francois-std', Georgia, serif"
                  letterSpacing="-0.02em"
                  textAnchor="middle"
                >
                  <textPath href="#nirman-arch-text-path" startOffset="50%">
                    THREE REASONS TO CHOOSE NIRMAN
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="s_logo pb-[2.5rem]">
              <div className="info-s_logo_l">
                <span className="l1">KONKAN</span>
              </div>
              <div className="ico-48">
                <NirmanRosette />
              </div>
              <div className="info-s_logo_r">
                <span className="l1">COAST</span>
              </div>
            </div>

            <div className="divider">
              <div className="line-v" />
            </div>

            <div className="u-32" />
            <div className="grid">
              <div className="info-s_desc">
                <p className="l1 a-center">
                  A PLACE TO LIVE — TO
                  <br />
                  RETURN YEAR AFTER YEAR
                </p>
              </div>
            </div>
            <div className="u-48" />
          </div>
        </div>
      </div>

      <section ref={sliderSectionRef} className="section theme_on-brand">
        <div className="container">
          <div className="benefits-s">
            <div className="grid h-100">
              <div className="benefits-s_cms">
                <div className="benefit-slide py-[3rem]">
                  <div className="benefit-slide_t flex items-start justify-center pt-[2rem]">
                    <h2
                      ref={titleRef}
                      key={currentSlide.id}
                      className="h1 a-center whitespace-nowrap"
                    >
                      {currentSlide.title}
                    </h2>
                  </div>

                  <div className="benefit-slide_c my-auto">
                    <div className="w-full flex justify-center">
                      <div ref={slideImgWrapRef} className="benefit-slide_img relative rounded-[2px]">
                        <img
                          ref={slideImgElRef}
                          key={currentSlide.image + currentSlide.id}
                          src={currentSlide.image}
                          alt={currentSlide.title}
                          className="img w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="u-24" />
                    <div className="pag" aria-label="Reasons carousel pagination">
                      <button
                        type="button"
                        onClick={() => setIndex((prev) => (prev - 1 + total) % total)}
                        className="pag_prev"
                        aria-label="Previous reason"
                      >
                        <ArrowLeftSvg />
                        <span className="pag_prev_label l1">{index + 1}</span>
                      </button>

                      <div className="pag_progress">
                        <div ref={progressBarRef} className="pag_progress_fill" />
                      </div>

                      <button
                        type="button"
                        onClick={() => setIndex((prev) => (prev + 1) % total)}
                        className="pag_next"
                        aria-label="Next reason"
                      >
                        <span className="pag_prev_label l1">{nextNumber}</span>
                        <ArrowRightSvg />
                      </button>
                    </div>
                  </div>

                  <div className="benefit-slide_b pb-[2rem]">
                    <div className="grid">
                      <div className="benefit-slide_desc">
                        <p ref={descRef} className="p1 a-center">
                          {currentSlide.description}
                        </p>
                      </div>
                    </div>
                    <div className="u-24" />
                    <div className="grid">
                      <div className="benefit-slide_cap">
                        <p ref={capRef} className="l1 a-center whitespace-pre-line">
                          {currentSlide.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
