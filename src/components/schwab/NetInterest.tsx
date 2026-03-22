import { motion, type Variants } from "framer-motion";
import ChapterLayout from "./ChapterLayout";

const nodeVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

function FlowDiagram() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="flex flex-col items-center gap-0 w-full max-w-sm mx-auto"
    >
      {/* Node: Your Cash */}
      <motion.div
        custom={0}
        variants={nodeVariant}
        className="bg-white border border-mushroom rounded-lg px-5 py-3 text-center w-full"
      >
        <p className="font-heading font-semibold text-sm text-rich-black">
          Your Cash Deposit
        </p>
        <p className="text-[11px] text-charcoal">
          Sitting in your brokerage account
        </p>
      </motion.div>

      <motion.div
        custom={0.5}
        variants={nodeVariant}
        className="text-mushroom text-lg"
      >
        ↓
      </motion.div>

      {/* Node: Schwab Bank (highlighted) */}
      <motion.div
        custom={1}
        variants={nodeVariant}
        className="bg-mist border border-slate-navy rounded-lg px-5 py-3 text-center w-full"
      >
        <p className="font-heading font-semibold text-sm text-slate-navy">
          Schwab Bank
        </p>
        <p className="text-[11px] text-charcoal">
          Sweeps cash into bank deposits
        </p>
      </motion.div>

      <motion.div
        custom={1.5}
        variants={nodeVariant}
        className="text-mushroom text-lg"
      >
        ↓
      </motion.div>

      {/* 3 lending nodes */}
      <motion.div
        custom={2}
        variants={nodeVariant}
        className="flex gap-2 w-full"
      >
        <div className="flex-1 bg-white border border-mushroom rounded-lg px-3 py-2.5 text-center">
          <p className="font-heading font-semibold text-xs text-rich-black">
            Mortgages
          </p>
        </div>
        <div className="flex-1 bg-white border border-mushroom rounded-lg px-3 py-2.5 text-center">
          <p className="font-heading font-semibold text-xs text-rich-black">
            Margin Loans
          </p>
          <p className="text-[10px] text-charcoal">$112.3B</p>
        </div>
        <div className="flex-1 bg-white border border-mushroom rounded-lg px-3 py-2.5 text-center">
          <p className="font-heading font-semibold text-xs text-rich-black">
            Securities
          </p>
        </div>
      </motion.div>

      <motion.div
        custom={2.5}
        variants={nodeVariant}
        className="text-mushroom text-lg"
      >
        ↓
      </motion.div>

      {/* Result */}
      <motion.div custom={3} variants={nodeVariant} className="text-center">
        <p className="font-heading text-2xl font-bold text-slate-navy">
          $11.8B
        </p>
        <p className="text-xs text-charcoal mt-1">in interest earned</p>
      </motion.div>

      <motion.div
        custom={3.5}
        variants={nodeVariant}
        className="mt-2 bg-linen rounded-md px-3 py-1.5"
      >
        <p className="text-[11px] font-medium text-cocoa">
          Net Interest Margin: 2.90%
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function NetInterest() {
  return (
    <div data-chapter={2}>
      <ChapterLayout
        chapterNumber={2}
        chapterLabel="The Hidden Engine"
        title="Net Interest Revenue: $11.8 Billion"
        narrative={
          <>
            <p>
              When you deposit cash in your brokerage account, Schwab doesn't
              just sit on it. They sweep it into Schwab Bank and{" "}
              <strong>lend it out</strong> — to homebuyers, businesses, and
              margin traders.
            </p>
            <p>
              The spread between what they earn on those loans and what they pay
              you in interest? That's <strong>$11.8 billion</strong> — nearly
              half of all revenue.
            </p>
            <p>
              With $112.3 billion in margin loans alone (up 34% year-over-year),
              the lending engine is running at full speed.
            </p>
          </>
        }
        visualization={<FlowDiagram />}
        insight={{
          label: "Key Insight",
          text: "Schwab is effectively a bank that happens to offer a brokerage. Net interest is 49% of total revenue — the single largest revenue stream by far.",
        }}
      />
    </div>
  );
}
