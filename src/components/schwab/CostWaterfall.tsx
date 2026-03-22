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
import { motion } from "framer-motion";
import ChapterLayout from "../shared/ChapterLayout";
import {
  TOTAL_REVENUE,
  NET_INCOME,
  EXPENSE_CATEGORIES,
  formatBillions,
} from "@lib/schwab-data";
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
    fill: "#2C4A6E",
    isExpense: false,
  },
  ...(() => {
    let running = TOTAL_REVENUE;
    return EXPENSE_CATEGORIES.map((cat) => {
      running -= cat.amount;
      return {
        name: cat.name.replace("Compensation & Benefits", "Compensation").replace("Technology & Communications", "Technology").replace("Other Operating Costs", "Other Costs"),
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
    <div className="bg-white rounded-lg shadow-lg border border-mushroom px-4 py-3">
      <p className="font-heading font-semibold text-rich-black text-sm">
        {d.name}
      </p>
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
            top: 20,
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
            axisLine={{ stroke: "#B8A99A" }}
            tickLine={false}
            interval={0}
            angle={isMobile ? -25 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 50 : 30}
          />
          <YAxis hide domain={[0, 26]} />
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
                fontSize: isMobile ? 9 : 11,
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
          <span className="w-2.5 h-2.5 rounded-sm bg-slate-navy" />
          <span className="text-[11px] text-charcoal">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#ef4444" }} />
          <span className="text-[11px] text-charcoal">Expenses & Taxes</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ background: "#22c55e" }} />
          <span className="text-[11px] text-charcoal">Net Income</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CostWaterfall() {
  return (
    <div data-chapter={5}>
      <ChapterLayout
        chapterNumber={5}
        chapterLabel="The Cost Side"
        title="From Revenue to Profit"
        narrative={
          <>
            <p>
              Revenue is only half the story. The real question:{" "}
              <strong>how much does Schwab keep?</strong>
            </p>
            <p>
              Total costs grew 5–6%, but revenue grew <strong>22%</strong>. That
              gap — operating leverage — is how net income jumped to{" "}
              <strong>$8.9 billion</strong>, up 51% year-over-year.
            </p>
            <p>
              Compensation is the biggest line item ($8.1B), followed by
              technology ($2.4B) and other operating costs ($2.8B). But at
              scale, each new dollar of revenue costs less to generate.
            </p>
          </>
        }
        visualization={<WaterfallChart />}
        insight={{
          label: "Key Insight",
          text: "Costs grow slowly. Revenue grows fast. The widening gap is how profit jumped 51% in one year.",
        }}
      />
    </div>
  );
}
