"use client";

import Image from "next/image";
import { useState } from "react";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
      <div className="relative aspect-[11/6] w-full">
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          sizes="(max-width: 640px) 100vw, 540px"
          className="object-cover"
          priority
        />
        <span className="pointer-events-none absolute top-4 right-4 rounded-full border border-white/45 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
          Post AI
        </span>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 640px) 100vw, 540px"
            className="object-cover"
            priority
          />
          <span className="pointer-events-none absolute top-4 left-4 rounded-full border border-white/45 bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
            Pre AI
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="compare-range-overlay focus-ring"
          aria-label="Before and after comparison slider"
        />

        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `calc(${position}% - 1px)` }}
          aria-hidden="true"
        >
          <div className="h-full w-0.5 bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
          <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/45 text-xs font-bold text-white backdrop-blur">
            ↔
          </div>
        </div>
      </div>
    </div>
  );
}
