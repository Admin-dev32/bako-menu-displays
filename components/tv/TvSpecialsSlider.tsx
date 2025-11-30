'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { TvMenuItem } from './TvMenuGrid';

interface TvSpecialsSliderProps {
  // Usamos TvMenuItem y le agregamos opcionalmente imageUrl
  specials: (TvMenuItem & { imageUrl?: string | null })[];
}

const cardVariants = {
  initial: { opacity: 0, x: 30, scale: 0.98 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -30, scale: 0.98 }
};

export default function TvSpecialsSlider({ specials }: TvSpecialsSliderProps) {
  if (!specials || specials.length === 0) {
    return null;
  }

  const [index, setIndex] = useState(0);
  const active = specials[index];

  useEffect(() => {
    if (specials.length <= 1) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % specials.length);
    }, 7000); // cada 7 segundos rota

    return () => clearInterval(id);
  }, [specials.length]);

  return (
    <div className="flex h-full w-full items-stretch">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={active.id}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-black/45 p-4 text-left shadow-xl shadow-black/70 backdrop-blur-md md:p-5"
        >
          {/* Badges superiores */}
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-900 shadow-md shadow-amber-800/60">
              <span>Special</span>
            </div>
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-slate-200/80">
              Rotating every few seconds
            </p>
          </div>

          {/* Imagen grande vertical */}
          <div className="relative mb-4 flex min-h-[160px] flex-1 items-center justify-center md:min-h-[200px] lg:min-h-[230px]">
            <div className="pointer-events-none absolute inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/12 via-amber-400/10 to-transparent blur-2xl" />
            {active.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <motion.img
                src={active.imageUrl}
                alt={active.name}
                className="relative z-10 h-full w-auto max-h-[260px] max-w-full object-contain drop-shadow-[0_26px_55px_rgba(0,0,0,0.9)]"
                initial={{ scale: 0.96, opacity: 0.9 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            ) : (
              <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-slate-900/80 text-2xl font-bold uppercase text-white shadow-inner shadow-black/60">
                {active.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Texto del especial */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold uppercase tracking-[0.18em] text-white md:text-xl">
              {active.name}
            </h3>
            {active.description ? (
              <p className="text-sm text-slate-200/90 md:text-[0.95rem]">
                {active.description}
              </p>
            ) : null}
          </div>

          {/* Precio grande abajo derecha */}
          <motion.div
            className="mt-4 flex items-center justify-between gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="text-[0.7rem] uppercase tracking-[0.26em] text-slate-300/90">
              Today&apos;s Featured Item
            </div>
            <motion.div
              className="rounded-full bg-emerald-500 px-5 py-2 text-base font-extrabold text-slate-900 shadow-lg shadow-emerald-500/50 md:text-lg"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {active.priceText}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
