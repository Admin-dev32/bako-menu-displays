'use client';

import { motion } from 'framer-motion';

export interface TvMenuItem {
  id: string;
  name: string;
  description: string | null;
  priceText: string;
  imageUrl?: string | null;
}

interface TvMenuGridProps {
  items: TvMenuItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.4 } },
};

export default function TvMenuGrid({ items }: TvMenuGridProps) {
  if (!items?.length) return null;

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* Título simple, sin panel */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary">
            Chalkboard Classics
          </p>
          <h3 className="font-heading text-2xl md:text-3xl">Menu</h3>
        </div>
        <p className="rounded-full bg-black/40 px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-100">
          All prices in USD
        </p>
      </div>

      {/* GRID sin ningún fondo, solo celdas */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid h-full w-full grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="relative flex flex-col items-center gap-2 text-center"
          >
            {/* Contenedor de la imagen con levitación */}
            <motion.div
              className="relative mb-1 h-28 w-28 overflow-visible md:h-36 md:w-36"
            >
              <motion.div
                className="h-full w-full overflow-hidden rounded-3xl shadow-xl shadow-black/60"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-black/60 text-2xl font-bold">
                    {item.name.charAt(0)}
                  </div>
                )}
              </motion.div>

              {/* Precio con zoom in / out */}
              <motion.div
                className="absolute right-1 top-1 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg shadow-emerald-500/40 md:right-2 md:top-2 md:text-sm"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.2,
                }}
              >
                {item.priceText}
              </motion.div>
            </motion.div>

            {/* Nombre + descripción, sin tarjetas ni fondos */}
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-white md:text-sm">
              {item.name}
            </h4>
            {item.description ? (
              <p className="max-w-[220px] text-[11px] text-slate-100/90 md:text-xs">
                {item.description}
              </p>
            ) : null}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
