import { motion } from "framer-motion";

interface NarrativeTransitionProps {
  line1: string;
  line2: string;
  accentColor?: string;
  accentClass?: string;
}

export default function NarrativeTransition({
  line1,
  line2,
  accentColor = "#6B4226",
  accentClass = "text-cocoa",
}: NarrativeTransitionProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 md:py-14">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="border-l-4 pl-6 md:pl-8"
        style={{ borderColor: accentColor }}
      >
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-rich-black leading-snug">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            {line1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`block ${accentClass}`}
          >
            {line2}
          </motion.span>
        </h2>
      </motion.div>
    </div>
  );
}
