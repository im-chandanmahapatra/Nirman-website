import React, { useEffect, useState } from 'react';
import { COASTAL_DISTANCE_NODES, NIRMAN_IMAGES } from '../data/nirmanData';

let bougainvilleaCutoutPromise: Promise<string> | null = null;

function getTransparentBougainvilleaUrl(src: string): Promise<string> {
  if (typeof window === 'undefined') return Promise.resolve(src);
  if (bougainvilleaCutoutPromise) return bougainvilleaCutoutPromise;

  bougainvilleaCutoutPromise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const w = Math.min(img.naturalWidth || 900, 900);
        const h = Math.round(((img.naturalHeight || 900) / (img.naturalWidth || 900)) * w);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const frame = ctx.getImageData(0, 0, w, h);
        const d = frame.data;

        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          const isMagenta = r - g > 18 && b - g > 4;
          const isGreen = g > r + 6 && g >= b;

          if (!isMagenta && !isGreen && lum > 168) {
            const lumFactor = Math.max(0, Math.min(1, (226 - lum) / 58));
            const alpha = Math.round(255 * lumFactor * lumFactor);
            d[i + 3] = Math.min(d[i + 3], alpha);
          }
        }
        ctx.putImageData(frame, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } catch {
        resolve(src);
      }
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });

  return bougainvilleaCutoutPromise;
}

export const CornerBougainvillea: React.FC<{
  className?: string;
  transparentCutout?: boolean;
}> = ({ className = '' }) => {
  const [cutoutSrc, setCutoutSrc] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getTransparentBougainvilleaUrl(NIRMAN_IMAGES.bougainvillea).then((url) => {
      if (mounted) setCutoutSrc(url);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      className={`flower pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <img
        src={cutoutSrc || NIRMAN_IMAGES.bougainvillea}
        alt=""
        className="w-full h-full object-contain"
        style={cutoutSrc ? undefined : { mixBlendMode: 'multiply' }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

/* Reference-accurate 8-point double-loop botanical compass rosette */
export const NirmanRosette: React.FC<{ className?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {[45, 135, 225, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 32 32)`}>
          <path d="M32 30 C27 21 25.5 14 32 7 C38.5 14 37 21 32 30 Z" />
          <path d="M32 30 C29.5 22.5 29.5 17 32 12 C34.5 17 34.5 22.5 32 30 Z" />
        </g>
      ))}
      {[0, 90, 180, 270].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 32 32)`}>
          <path d="M32 27 L34.8 18.5 L32 13.5 L29.2 18.5 Z" />
        </g>
      ))}
      <circle cx="32" cy="32" r="2.2" fill="currentColor" stroke="none" />
    </g>
  </svg>
);

export const RotatingSealText: React.FC<{ className?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    <defs>
      <path
        id="nirman-seal-circle"
        d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
      />
    </defs>
    <text
      fill="currentColor"
      fontSize="6.5"
      fontWeight="700"
      letterSpacing="2.8"
      fontFamily="'Maison Neue Extended', Arial, sans-serif"
    >
      <textPath href="#nirman-seal-circle" startOffset="2%">
        NIRMAN   RESIDENCE   •   NIRMAN   RESIDENCE
      </textPath>
    </text>
  </svg>
);

export const VerticalArrowDown: React.FC<{ className?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg viewBox="0 0 48 12" fill="none" className={className} aria-hidden="true">
    <path d="M47 6H1" stroke="currentColor" strokeWidth="1" />
    <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const ArrowLeftSvg: React.FC<{ className?: string }> = ({ className = 'ico-16' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const ArrowRightSvg: React.FC<{ className?: string }> = ({ className = 'ico-16' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const ChevronDownSvg: React.FC<{ className?: string }> = ({ className = 'ico-12' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PinPlusSvg: React.FC<{ className?: string }> = ({ className = 'ico-16' }) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
    <path
      d="M8 2.666C8.368 2.666 8.667 2.966 8.667 3.334V7.333H12.667C13.035 7.333 13.334 7.632 13.334 8C13.334 8.368 13.035 8.667 12.667 8.667H8.667V12.667C8.667 13.035 8.368 13.334 8 13.334C7.632 13.334 7.333 13.035 7.333 12.667V8.667H3.334C2.966 8.667 2.666 8.368 2.666 8C2.666 7.632 2.966 7.333 3.334 7.333H7.333V3.334C7.333 2.966 7.632 2.666 8 2.666Z"
      fill="currentColor"
    />
  </svg>
);

export const PlusMinusSvg: React.FC<{ rotated?: boolean; className?: string }> = ({
  rotated = false,
  className = 'ico-24',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{
      transform: rotated ? 'rotate(-45deg)' : 'rotate(-90deg)',
      transition: 'transform 0.8s cubic-bezier(0.75, 0, 0.25, 1)',
    }}
    aria-hidden="true"
  >
    <path d="M12 4V20" stroke="currentColor" strokeWidth="1.25" />
    <path d="M4 12H20" stroke="currentColor" strokeWidth="1.25" />
  </svg>
);

export const CoastlineMapSvg: React.FC<{ className?: string }> = ({
  className = 'w-full h-auto',
}) => {
  const pathD =
    'M 65 205 C 165 190, 260 175, 315 152 C 350 138, 255 128, 305 118 C 385 104, 515 112, 545 126 C 560 134, 495 142, 535 148 C 605 158, 725 148, 865 138';

  return (
    <svg
      viewBox="0 0 1040 240"
      fill="none"
      className={className}
      role="img"
      aria-label="Konkan Coast travel time map"
    >
      <path d={pathD} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      {COASTAL_DISTANCE_NODES.map((node) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          {node.isPrimary ? (
            <>
              <circle r="3" fill="currentColor" />
              <g transform="translate(-20, -64) scale(0.62)">
                <NirmanRosette />
              </g>
            </>
          ) : (
            <>
              <circle r="3" fill="currentColor" />
              <text
                y={-28}
                textAnchor="middle"
                fill="currentColor"
                fontSize="10.5"
                fontWeight="700"
                letterSpacing="0.06em"
                fontFamily="'Maison Neue Extended', Arial, sans-serif"
              >
                {node.label.toUpperCase()}
              </text>
              <text
                y={-12}
                textAnchor="middle"
                fill="currentColor"
                fillOpacity="0.82"
                fontSize="10.5"
                fontWeight="400"
                letterSpacing="0.04em"
                fontFamily="'Maison Neue Extended', Arial, sans-serif"
              >
                {node.duration.toUpperCase()}
              </text>
            </>
          )}
        </g>
      ))}
    </svg>
  );
};

/* Detailed Mandwa / Alibaug architectural site map SVG for Contact page */
export const ContactSiteMapSvg: React.FC<{ className?: string }> = ({
  className = 'w-full h-auto',
}) => (
  <svg
    viewBox="0 0 1440 720"
    fill="none"
    className={className}
    role="img"
    aria-label="Alibaug & Mandwa coastal architectural site map"
  >
    {/* Arabian Sea curved shoreline silhouette at bottom */}
    <path
      d="M -40 720 L -40 595 C 180 560, 320 535, 455 510 C 620 480, 760 445, 960 418 C 1140 392, 1310 315, 1480 265 L 1480 720 Z"
      fill="rgba(255,255,255,0.22)"
    />
    {/* Subtle secondary bay depth wave */}
    <path
      d="M -40 660 C 210 620, 420 575, 650 540 C 890 505, 1140 440, 1480 355"
      stroke="currentColor"
      strokeOpacity="0.14"
      strokeWidth="1.2"
    />
    {/* Architectural road arteries & roundabout loops */}
    <path
      d="M 330 465 L 485 375 C 520 355, 585 335, 665 322 L 885 280 C 940 270, 995 245, 1085 185 L 1220 90"
      stroke="currentColor"
      strokeOpacity="0.22"
      strokeWidth="2.4"
    />
    <path
      d="M 540 0 C 595 95, 645 140, 730 165 L 920 218 C 1020 245, 1150 285, 1295 340"
      stroke="currentColor"
      strokeOpacity="0.18"
      strokeWidth="2"
    />
    <path
      d="M 390 120 C 445 210, 470 280, 465 380 C 460 435, 440 485, 415 535"
      stroke="currentColor"
      strokeOpacity="0.16"
      strokeWidth="1.5"
    />
    {/* Roundabouts */}
    <circle cx="485" cy="375" r="14" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1.5" />
    <circle cx="945" cy="242" r="16" stroke="currentColor" strokeOpacity="0.24" strokeWidth="1.5" />
    <circle cx="910" cy="182" r="12" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.2" />
    {/* Pavilion Footprint Silhouettes */}
    <g fill="currentColor" fillOpacity="0.14">
      <rect x="650" y="295" width="76" height="34" rx="2" transform="rotate(-11 650 295)" />
      <rect x="742" y="278" width="68" height="32" rx="2" transform="rotate(-11 742 278)" />
      <rect x="822" y="264" width="72" height="30" rx="2" transform="rotate(-11 822 264)" />
      <rect x="520" y="340" width="90" height="44" rx="2" transform="rotate(-10 520 340)" />
      <rect x="440" y="425" width="78" height="58" rx="2" transform="rotate(-14 440 425)" />
    </g>
    {/* Coastal Landmark Callouts */}
    {[
      { x: 472, y: 492, label: 'MANDWA\nPOINT' },
      { x: 642, y: 368, label: 'CORAL\nCREEK' },
      { x: 765, y: 120, label: 'PALM\nESTATE' },
      { x: 968, y: 332, label: 'KIHIM\nBEACH' },
    ].map((pt) => (
      <g key={pt.label} transform={`translate(${pt.x}, ${pt.y})`}>
        <circle r="3" fill="currentColor" fillOpacity="0.65" />
        <text
          x="8"
          y="-2"
          fill="currentColor"
          fillOpacity="0.72"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.08em"
          fontFamily="'Maison Neue Extended', Arial, sans-serif"
        >
          {pt.label.split('\n').map((line, i) => (
            <tspan key={line} x="8" dy={i === 0 ? '0' : '11'}>
              {line}
            </tspan>
          ))}
        </text>
      </g>
    ))}
  </svg>
);

export const ArchitecturalFloorplanSvg: React.FC<{
  variant: 'garden-deck' | 'garden' | 'penthouse';
}> = ({ variant }) => {
  return (
    <svg viewBox="0 0 280 220" fill="none" className="w-full h-full" aria-hidden="true">
      {/* Crisp multi-room architectural CAD plan inspired by ERA's watercolor/line floorplan plates */}
      {variant === 'garden-deck' && (
        <>
          <polygon points="22,64 78,48 78,170 22,158" fill="#B5B4A8" fillOpacity="0.45" />
          <rect x="78" y="44" width="54" height="128" fill="#D9C5B4" fillOpacity="0.6" />
          <rect x="132" y="40" width="124" height="136" fill="#E8E7DE" stroke="currentColor" strokeWidth="1.2" />
          <line x1="194" y1="40" x2="194" y2="112" stroke="currentColor" strokeWidth="1.1" />
          <line x1="132" y1="112" x2="256" y2="112" stroke="currentColor" strokeWidth="1.1" />
          <rect x="148" y="54" width="32" height="22" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <rect x="206" y="54" width="36" height="40" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <rect x="150" y="128" width="44" height="28" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <circle cx="226" cy="144" r="14" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <line x1="78" y1="44" x2="132" y2="44" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 2" />
          <line x1="78" y1="172" x2="132" y2="172" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 2" />
        </>
      )}
      {variant === 'garden' && (
        <>
          <rect x="28" y="50" width="56" height="120" fill="#D9C5B4" fillOpacity="0.6" stroke="currentColor" strokeOpacity="0.25" />
          <rect x="84" y="44" width="166" height="132" fill="#E8E7DE" stroke="currentColor" strokeWidth="1.2" />
          <line x1="142" y1="44" x2="142" y2="176" stroke="currentColor" strokeWidth="1.1" />
          <line x1="142" y1="106" x2="250" y2="106" stroke="currentColor" strokeWidth="1.1" />
          <line x1="198" y1="106" x2="198" y2="176" stroke="currentColor" strokeWidth="1.1" />
          <rect x="98" y="64" width="28" height="44" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <rect x="160" y="58" width="72" height="32" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <rect x="156" y="120" width="28" height="40" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <rect x="210" y="120" width="28" height="40" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
        </>
      )}
      {variant === 'penthouse' && (
        <>
          <rect x="30" y="34" width="220" height="86" fill="#E8E7DE" stroke="currentColor" strokeWidth="1.2" />
          <rect x="30" y="132" width="220" height="58" fill="#D9C5B4" fillOpacity="0.55" stroke="currentColor" strokeWidth="1.1" />
          <line x1="112" y1="34" x2="112" y2="120" stroke="currentColor" strokeWidth="1.1" />
          <line x1="184" y1="34" x2="184" y2="120" stroke="currentColor" strokeWidth="1.1" />
          <rect x="46" y="50" width="50" height="32" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <rect x="126" y="50" width="44" height="52" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.9" />
          <line x1="54" y1="160" x2="224" y2="160" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="5 4" strokeWidth="1.2" />
          <circle cx="140" cy="160" r="12" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.9" />
        </>
      )}
    </svg>
  );
};
