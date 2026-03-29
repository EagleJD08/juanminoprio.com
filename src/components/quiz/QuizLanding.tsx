import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface QuizLandingProps {
  onStart: () => void;
}

export default function QuizLanding({ onStart }: QuizLandingProps) {
  const [totalCompletions, setTotalCompletions] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/quiz-result")
      .then((r) => r.json())
      .then((data) => {
        if (data.totalCompletions != null) {
          setTotalCompletions(data.totalCompletions);
        }
      })
      .catch(() => {
        // Silently fail — social proof is non-critical
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center max-w-2xl mx-auto px-4"
    >
      <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-soft-plum/10 text-soft-plum rounded-full mb-6">
        Free Marketing Quiz
      </span>

      <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
        What Kind of Marketer{" "}
        <span className="font-accent italic text-terracotta">Are You?</span>
      </h1>

      <p className="text-slate text-lg mb-8 max-w-lg">
        Discover your marketing archetype across 10 dimensions. Get personalized
        resources to sharpen your strengths and close your gaps.
      </p>

      <div className="flex items-center gap-4 text-sm text-slate/70 mb-8">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          2 min
        </span>
        <span className="w-1 h-1 rounded-full bg-slate/30" />
        <span>10 questions</span>
        <span className="w-1 h-1 rounded-full bg-slate/30" />
        <span>No signup needed</span>
      </div>

      <button
        onClick={onStart}
        className="group relative px-8 py-4 bg-navy text-cream font-heading font-semibold text-lg rounded-xl hover:bg-navy/90 transition-all duration-200 hover:shadow-lg hover:shadow-navy/20 cursor-pointer"
      >
        Discover Your Type
        <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">
          &rarr;
        </span>
      </button>

      {totalCompletions !== null && totalCompletions > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-slate/60"
        >
          {totalCompletions.toLocaleString()} marketer{totalCompletions === 1 ? "" : "s"} have discovered their type
        </motion.p>
      )}
    </motion.div>
  );
}
