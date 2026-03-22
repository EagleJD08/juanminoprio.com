import { motion } from "framer-motion";
import ChapterLayout from "./ChapterLayout";

const item = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

function ScaleViz() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col items-center gap-2 w-full"
    >
      <motion.div custom={0} variants={item} className="text-center">
        <p className="font-heading text-4xl md:text-5xl font-bold text-slate-navy">
          $11.9T
        </p>
        <p className="text-xs text-charcoal mt-1">Total Client Assets</p>
      </motion.div>

      <motion.div
        custom={1}
        variants={item}
        className="text-2xl text-mushroom font-light"
      >
        &times;
      </motion.div>

      <motion.div custom={1} variants={item} className="text-center">
        <p className="font-heading text-3xl md:text-4xl font-bold text-cocoa">
          ~0.05%
        </p>
        <p className="text-xs text-charcoal mt-1">Average Fee Rate</p>
      </motion.div>

      <motion.div
        custom={2}
        variants={item}
        className="w-16 h-px bg-mushroom my-2"
      />

      <motion.div custom={2} variants={item} className="text-center">
        <p className="font-heading text-4xl md:text-5xl font-bold text-rich-black">
          $6.5B
        </p>
        <p className="text-xs text-charcoal mt-1">Asset Management Revenue</p>
      </motion.div>

      <motion.div
        custom={3}
        variants={item}
        className="mt-4 bg-linen rounded-md px-4 py-2 text-center"
      >
        <p className="text-[11px] text-charcoal">
          <span className="font-semibold text-cocoa">+14% YoY</span> — driven
          by market growth and fund inflows
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function AssetManagement() {
  return (
    <div data-chapter={3}>
      <ChapterLayout
        chapterNumber={3}
        chapterLabel="The Fee Machine"
        title="Asset Management: $6.5 Billion"
        narrative={
          <>
            <p>
              When you manage <strong>$11.9 trillion</strong> in client assets,
              even tiny fees generate enormous revenue.
            </p>
            <p>
              Schwab earns from proprietary money market funds, mutual funds,
              ETFs, and fee-based advisory services. The rates are low — often
              fractions of a percent — but the scale makes them wildly
              profitable.
            </p>
            <p>
              As markets rise and clients add new money, these fees compound
              automatically. No extra work required.
            </p>
          </>
        }
        visualization={<ScaleViz />}
        insight={{
          label: "Key Insight",
          text: "Scale turns tiny fees into billions. A 0.05% fee on $11.9 trillion generates $6.5B in revenue — and it grows automatically as assets grow.",
        }}
      />
    </div>
  );
}
