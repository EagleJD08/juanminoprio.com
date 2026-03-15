import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatCurrency } from "@lib/utils";
import { NATIONAL_AVERAGE } from "@lib/spending-data";

export default function Hero() {
  const target = NATIONAL_AVERAGE.totalExpenditure;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <section className="px-6 pt-16 pb-8 md:pt-28 md:pb-12 text-center max-w-4xl mx-auto min-h-[70vh] md:min-h-[80vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-charcoal mb-6">
          Bureau of Labor Statistics, 2023 Consumer Expenditure Survey
        </p>
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-rich-black leading-tight">
          {formatCurrency(count)}
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-rich-black/80 font-body max-w-2xl mx-auto">
          That's the number buried in a 200-page government report nobody reads.
        </p>
        <p className="mt-3 text-base md:text-xl font-accent italic text-cocoa">
          So I made it worth reading.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-10"
      >
        <a href="#breakdown" className="inline-block">
          <svg
            className="w-6 h-6 mx-auto text-mushroom animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
