import { useRef, useState, useCallback } from "react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
}

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  alt,
}: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [percent, setPercent] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPercent(Math.round((x / rect.width) * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if ((e.target as Element).hasPointerCapture?.(e.pointerId)) {
      updateFromClientX(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-64 w-full select-none overflow-hidden rounded-xl border border-border/60 bg-card"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      role="region"
      aria-label={alt ?? "Önce ve sonra karşılaştırma"}
    >
      <img
        src={afterSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${percent}%` }}
      >
        <img src={beforeSrc} alt={alt} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${percent}%` }}>
        <div className="h-full w-0.5 -translate-x-1/2 bg-white/70" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1 text-black shadow">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
      <input
        aria-label="Karşılaştırma kaydırıcı"
        type="range"
        min={0}
        max={100}
        value={percent}
        onChange={(e) => setPercent(parseInt(e.target.value))}
        className="pointer-events-auto absolute bottom-3 left-1/2 w-[60%] -translate-x-1/2"
      />
    </div>
  );
}
