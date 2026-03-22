import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { text: "Analyzing your topic...", delay: 0 },
  { text: "Selecting the best hook formula...", delay: 1000 },
  { text: "Crafting your post...", delay: 2000 },
  { text: "Scoring shareability...", delay: 3000 },
];

export default function LoadingAnimation() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((step, index) => {
      const timeout = setTimeout(() => {
        setVisibleSteps((prev) => [...prev, index]);
      }, step.delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center py-16">
      {/* Pulsing dot */}
      <div className="mb-8">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-3 h-3 rounded-full bg-terracotta"
        />
      </div>

      {/* Steps */}
      <div className="space-y-3 text-center">
        <AnimatePresence>
          {visibleSteps.map((stepIndex) => (
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`text-sm font-body ${
                stepIndex === visibleSteps[visibleSteps.length - 1]
                  ? "text-navy font-medium"
                  : "text-sand"
              }`}
            >
              {STEPS[stepIndex].text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
