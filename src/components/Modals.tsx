import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { INTERIOR_GALLERY } from '../data/nirmanData';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';
import { validateCallBooking } from '../utils/residences';
import { ArrowLeftSvg, ArrowRightSvg, NirmanRosette } from './Icons';
import { ChamferFrame, DualLink, PillButton } from './UiPrimitives';

interface BookACallModalProps {
  open: boolean;
  onClose: () => void;
}

export const BookACallModal: React.FC<BookACallModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    if (!prefersReducedMotion() && cardRef.current && overlayRef.current) {
      ensureGsapRegistered();
      gsap.set(cardRef.current, { transformPerspective: 1000 });
      gsap.fromTo(
        cardRef.current,
        { scale: 0, rotateX: -90, yPercent: -100, rotate: -25 },
        {
          scale: 1,
          rotateX: 0,
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          ease: 'Out',
          overwrite: true,
        }
      );
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'Out', overwrite: true }
      );
    }

    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = validateCallBooking({ name, phone, email, notes });
    if (!res.valid) {
      setError(res.error || 'Please check your input.');
      return;
    }
    setError(null);
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
    }, 350);
  };

  return (
    <div className="modal show" role="dialog" aria-modal="true" aria-label="Book a Private Call">
      <div ref={overlayRef} className="modal_over" onClick={onClose} />
      <div className="modal_c">
        <div className="modal_cta">
          <div className="grid">
            <div ref={cardRef} className="modal_cta_c theme_on-brand shadow-2xl">
              <ChamferFrame />

              <button
                type="button"
                onClick={onClose}
                className="modal_cta_close btn-ico z-20"
                aria-label="Close modal"
              >
                <span className="l1">✕</span>
              </button>

              {status === 'sent' ? (
                <div className="form_success_c relative z-10 text-center py-[3rem]">
                  <div className="ico-48 mb-[1.5rem]">
                    <NirmanRosette />
                  </div>
                  <h2 className="h2 mb-[0.5rem]">THANK YOU</h2>
                  <span className="a2 block text-[4rem] mb-[1.5rem] -rotate-6">
                    We will call you shortly
                  </span>
                  <p className="p1 text-gray max-w-[26rem] mb-[2rem]">
                    A private client advisor from Nirman Estates will reach out within one
                    business hour to arrange your Alibaug or Mumbai consultation.
                  </p>
                  <PillButton
                    label="CLOSE WINDOW"
                    onClick={() => {
                      setStatus('idle');
                      setName('');
                      setPhone('');
                      setEmail('');
                      setNotes('');
                      onClose();
                    }}
                  />
                </div>
              ) : (
                <div className="form_block relative z-10 gap-[2rem]">
                  <div className="modal_cta_l">
                    <div className="modal_cta_l_t">
                      <span className="l1 block mb-[0.5rem]">PRIVATE ADVISORY</span>
                      <h2 className="h3 leading-[0.88]">
                        BOOK A
                        <br />
                        CALL
                      </h2>
                      <div className="modal_cta_a">
                        <span className="a2 block text-[4.5rem]">Nirman</span>
                      </div>
                    </div>

                    <div className="modal_cta_l_b">
                      <p className="p1 text-gray modal_cta_desc">
                        Receive floorplans, pricing schedules, or reserve a Mandwa speedboat
                        site tour.
                      </p>
                    </div>
                  </div>

                  <div className="modal_cta_c_c max-lg:hidden">
                    <div className="line-v flex-1 opacity-20" />
                    <div className="modal_cta_c_logo">
                      <div className="ico-48">
                        <NirmanRosette />
                      </div>
                    </div>
                    <div className="line-v flex-1 opacity-20" />
                  </div>

                  <div className="modal_cta_r">
                    <form onSubmit={handleSubmit} className="modal_cta_form_c" noValidate>
                      <div className="flex flex-col gap-[1.5rem]">
                        <div className="input">
                          <label className={`input_label l2 ${name ? 'focused' : ''}`}>NAME*</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input_field p1"
                            aria-label="Full Name"
                          />
                        </div>

                        <div className="input">
                          <label className={`input_label l2 ${phone ? 'focused' : ''}`}>
                            PHONE*
                          </label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="input_field p1"
                            aria-label="Phone Number"
                          />
                        </div>

                        <div className="input">
                          <label className={`input_label l2 ${email ? 'focused' : ''}`}>
                            EMAIL*
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input_field p1"
                            aria-label="Email Address"
                          />
                        </div>

                        <div className="input">
                          <label className={`input_label l2 ${notes ? 'focused' : ''}`}>
                            RESIDENCE PREFERENCE
                          </label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="input_field area p1 pt-[1.8rem]"
                            aria-label="Residence Preference"
                          />
                        </div>
                      </div>

                      {error && (
                        <p className="l2 text-[var(--_colors---additional--error)] a-center my-[0.75rem]">
                          {error}
                        </p>
                      )}

                      <div className="form_block_b pt-[1.5rem]">
                        <span className="p2 text-gray form_block_legal">
                          By submitting, you agree to private concierge contact from Nirman Estates.
                        </span>
                        <PillButton
                          type="submit"
                          label={status === 'sending' ? 'SENDING...' : 'REQUEST CALL'}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MobileMenuModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'apartments' | 'contact') => void;
  onOpenCallModal: () => void;
}

export const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  open,
  onClose,
  onNavigate,
  onOpenCallModal,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || prefersReducedMotion() || !menuRef.current) return;
    ensureGsapRegistered();
    gsap.fromTo(
      menuRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'Out', overwrite: true }
    );
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={menuRef}
      className="modal menu show theme_on-color"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="modal_bg" />
      <div className="modal_c py-[96px]">
        <div className="modal_menu">
          <div className="modal_menu_title">
            <span className="a1 block text-[44px] leading-none text-white/95 -mb-[10px] -rotate-6">
              The
            </span>
            <h2 className="h1 a-center leading-[0.88] text-white">MENU</h2>
          </div>

          <div className="modal_menu_list my-auto">
            <DualLink
              label="HOME"
              onClick={() => {
                onNavigate('home');
                onClose();
              }}
              textClassName="h6 text-white text-[26px] leading-[1.1]"
            />
            <DualLink
              label="SELECT AN APARTMENT"
              onClick={() => {
                onNavigate('apartments');
                onClose();
              }}
              textClassName="h6 text-white text-[26px] leading-[1.1]"
            />
            <DualLink
              label="BOOK A CALL"
              onClick={() => {
                onClose();
                onOpenCallModal();
              }}
              textClassName="h6 text-white text-[26px] leading-[1.1]"
            />
            <DualLink
              label="CONTACT"
              onClick={() => {
                onNavigate('contact');
                onClose();
              }}
              textClassName="h6 text-white text-[26px] leading-[1.1]"
            />
          </div>

          <div className="a-center">
            <span className="l1 block text-white/85 mb-[6px]">+91 (22) 4890-6480</span>
            <span className="l2 block text-white/60">MANDWA JETTY ROAD, ALIBAUG</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LightboxModalProps {
  open: boolean;
  index: number;
  onClose: () => void;
  onChangeIndex: (next: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  open,
  index,
  onClose,
  onChangeIndex,
}) => {
  const [zoomed, setZoomed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const pagRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);
  const panStateRef = useRef({ targetY: 0, currentY: 0, maxOffset: 0 });

  useEffect(() => {
    setZoomed(false);
    if (imgRef.current) {
      gsap.set(imgRef.current, { scale: 1, y: 0 });
    }
  }, [index, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoomed) setZoomed(false);
        else onClose();
      }
      if (e.key === 'ArrowLeft') {
        setZoomed(false);
        onChangeIndex((index - 1 + INTERIOR_GALLERY.length) % INTERIOR_GALLERY.length);
      }
      if (e.key === 'ArrowRight') {
        setZoomed(false);
        onChangeIndex((index + 1) % INTERIOR_GALLERY.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, index, zoomed, onClose, onChangeIndex]);

  // ERA initImageZoom desktop click-to-zoom full width + vertical mouse-pan lerp
  useEffect(() => {
    if (!open || !imgRef.current) return;
    ensureGsapRegistered();
    const imgEl = imgRef.current;

    if (zoomed && window.innerWidth >= 992) {
      const targetScale = Math.max(1.25, window.innerWidth / (imgEl.offsetWidth || window.innerWidth * 0.7));
      const zoomedH = imgEl.offsetHeight * targetScale;
      panStateRef.current.maxOffset = Math.max(0, (zoomedH - window.innerHeight) / 2);
      panStateRef.current.targetY = 0;
      panStateRef.current.currentY = 0;

      gsap.to(imgEl, { scale: targetScale, duration: 0.8, ease: 'Out', overwrite: true });
      if (pagRef.current) gsap.to(pagRef.current, { yPercent: 100, duration: 0.8, ease: 'Out' });
      if (closeRef.current) gsap.to(closeRef.current, { xPercent: 250, duration: 0.8, ease: 'Out' });
      if (decorRef.current) gsap.to(decorRef.current, { scale: 1.1, duration: 0.8, ease: 'Out' });

      const onMove = (e: MouseEvent) => {
        const max = panStateRef.current.maxOffset;
        if (max <= 0) return;
        const pct = e.clientY / window.innerHeight;
        panStateRef.current.targetY = max * (1 - 2 * pct);
      };

      const tick = () => {
        panStateRef.current.currentY +=
          (panStateRef.current.targetY - panStateRef.current.currentY) * 0.08;
        gsap.set(imgEl, { y: panStateRef.current.currentY });
      };

      gsap.ticker.add(tick);
      window.addEventListener('mousemove', onMove);
      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener('mousemove', onMove);
      };
    } else {
      gsap.to(imgEl, { scale: zoomed ? 1.5 : 1, y: 0, duration: 0.8, ease: 'Out', overwrite: true });
      if (pagRef.current) gsap.to(pagRef.current, { yPercent: 0, duration: 0.8, ease: 'Out' });
      if (closeRef.current) gsap.to(closeRef.current, { xPercent: 0, duration: 0.8, ease: 'Out' });
      if (decorRef.current) gsap.to(decorRef.current, { scale: 1, duration: 0.8, ease: 'Out' });
    }
  }, [zoomed, open]);

  if (!open) return null;

  const slide = INTERIOR_GALLERY[index];
  const total = INTERIOR_GALLERY.length;

  return (
    <div
      className="modal show theme_on-color"
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Lightbox"
    >
      <div className="modal_over-copy" onClick={onClose} />
      <div className="modal_c">
        <div className="modal_lightbox">
          <div ref={decorRef} className="modal_decor pointer-events-none">
            <ChamferFrame />
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="modal_close btn-ico bg-[var(--_global-colors---brand-500--velvet-plum)] text-white"
            aria-label="Close gallery"
          >
            <span className="l1">✕</span>
          </button>

          <div className="modal_lightbox_content">
            <img
              ref={imgRef}
              src={slide.image}
              alt={slide.title}
              onClick={() => setZoomed((z) => !z)}
              className="img modal_lightbox_img rounded-[2px]"
              style={{
                cursor: zoomed ? 'zoom-out' : 'zoom-in',
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          <div ref={pagRef} className="modal_lightbox_pag w-full px-[3rem]">
            <div className="flex items-center justify-between">
              <div className="pointer-events-auto">
                <span className="l1 text-white block">{slide.title}</span>
                <span className="p2 text-white/75 block">{slide.caption}</span>
              </div>

              <div className="pag text-white">
                <button
                  type="button"
                  onClick={() => onChangeIndex((index - 1 + total) % total)}
                  className="pag_prev"
                  aria-label="Previous image"
                >
                  <ArrowLeftSvg />
                  <span className="l1">{String(index + 1).padStart(2, '0')}</span>
                </button>
                <div className="pag_progress">
                  <div
                    className="pag_progress_fill transition-all duration-300"
                    style={{ width: `${((index + 1) / total) * 100}%` }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onChangeIndex((index + 1) % total)}
                  className="pag_next"
                  aria-label="Next image"
                >
                  <span className="l1">{String(total).padStart(2, '0')}</span>
                  <ArrowRightSvg />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
