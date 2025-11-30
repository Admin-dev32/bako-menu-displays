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
    <div className="relative flex w-full overflow-hidden rounded-3xl border border-white/5 bg-slate-900/60 shadow-2xl ring-1 ring-white/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSpecial.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid w-full grid-cols-1 md:grid-cols-5"
        >
          <div
            className="relative col-span-2 min-h-[280px] md:min-h-[360px]"
            style={{
              backgroundImage: `linear-gradient(180deg,rgba(2,6,23,0.55),rgba(2,6,23,0.8)), url(${currentSpecial.imageUrl ?? ''})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/30 via-transparent to-brand-accent/25 mix-blend-screen" />
          </div>

          <div className="col-span-3 flex flex-col justify-center gap-4 px-8 py-10 md:px-12">
            {currentSpecial.badge ? (
              <span className="w-fit rounded-full bg-brand-primary/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary">
                {currentSpecial.badge}
              </span>
            ) : null}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-heading text-4xl leading-tight md:text-5xl">{currentSpecial.name}</h2>
                <p className="mt-2 text-xl text-slate-200 md:text-2xl">{currentSpecial.description}</p>
              </div>
              <p className="text-4xl font-black text-brand-accent md:text-5xl">{currentSpecial.priceText}</p>
            </div>
            <p className="text-lg text-slate-300 md:text-xl">Serving time · 10 mins · Freshly made</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
