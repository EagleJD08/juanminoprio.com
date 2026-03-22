import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface ChapterLayoutProps {
  chapterNumber: number;
  chapterLabel: string;
  title: string;
  narrative: ReactNode;
  visualization: ReactNode;
  insight?: { label: string; text: string };
  id?: string;
}

export default function ChapterLayout({
  chapterNumber,
  chapterLabel,
  title,
  narrative,
  visualization,
  insight,
  id,
}: ChapterLayoutProps) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      <div className="bg-snow rounded-lg border border-mushroom overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
          {/* Narrative side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-mist"
          >
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-slate-navy mb-3">
              Chapter {String(chapterNumber).padStart(2, "0")} — {chapterLabel}
            </p>
            <h2 className="font-heading text-xl sm:text-2xl md:text-[1.65rem] font-bold text-rich-black leading-snug mb-5">
              {title}
            </h2>
            <div className="text-sm md:text-[0.925rem] text-charcoal leading-relaxed space-y-3">
              {narrative}
            </div>
            {insight && (
              <div className="mt-6 bg-mist rounded-md p-4 border-l-3 border-slate-navy">
                <p className="text-xs font-semibold text-slate-navy uppercase tracking-wide mb-1">{insight.label}</p>
                <p className="text-sm text-charcoal leading-relaxed">{insight.text}</p>
              </div>
            )}
          </motion.div>

          {/* Visualization side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 md:p-10 flex flex-col justify-center items-center bg-snow"
          >
            {visualization}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
