import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ChapterLayout from "../shared/ChapterLayout";
import ProductLineup from "./ProductLineup";
import { useCountUp } from "@lib/hooks";
import { REVENUE_SEGMENTS, PRODUCT_LINEUPS } from "@lib/apple-data";

export default function IPhoneChapter() {
  const segment = REVENUE_SEGMENTS.find((s) => s.id === "iphone")!;
  const lineup = PRODUCT_LINEUPS.find((p) => p.segmentId === "iphone")!;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(segment.amount * 10, 1800, inView);

  const narrative = (
    <>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        The iPhone is half the company. But it's not just a phone — it's the front door
        to a $109B Services business. Every iPhone sold is a subscription waiting to happen:
        iCloud, Apple Music, AppleCare, App Store purchases.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed">
        The iPhone 16 cycle drove a massive <strong>+23% surge</strong> in Q1 FY2026,
        setting all-time revenue records in every geographic segment.
      </p>
    </>
  );

  const visualization = (
    <div ref={ref} className="w-full">
      <div className="text-center mb-4">
        <span className="text-4xl md:text-5xl font-extrabold text-[#1D1D1F]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          ${(count / 10).toFixed(1)}B
        </span>
        <p className="text-xs text-[#86868B] mt-1">{segment.percentOfTotal}% of total revenue</p>
      </div>
      <div className="w-full bg-[#eee] rounded-md h-6 overflow-hidden mb-3">
        <motion.div
          className="h-full rounded-md"
          style={{ backgroundColor: segment.color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${segment.percentOfTotal}%` } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#e8f5e9] text-[#2e7d32]">
          Q1 FY2026: +23% YoY surge — iPhone 16 cycle
        </span>
      </div>
      <ProductLineup segmentName="iPhone" products={lineup.products} accentColor={segment.color} />
    </div>
  );

  return (
    <div data-chapter={2}>
      <ChapterLayout
        chapterNumber={2}
        chapterLabel="The Cash Engine"
        title="iPhone — The Cash Engine"
        narrative={narrative}
        visualization={visualization}
        insight={{
          label: "Key Insight",
          text: "The iPhone isn't just a product — it's the front door to a $109B Services business.",
        }}
      />
    </div>
  );
}
