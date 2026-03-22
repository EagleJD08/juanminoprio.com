import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import ChapterLayout from "../shared/ChapterLayout";
import {
  TOTAL_REVENUE,
  NET_INCOME,
  EXPENSE_CATEGORIES,
  MARGIN_COMPARISON,
  formatBillions,
} from "@lib/apple-data";
import { useWindowWidth } from "@lib/hooks";

interface WaterfallEntry {
  name: string;
  value: number;
  base: number;
  fill: string;
  isExpense: boolean;
}

const waterfallData: WaterfallEntry[] = [
  {
    name: "Revenue",
    value: TOTAL_REVENUE,
    base: 0,
    fill: "#1D1D1F",
    isExpense: false,
  },
  ...(() => {
    let running = TOTAL_REVENUE;
    return EXPENSE_CATEGORIES.map((cat) => {
      running -= cat.amount;
      return {
        name: cat.name,
        value: cat.amount,
        base: running,
        fill: "#ef4444",
        isExpense: true,
      };
    });
  })(),
  {
    name: "Net Income",
    value: NET_INCOME,
    base: 0,
    fill: "#22c55e",
    isExpense: false,
  },
];

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[1]?.payload ?? payload[0]?.payload;
  if (!d) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3">
      <p className="font-semibold text-[#1D1D1F] text-sm">{d.name}</p>
      <p className="text-sm mt-1" style={{ color: d.fill }}>
        {d.isExpense ? "-" : ""}
        {formatBillions(d.value)}
      </p>
    </div>
  );
}

function WaterfallChart() {
  const width = useWindowWidth();
  const isMobile = width < 640;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <ResponsiveContainer width="100%" height={isMobile ? 280 : 320}>
        <BarChart
          data={waterfallData}
          margin={{
            top: 24,
            right: 10,
            left: isMobile ? -10 : 0,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="name"
            tick={{
              fontSize: isMobile ? 9 : 11,
              fill: "#4A4A4A",
              fontFamily: "Inter",
            }}
            axisLine={{ stroke: "#D1D1D6" }}
            tickLine={false}
            interval={0}
            angle={isMobile ? -25 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 50 : 30}
          />
          <YAxis hide domain={[0, 450]} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
          />
          {/* Invisible base bar to create waterfall offset */}
          <Bar dataKey="base" stackId="stack" fill="transparent" barSize={isMobile ? 28 : 40}>
            {waterfallData.map((_, i) => (
              <Cell key={i} fill="transparent" />
            ))}
          </Bar>
          {/* Visible value bar */}
          <Bar dataKey="value" stackId="stack" radius={[3, 3, 0, 0]} barSize={isMobile ? 28 : 40}>
            {waterfallData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
            <LabelList
              dataKey="value"
              position="top"
              formatter={(v: number) => formatBillions(v)}
              style={{
                fontSize: isMobile ? 8 : 10,
                fontWeight: 600,
                fill: "#1A1A1A",
                fontFamily: "Inter",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#1D1D1F]" />
          <span className="text-[11px] text-[#4A4A4A]">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#ef4444" }} />
          <span className="text-[11px] text-[#4A4A4A]">Expenses & Taxes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#22c55e" }} />
          <span className="text-[11px] text-[#4A4A4A]">Net Income</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProfitStory() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const narrative = (
    <>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Apple's net income hit <strong>$112B</strong> in FY2025, up 19.5% YoY.
        Here's how $416.2B in revenue became $112B in profit — and why Services
        is the key to the widening gap.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        After cost of sales, R&D, SG&A, and taxes, Apple keeps 26.9 cents of
        every dollar it earns. But that number is rising fast — because the
        fastest-growing segment (Services) carries a{" "}
        <strong>75.4% gross margin</strong> versus 36.8% for Products.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed">
        In Q1 FY2026, the mix shift pushed Apple's blended gross margin to{" "}
        <strong>48.2%</strong> — an all-time record.
      </p>
    </>
  );

  const visualization = (
    <div ref={ref} className="w-full space-y-5">
      {/* Waterfall chart */}
      <WaterfallChart />

      {/* Revenue vs Net Income comparison stats */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <motion.div
          className="bg-[#F5F5F7] rounded-lg p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p
            className="text-2xl font-extrabold text-[#1D1D1F]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            +6.4%
          </p>
          <p className="text-xs text-[#86868B] mt-1">Revenue Growth</p>
        </motion.div>
        <motion.div
          className="bg-[#F5F5F7] rounded-lg p-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <p
            className="text-2xl font-extrabold text-[#34C759]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            +19.5%
          </p>
          <p className="text-xs text-[#86868B] mt-1">Net Income Growth</p>
        </motion.div>
      </div>

      {/* Margin comparison bars */}
      <div className="space-y-3 mt-1">
        <p className="text-xs font-semibold text-[#86868B] uppercase tracking-wide">
          Gross Margin by Segment
        </p>
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
            <div className="w-full bg-[#EEEEEE] rounded-full h-6 overflow-hidden">
              <motion.div
                className="h-full rounded-full flex items-center px-3"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${item.margin}%` } : {}}
                transition={{ duration: 1.1, delay: 0.5 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-white text-xs font-semibold whitespace-nowrap">
                  {item.margin}% gross margin
                </span>
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* Q1 badge */}
      <motion.div
        className="flex justify-center mt-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
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
