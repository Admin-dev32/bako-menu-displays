'use client';

import { motion } from 'framer-motion';

export default function TvBackgroundDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(34,197,94,0.08),transparent_35%)]" />
      <motion.div
        className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -30, 50, 0],
          opacity: [0.35, 0.55, 0.45, 0.35]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-emerald-500/10 blur-3xl"
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 40, -30, 0],
          opacity: [0.3, 0.5, 0.4, 0.3]
        }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.6)_0%,rgba(2,6,23,0.2)_50%,rgba(2,6,23,0.6)_100%)]" />
    </div>
  );
}
