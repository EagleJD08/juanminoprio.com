import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ChapterLayout from "../shared/ChapterLayout";
import ProductLineup from "./ProductLineup";
import { REVENUE_SEGMENTS, PRODUCT_LINEUPS, formatBillions } from "@lib/apple-data";

export default function WearablesChapter() {
  const segment = REVENUE_SEGMENTS.find((s) => s.id === "wearables")!;
  const lineup = PRODUCT_LINEUPS.find((p) => p.segmentId === "wearables")!;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const narrative = (
    <>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Watch, AirPods, HomePod, and Vision Pro — the products that bind the ecosystem together.
        They don't sell in iPhone volumes, but they create switching costs. Once you have an
        Apple Watch on your wrist and AirPods in your ears, leaving means replacing everything.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed">
        The only declining segment at <strong>{segment.yoyGrowth}% YoY</strong>, but
        that understates their strategic value as ecosystem glue.
      </p>
    </>
  );

  const visualization = (
    <div ref={ref} className="w-full">
      <div className="text-center mb-4">
        <span className="text-4xl font-extrabold text-[#1D1D1F]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {formatBillions(segment.amount)}
        </span>
        <p className="text-xs text-[#86868B] mt-1">{segment.percentOfTotal}% of total revenue</p>
      </div>
      <div className="w-full bg-[#eee] rounded-md h-6 overflow-hidden mb-3">
        <motion.div className="h-full rounded-md" style={{ backgroundColor: segment.color }}
          initial={{ width: 0 }} animate={inView ? { width: `${segment.percentOfTotal * 3}%` } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
      </div>
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#fce4ec] text-[#c62828]">
          {segment.yoyGrowth}% YoY — only declining segment
        </span>
      </div>
      <ProductLineup segmentName="Wearables" products={lineup.products} accentColor={segment.color} />
    </div>
  );

  return (
    <div data-chapter={4}>
      <ChapterLayout chapterNumber={4} chapterLabel="The Ecosystem Glue"
        title="Wearables & Home — The Ecosystem Glue" narrative={narrative} visualization={visualization}
        insight={{ label: "Key Insight", text: "These products don't drive revenue — they drive retention. And retention drives Services." }} />
    </div>
  );
}
