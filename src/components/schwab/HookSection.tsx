import { useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@lib/hooks";

export default function HookSection() {
  const [inView, setInView] = useState(true);
  const count = useCountUp(239, 2000, inView);
  const displayValue = `$${(count / 10).toFixed(1)}B`;

  return (
    <section
      data-chapter={0}
      className="min-h-screen bg-rich-black flex flex-col items-center justify-center px-6 text-center relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-mushroom mb-8">
          The Charles Schwab Corporation
        </p>
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 leading-snug max-w-xl mx-auto mb-10">
          Ever wondered how one of the biggest financial companies in the world
          makes money?
        </h1>
        <p className="font-heading text-6xl sm:text-7xl md:text-8xl font-bold text-slate-navy leading-none">
          {displayValue}
        </p>
        <p className="text-xs tracking-[0.15em] uppercase text-mushroom mt-3">
          Total Revenue · 2025
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8"
      >
        <p className="text-xs text-charcoal mb-2">Scroll to find out</p>
        <svg
          className="w-5 h-5 mx-auto text-mushroom animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}
