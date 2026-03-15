import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  PieChart,
  Pie,
  Label,
} from "recharts";
import { NATIONAL_AVERAGE, CATEGORIES, getSpendingAmount } from "@lib/spending-data";
import { cn, formatCurrency } from "@lib/utils";
import { useWindowWidth } from "@lib/hooks";

type ViewMode = "bar" | "donut";

interface ChartDataItem {
  name: string;
  shortName: string;
  amount: number;
  color: string;
  percent: number;
}

const data: ChartDataItem[] = CATEGORIES.map((cat) => {
  const amount = getSpendingAmount(NATIONAL_AVERAGE, cat.id);
  return {
    name: cat.name,
    shortName: cat.shortName,
    amount,
    color: cat.color,
    percent: (amount / NATIONAL_AVERAGE.totalExpenditure) * 100,
  };
}).sort((a, b) => b.amount - a.amount);

const TOTAL = NATIONAL_AVERAGE.totalExpenditure;

function BarTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartDataItem }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-mushroom px-4 py-3">
      <p className="font-heading font-semibold text-rich-black text-sm">{item.name}</p>
      <p className="text-rich-black/80 text-sm mt-1">
        {formatCurrency(item.amount)}{" "}
        <span className="text-charcoal">({item.percent.toFixed(1)}% of total)</span>
      </p>
    </div>
  );
}

function CustomBarLabel(props: { x?: number; y?: number; width?: number; height?: number; value?: number }) {
  const { x = 0, y = 0, width = 0, height = 0, value = 0 } = props;
  if (value < 500) return null;
  return (
    <text
      x={x + width + 8}
      y={y + height / 2}
      fill="#4A4A4A"
      fontSize={11}
      dominantBaseline="middle"
      fontFamily="Inter"
    >
      {formatCurrency(value)}
    </text>
  );
}

function DonutTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartDataItem }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-mushroom px-4 py-3">
      <p className="font-heading font-semibold text-rich-black text-sm">{item.name}</p>
      <p className="text-rich-black/80 text-sm mt-1">
        {formatCurrency(item.amount)}{" "}
        <span className="text-charcoal">({item.percent.toFixed(1)}% of total)</span>
      </p>
    </div>
  );
}

function CenterLabelContent({ viewBox }: { viewBox?: { cx?: number; cy?: number } }) {
  const cx = viewBox?.cx ?? 0;
  const cy = viewBox?.cy ?? 0;
  return (
    <g>
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#4A4A4A"
        fontSize={13}
        fontFamily="Inter"
      >
        Total
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#1A1A1A"
        fontSize={22}
        fontWeight={700}
        fontFamily="Plus Jakarta Sans, sans-serif"
      >
        {formatCurrency(TOTAL)}
      </text>
    </g>
  );
}

export default function SpendingBreakdown() {
  const [viewMode, setViewMode] = useState<ViewMode>("bar");
  const w = useWindowWidth();
  const isMobile = w < 640;
  const yAxisWidth = isMobile ? 90 : 180;
  const barSize = isMobile ? 16 : 22;
  const labelKey = isMobile ? "shortName" : "name";

  const donutOuterRadius = isMobile ? 120 : 170;
  const donutInnerRadius = isMobile ? 65 : 95;

  return (
    <section id="breakdown" className="px-6 py-12 md:py-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black">
            Where the Money Goes
          </h2>

          <div className="flex bg-white border border-mushroom rounded-lg overflow-hidden shrink-0 mt-1">
            <button
              onClick={() => setViewMode("bar")}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                viewMode === "bar"
                  ? "bg-rich-black text-snow"
                  : "text-rich-black hover:bg-rich-black/5"
              )}
            >
              Bar
            </button>
            <button
              onClick={() => setViewMode("donut")}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                viewMode === "donut"
                  ? "bg-rich-black text-snow"
                  : "text-rich-black hover:bg-rich-black/5"
              )}
            >
              Donut
            </button>
          </div>
        </div>

        <p className="text-charcoal text-base md:text-lg mb-8">
          Average annual spending across 14 major categories
        </p>

        <AnimatePresence mode="wait">
          {viewMode === "bar" ? (
            <motion.div
              key="bar"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="w-full"
              style={{ height: Math.max(500, data.length * 40) }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ top: 0, right: isMobile ? 60 : 80, left: 0, bottom: 0 }}>
                  <XAxis
                    type="number"
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#4A4A4A", fontSize: isMobile ? 10 : 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey={labelKey}
                    width={yAxisWidth}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#1A1A1A", fontSize: isMobile ? 11 : 12, fontFamily: "Inter" }}
                  />
                  <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(184, 169, 154, 0.2)" }} />
                  <Bar
                    dataKey="amount"
                    radius={[0, 6, 6, 0]}
                    barSize={barSize}
                    animationDuration={1200}
                    animationEasing="ease-out"
                  >
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                    {!isMobile && <LabelList content={<CustomBarLabel />} />}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div
              key="donut"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex justify-center"
              style={{ height: isMobile ? 320 : 420 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={donutOuterRadius}
                    innerRadius={donutInnerRadius}
                    paddingAngle={2}
                    animationBegin={0}
                    animationDuration={1000}
                    animationEasing="ease-out"
                    stroke="none"
                  >
                    {data.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                    <Label content={<CenterLabelContent />} position="center" />
                  </Pie>
                  <Tooltip content={<DonutTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
