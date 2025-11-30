'use client';

import { motion } from 'framer-motion';

export interface TvMenuItem {
  id: string;
  name: string;
  description: string | null;
  priceText: string;
  // URL de la imagen PNG del platillo (mapear desde image_url en Supabase)
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
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.4 } }
};

export default function TvMenuGrid({ items }: TvMenuGridProps) {
  if (!items?.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-inner shadow-black/60 ring-1 ring-white/10 md:p-8">
      {/* Fondo con tu imagen */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('https://mvtmzeigyjvexppekyti.supabase.co/storage/v1/object/public/menu-images/Artboard%201-100.jpg')] bg-cover bg-center opacity-40" />
      {/* Overlay oscuro para que el texto se lea bien */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/35 to-black/55" />

      <div className="relative mb-6 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary">
            Chalkboard Classics
          </p>
          <h3 className="font-heading text-3xl md:text-4xl">Menu</h3>
        </div>
        <p className="rounded-full bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-slate-100 shadow-md shadow-black/40 backdrop-blur">
          All prices in USD
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="relative flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-black/35 px-4 pt-4 pb-5 text-center shadow-lg shadow-black/60 backdrop-blur-md"
          >
            {/* Precio con animación de zoom in/out */}
            <motion.div
              className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/40"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.08
              }}
            >
              {item.priceText}
            </motion.div>

            {/* Imagen PNG levitando */}
            <motion.div
              className="flex h-32 w-full items-center justify-center md:h-40"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatType: 'mirror',
                delay: index * 0.12
              }}
            >
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-auto max-w-[80%] object-contain drop-shadow-[0_18px_38px_rgba(0,0,0,0.9)]"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-xl font-bold uppercase text-white shadow-inner shadow-black/50">
                  {item.name.charAt(0)}
                </div>
              )}
            </motion.div>

            <div className="space-y-1">
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white md:text-base">
                {item.name}
              </h4>
              {item.description ? (
                <p className="text-xs text-slate-200/90 md:text-sm">{item.description}</p>
              ) : null}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
