import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ChapterLayout from "../shared/ChapterLayout";
import { MARGIN_COMPARISON } from "@lib/apple-data";

export default function ProfitStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const narrative = (
    <>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Apple's net income reached <strong>$112B</strong> in FY2025 — up +19.5% YoY, nearly
        triple the rate of revenue growth (+6.4%). That gap is not a coincidence.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Products carry a gross margin of ~36.8%. Services carry 75.4%. Every dollar
        that shifts toward Services adds proportionally more to the bottom line.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed">
        In Q1 FY2026, the mix shift was so powerful it pushed Apple's blended gross
        margin to <strong>48.2%</strong> — an all-time record.
      </p>
    </>
  );

  const visualization = (
    <div ref={ref} className="w-full space-y-5">
      {/* Margin comparison bars */}
      {MARGIN_COMPARISON.map((item, i) => (
        <div key={item.name}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm font-medium text-[#1D1D1F]">{item.name}</span>
            <span
              className="text-sm font-bold"
              style={{ color: item.color === "#86868B" ? "#1D1D1F" : item.color }}
            >
              {item.margin}%
            </span>
          </div>
          <div className="w-full bg-[#EEEEEE] rounded-full h-8 overflow-hidden">
            <motion.div
              className="h-full rounded-full flex items-center px-3"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${item.margin}%` } : {}}
              transition={{ duration: 1.1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-white text-xs font-semibold whitespace-nowrap">
                {item.margin}% gross margin
              </span>
            </motion.div>
          </div>
        </div>
      ))}

      {/* Revenue vs Net Income comparison */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <motion.div
          className="bg-[#F5F5F7] rounded-lg p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-2xl font-extrabold text-[#1D1D1F]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            +6.4%
          </p>
          <p className="text-xs text-[#86868B] mt-1">Revenue Growth</p>
        </motion.div>
        <motion.div
          className="bg-[#F5F5F7] rounded-lg p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <p className="text-2xl font-extrabold text-[#34C759]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            +19.5%
          </p>
          <p className="text-xs text-[#86868B] mt-1">Net Income Growth</p>
        </motion.div>
      </div>

      {/* Q1 badge */}
      <motion.div
        className="flex justify-center mt-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#e8f5e9] text-[#2e7d32]">
          Q1 FY2026: Gross margin expanded to 48.2%
        </span>
      </motion.div>
    </div>
  );

  return (
    <div data-chapter={6}>
      <ChapterLayout
        chapterNumber={6}
        chapterLabel="Why Services Changes Everything"
        title="The Profit Story — Why Services Changes Everything"
        narrative={narrative}
        visualization={visualization}
        insight={{
          label: "Key Insight",
          text: "Revenue grew 6.4%. Net income grew 19.5%. That gap is the Services margin story.",
        }}
      />
    </div>
  );
}
