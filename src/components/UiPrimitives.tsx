import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { calculateArcDash } from '../utils/residences';
import { ensureGsapRegistered, prefersReducedMotion } from '../utils/motion';

export const ChamferFrame: React.FC<{ small?: boolean; className?: string }> = ({
  small = false,
  className = '',
}) => {
  const corner = small ? 'w-[1rem] h-[1rem]' : 'w-[1.5rem] h-[1.5rem]';
  return (
    <div className={`card_decor ${className}`} aria-hidden="true">
      <div className="frame_t-lr" />
      <div className="frame_b-lr" />
      <div className="frame_l-tb" />
      <div className="frame_r-tb" />
      <svg viewBox="0 0 24 24" className={`absolute top-0 left-0 ${corner}`} fill="none">
        <path d="M0 24L24 0" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
      </svg>
      <svg viewBox="0 0 24 24" className={`absolute top-0 right-0 ${corner}`} fill="none">
        <path d="M0 0L24 24" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
      </svg>
      <svg viewBox="0 0 24 24" className={`absolute bottom-0 left-0 ${corner}`} fill="none">
        <path d="M0 0L24 24" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
      </svg>
      <svg viewBox="0 0 24 24" className={`absolute bottom-0 right-0 ${corner}`} fill="none">
        <path d="M24 0L0 24" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
      </svg>
    </div>
  );
};

interface CircleButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export const CircleButton: React.FC<CircleButtonProps> = ({ label, onClick, className = '' }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { dasharray, circumference } = calculateArcDash(103.5, false);

  useEffect(() => {
    if (prefersReducedMotion() || window.innerWidth < 992) return;
    ensureGsapRegistered();
    const btn = btnRef.current;
    const inner = innerRef.current;
    if (!btn || !inner) return;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      const strength = 25;
      gsap.to(btn, {
        x: `${nx * (strength / 16)}em`,
        y: `${ny * (strength / 16)}em`,
        duration: 1.6,
        ease: 'power4.out',
        force3D: true,
        overwrite: 'auto',
      });
      gsap.to(inner, {
        x: `${nx * (strength / 16) * 0.65}em`,
        y: `${ny * (strength / 16) * 0.65}em`,
        duration: 2,
        ease: 'power4.out',
        force3D: true,
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 1.6,
        ease: 'elastic.out(1, 0.3)',
        force3D: true,
        clearProps: 'transform',
      });
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 1.6,
        ease: 'elastic.out(1, 0.3)',
        force3D: true,
        clearProps: 'transform',
      });
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    return () => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={onClick}
      className={`btn-circle group ${className}`}
      hover-btn-circle=""
    >
      <div className="btn-circle_bg" aria-hidden="true">
        <svg viewBox="0 0 212 212" fill="none" className="w-full h-full">
          <circle
            cx="106"
            cy="106"
            r="103.5"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <circle
            cx="106"
            cy="106"
            r="103.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray={dasharray}
            strokeDashoffset={0}
            className="btn-circle_svg-arc"
            transform="rotate(-90 106 106)"
          />
          <circle
            cx="106"
            cy="106"
            r="103.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray={dasharray}
            strokeDashoffset={-circumference / 2}
            className="btn-circle_svg-arc"
            transform="rotate(-90 106 106)"
          />
        </svg>
      </div>
      <div ref={innerRef} className="btn-circle_label nav-item">
        <span className="nav-item_label block">
          <span className="nav-item_label_text l1 block text-center whitespace-pre-line">
            {label}
          </span>
          <span className="nav-item_label_text is-2 l1 block text-center whitespace-pre-line w-full">
            {label}
          </span>
        </span>
      </div>
    </button>
  );
};

interface PillButtonProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export const PillButton: React.FC<PillButtonProps> = ({
  label,
  onClick,
  active = false,
  className = '',
  type = 'button',
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`btn ${active ? 'is-active' : ''} ${className}`}
  >
    <span className="btn_bg" aria-hidden="true">
      <span className="btn_bg_fill" />
    </span>
    <span className="btn_label">
      <span className="btn_label_text l1">{label}</span>
      <span className="btn_label_text is-2 l1">{label}</span>
    </span>
  </button>
);

interface DualLinkProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  textClassName?: string;
}

export const DualLink: React.FC<DualLinkProps> = ({
  label,
  onClick,
  href,
  className = '',
  textClassName = 'l1',
}) => {
  const content = (
    <>
      <span className="link_label">
        <span className={`link_label_text ${textClassName}`}>{label}</span>
        <span className={`link_label_text is-2 ${textClassName}`}>{label}</span>
      </span>
      <span className="link_line" aria-hidden="true" />
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={`link ${className}`}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`link ${className}`}>
      {content}
    </button>
  );
};

export const NavHoverItem: React.FC<{
  label: string;
  onClick?: () => void;
  textClassName?: string;
  className?: string;
  active?: boolean;
}> = ({ label, onClick, textClassName = 'l1', className = '', active = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`nav-item ${active ? 'is-active' : ''} ${className}`}
    hover-nav-item=""
  >
    <span className="nav-item_label">
      <span className={`nav-item_label_text ${textClassName}`}>{label}</span>
      <span className={`nav-item_label_text is-2 ${textClassName}`}>{label}</span>
    </span>
  </button>
);
