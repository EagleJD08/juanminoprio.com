import { useState } from "react";
import { motion } from "framer-motion";
import ChapterLayout from "./ChapterLayout";
import { useCountUp } from "@lib/hooks";
import { DAILY_AVG_TRADES } from "@lib/schwab-data";

const cardVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.8 + i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const SOURCES = [
  {
    label: "Options & Futures",
    value: "$2.1B",
    description: "Per-contract fees on derivatives",
    color: "#2C4A6E",
  },
  {
    label: "Payment for Order Flow",
    value: "$1.1B",
    description: "Market makers pay for trade routing",
    color: "#6B4226",
  },
  {
    label: "Other Trading",
    value: "$0.7B",
    description: "Principal transactions & misc.",
    color: "#4A4A4A",
  },
];

function TradingDeskViz() {
  const [inView, setInView] = useState(false);
  const count = useCountUp(83, 1600, inView);
  const displayValue = (count / 10).toFixed(1);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={() => setInView(true)}
      className="flex flex-col items-center gap-4 w-full"
    >
      {/* Big animated counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center relative"
      >
        {/* Pulsing live indicator */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-medium tracking-widest uppercase text-emerald-600">
            Daily Volume
          </span>
        </div>

        <p className="font-heading text-5xl md:text-6xl font-bold text-charcoal tabular-nums">
          {displayValue}M
        </p>
        <p className="text-xs text-charcoal mt-1">average trades per day</p>
      </motion.div>

      {/* Revenue breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full h-px bg-mushroom my-1"
      />

      <div className="grid grid-cols-1 gap-2.5 w-full">
        {SOURCES.map((s, i) => (
          <motion.div
            key={s.label}
            custom={i}
            variants={cardVariant}
            className="bg-white border border-mushroom rounded-lg px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-8 rounded-full flex-shrink-0"
                style={{ background: s.color }}
              />
              <div>
                <p className="font-heading font-semibold text-sm text-rich-black">
                  {s.label}
                </p>
                <p className="text-[11px] text-charcoal">{s.description}</p>
              </div>
            </div>
            <p className="font-heading font-bold text-sm text-rich-black flex-shrink-0 ml-3">
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Total */}
      <motion.div
        custom={3}
        variants={cardVariant}
        className="bg-linen rounded-md px-4 py-2 text-center w-full"
      >
        <p className="text-[11px] text-charcoal">
          <span className="font-semibold text-charcoal">$3.9B total</span>
          {" · "}
          <span className="font-semibold text-emerald-600">+20% YoY</span>
          {" — "}zero commissions, maximum volume
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function TradingRevenue() {
  return (
    <div data-chapter={4}>
      <ChapterLayout
        chapterNumber={4}
        chapterLabel="The Volume Play"
        title="Trading Revenue: $3.9 Billion"
        narrative={
          <>
            <p>
              Zero commissions killed the old brokerage model. But Schwab turned
              free trades into a <strong>volume machine</strong>.
            </p>
            <p>
              With <strong>{DAILY_AVG_TRADES}M trades per day</strong>, Schwab
              generates revenue through options and futures contracts (where they
              still charge per-contract fees), payment for order flow from market
              makers, and principal trading.
            </p>
            <p>
              The strategy: make trading free, attract massive volume, and
              monetize the activity in ways most retail investors never notice.
            </p>
          </>
        }
        visualization={<TradingDeskViz />}
        insight={{
          label: "Key Insight",
          text: "Zero commission \u2260 zero revenue. Volume replaced margin. Free trades attract 46.5M accounts — and every trade still generates money.",
        }}
      />
    </div>
  );
}
