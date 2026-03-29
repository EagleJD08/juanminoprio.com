import { motion } from "framer-motion";

export default function QuizAnalyzing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center px-4"
    >
      {/* Animated dots */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-terracotta"
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <h2 className="font-heading text-2xl font-bold text-navy mb-3">
        Analyzing your marketing DNA
      </h2>

      <motion.p
        className="text-slate/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Mapping your strengths across 10 dimensions...
      </motion.p>
    </motion.div>
  );
}
