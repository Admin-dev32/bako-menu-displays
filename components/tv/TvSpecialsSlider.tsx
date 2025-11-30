'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export interface TvSpecial {
  id: string;
  name: string;
  description: string | null;
  priceText: string;
  imageUrl: string | null;
  badge?: string;
}

interface TvSpecialsSliderProps {
  specials: TvSpecial[];
}

export default function TvSpecialsSlider({ specials }: TvSpecialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useMemo(() => specials ?? [], [specials]);
  const currentSpecial = slides[currentIndex % slides.length];

  useEffect(() => {
    if (!slides.length) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length || !currentSpecial) return null;

  return (
    <div className="relative w-full">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white shadow-lg shadow-black/40">
          ★
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-primary">Today&apos;s Special</p>
          <p className="text-base text-slate-200">Chef&apos;s highlights rotating every few minutes</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220]/80 shadow-2xl shadow-black/50 backdrop-blur-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSpecial.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid w-full grid-cols-1 overflow-hidden md:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="flex flex-col justify-center gap-4 px-6 py-8 lg:px-10">
              {currentSpecial.badge ? (
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-primary/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary">
                  {currentSpecial.badge}
                </span>
              ) : null}
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.25em] text-brand-accent">Special</p>
                <h2 className="font-heading text-4xl leading-tight text-white lg:text-5xl">{currentSpecial.name}</h2>
                <p className="text-lg text-slate-200 lg:text-xl">{currentSpecial.description}</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="inline-flex h-2 w-2 rounded-full bg-brand-accent" />
                Freshly prepared · Limited availability
              </div>
            </div>

            <div className="relative min-h-[260px] bg-gradient-to-br from-black/60 via-black/50 to-black/60">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: currentSpecial.imageUrl
                    ? `linear-gradient(180deg,rgba(5,8,22,0.6),rgba(5,8,22,0.85)), url(${currentSpecial.imageUrl})`
                    : 'linear-gradient(180deg,rgba(5,8,22,0.6),rgba(5,8,22,0.85))',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(249,115,22,0.35),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(34,197,94,0.35),transparent_45%)] mix-blend-screen" />
              <div className="relative flex h-full items-center justify-center p-6">
                <div className="flex flex-col items-center gap-3 rounded-2xl bg-black/50 px-6 py-4 shadow-[0_18px_48px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/80">Only</p>
                  <p className="rounded-full bg-emerald-500 px-5 py-2 text-3xl font-black text-slate-900 shadow-lg shadow-emerald-500/50">
                    {currentSpecial.priceText}
                  </p>
                  <p className="text-xs text-slate-200">+ tax</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
