import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ChapterLayout from "../shared/ChapterLayout";
import ProductLineup from "./ProductLineup";
import { REVENUE_SEGMENTS, PRODUCT_LINEUPS, formatBillions } from "@lib/apple-data";

export default function MacIPadChapter() {
  const mac = REVENUE_SEGMENTS.find((s) => s.id === "mac")!;
  const ipad = REVENUE_SEGMENTS.find((s) => s.id === "ipad")!;
  const macLineup = PRODUCT_LINEUPS.find((p) => p.segmentId === "mac")!;
  const ipadLineup = PRODUCT_LINEUPS.find((p) => p.segmentId === "ipad")!;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const combined = mac.amount + ipad.amount;

  const narrative = (
    <>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Mac ({formatBillions(mac.amount)}, +{mac.yoyGrowth}%) and iPad ({formatBillions(ipad.amount)}, +{ipad.yoyGrowth}%)
        are the productivity backbone of the ecosystem. Together they're a <strong>{formatBillions(combined)}</strong> business.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed">
        Apple Silicon transformed both lines — the M-series chips mean Macs and iPads
        share the same architecture as iPhones, tightening the ecosystem loop.
      </p>
    </>
  );

  const visualization = (
    <div ref={ref} className="w-full space-y-4">
      <div>
        <div className="flex justify-between text-xs text-[#86868B] mb-1">
          <span>Mac</span>
          <span>{formatBillions(mac.amount)} · +{mac.yoyGrowth}%</span>
        </div>
        <div className="w-full bg-[#eee] rounded-md h-5 overflow-hidden">
          <motion.div className="h-full rounded-md" style={{ backgroundColor: mac.color }}
            initial={{ width: 0 }} animate={inView ? { width: `${(mac.amount / combined) * 100}%` } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs text-[#86868B] mb-1">
          <span>iPad</span>
          <span>{formatBillions(ipad.amount)} · +{ipad.yoyGrowth}%</span>
        </div>
        <div className="w-full bg-[#eee] rounded-md h-5 overflow-hidden">
          <motion.div className="h-full rounded-md" style={{ backgroundColor: ipad.color }}
            initial={{ width: 0 }} animate={inView ? { width: `${(ipad.amount / combined) * 100}%` } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} />
        </div>
      </div>
      <div className="text-center py-2">
        <span className="text-2xl font-extrabold text-[#1D1D1F]">{formatBillions(combined)}</span>
        <span className="text-xs text-[#86868B] ml-2">combined</span>
      </div>
      <ProductLineup segmentName="Mac" products={macLineup.products} accentColor={mac.color} />
      <ProductLineup segmentName="iPad" products={ipadLineup.products} accentColor={ipad.color} />
    </div>
  );

  return (
    <div data-chapter={3}>
      <ChapterLayout chapterNumber={3} chapterLabel="The Productivity Duo"
        title="Mac + iPad — The Productivity Duo" narrative={narrative} visualization={visualization}
        insight={{ label: "Key Insight", text: "Apple Silicon unified the chip architecture across iPhone, iPad, and Mac — one ecosystem, one brain." }} />
    </div>
  );
}
