import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import { cn, formatCurrency } from "@lib/utils";
import {
  AGE_GROUPS,
  INCOME_GROUPS,
  NATIONAL_AVERAGE,
  CATEGORIES,
  getSpendingAmount,
} from "@lib/spending-data";
import type { DemographicGroup } from "@lib/spending-types";
import { getPersonaByAgeGroup } from "@lib/persona-data";
import { useWindowWidth } from "@lib/hooks";
import ComparisonCard from "./ComparisonCard";
import PersonaCard from "./PersonaCard";

type ViewMode = "chart" | "donut" | "cards";

function PillButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer",
        active
          ? "bg-rich-black text-snow border-rich-black shadow-md"
          : "bg-white text-rich-black border-mushroom hover:border-rich-black/30 hover:bg-rich-black/5 hover:shadow-sm"
      )}
    >
      {label}
    </motion.button>
  );
}

interface ComparisonChartItem {
  name: string;
  shortName: string;
  national: number;
  group: number;
  color: string;
}

function ComparisonTooltip({
  active,
  payload,
  groupLabel,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string }>;
  groupLabel: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-mushroom px-4 py-3">
      {payload.map((p) => (
        <p key={p.dataKey} className="text-sm text-rich-black">
          <span className="font-medium">{p.dataKey === "national" ? "National Avg" : groupLabel}:</span>{" "}
          {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

function DeltaBadge({ group, national }: { group: number; national: number }) {
  const diff = group - national;
  const pct = ((diff / national) * 100).toFixed(1);
  const isMore = diff > 0;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold",
        isMore
          ? "bg-cocoa/10 text-cocoa"
          : "bg-slate-navy/10 text-slate-navy"
      )}
    >
      {isMore ? "↑" : "↓"} {isMore ? "+" : ""}{pct}% vs avg
    </span>
  );
}

function GroupBarLabel(props: { x?: number; y?: number; width?: number; height?: number; value?: number }) {
  const { x = 0, y = 0, width = 0, height = 0, value = 0 } = props;
  if (value < 300) return null;
  return (
    <text
      x={x + width + 6}
      y={y + height / 2}
      fill="#4A4A4A"
      fontSize={10}
      dominantBaseline="middle"
      fontFamily="Inter"
    >
      {formatCurrency(value)}
    </text>
  );
}

interface DonutDataItem {
  name: string;
  amount: number;
  color: string;
  percent: number;
}

function DonutCenterLabel({ viewBox, total }: { viewBox?: { cx?: number; cy?: number }; total: number }) {
  const cx = viewBox?.cx ?? 0;
  const cy = viewBox?.cy ?? 0;
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central" fill="#4A4A4A" fontSize={13} fontFamily="Inter">
        Total
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" dominantBaseline="central" fill="#1A1A1A" fontSize={22} fontWeight={700} fontFamily="Plus Jakarta Sans, sans-serif">
        {formatCurrency(total)}
      </text>
    </g>
  );
}

function DonutTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: DonutDataItem }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-mushroom px-4 py-3">
      <p className="font-heading font-semibold text-rich-black text-sm">{item.name}</p>
      <p className="text-rich-black/80 text-sm mt-1">
        {formatCurrency(item.amount)}{" "}
        <span className="text-charcoal">({item.percent.toFixed(1)}%)</span>
      </p>
    </div>
  );
}

export default function FindYourself() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedIncome, setSelectedIncome] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("chart");

  const selectedGroup: DemographicGroup | null =
    selectedAge
      ? AGE_GROUPS.find((g) => g.id === selectedAge) ?? null
      : selectedIncome
        ? INCOME_GROUPS.find((g) => g.id === selectedIncome) ?? null
        : null;

  const handleAgeSelect = (id: string) => {
    setSelectedAge(selectedAge === id ? null : id);
    setSelectedIncome(null);
  };

  const handleIncomeSelect = (id: string) => {
    setSelectedIncome(selectedIncome === id ? null : id);
    setSelectedAge(null);
  };

  const w = useWindowWidth();
  const isMobile = w < 640;

  const chartData: ComparisonChartItem[] = selectedGroup
    ? CATEGORIES.map((cat) => ({
        name: cat.name,
        shortName: cat.shortName,
        national: getSpendingAmount(NATIONAL_AVERAGE, cat.id),
        group: getSpendingAmount(selectedGroup, cat.id),
        color: cat.color,
      })).sort((a, b) => b.national - a.national)
    : [];

  const donutData: DonutDataItem[] = selectedGroup
    ? CATEGORIES.map((cat) => {
        const amount = getSpendingAmount(selectedGroup, cat.id);
        return {
          name: cat.name,
          amount,
          color: cat.color,
          percent: (amount / selectedGroup.totalExpenditure) * 100,
        };
      }).sort((a, b) => b.amount - a.amount)
    : [];

  const donutOuterRadius = isMobile ? 120 : 170;
  const donutInnerRadius = isMobile ? 65 : 95;

  return (
    <section className="px-6 py-12 md:py-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black mb-2">
          Find Yourself
        </h2>
        <p className="text-charcoal text-base md:text-lg mb-8">
          Select your age or income bracket to see how your group compares to the national average
        </p>

        <div className="mb-6">
          <p className="text-xs font-medium uppercase tracking-widest text-charcoal mb-3">Age Group</p>
          <div className="flex flex-wrap gap-2">
            {AGE_GROUPS.map((g) => (
              <PillButton
                key={g.id}
                label={g.label}
                active={selectedAge === g.id}
                onClick={() => handleAgeSelect(g.id)}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <p className="text-xs font-medium uppercase tracking-widest text-charcoal mb-3">Income Quintile</p>
          <div className="flex flex-wrap gap-2">
            {INCOME_GROUPS.map((g) => (
              <PillButton
                key={g.id}
                label={g.label}
                active={selectedIncome === g.id}
                onClick={() => handleIncomeSelect(g.id)}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedGroup ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-14 md:py-20 text-center"
            >
              <p className="font-heading text-2xl md:text-3xl font-bold text-rich-black/15 leading-relaxed max-w-lg mx-auto">
                Select a group above to see how spending shifts across demographics
              </p>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mt-6"
              >
                <svg className="w-5 h-5 mx-auto text-mushroom rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={selectedGroup.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-2xl md:text-3xl font-heading font-bold text-rich-black">
                      {formatCurrency(selectedGroup.totalExpenditure)}
                    </p>
                    <DeltaBadge group={selectedGroup.totalExpenditure} national={NATIONAL_AVERAGE.totalExpenditure} />
                  </div>
                  <p className="text-sm text-charcoal mt-1">
                    <span className="font-semibold text-rich-black">{selectedGroup.label}</span>{" "}
                    vs {formatCurrency(NATIONAL_AVERAGE.totalExpenditure)} national average
                  </p>
                </div>

                <div className="flex bg-white border border-mushroom rounded-lg overflow-hidden">
                  {(["chart", "donut", "cards"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium transition-colors cursor-pointer capitalize",
                        viewMode === mode
                          ? "bg-rich-black text-snow"
                          : "text-rich-black hover:bg-rich-black/5"
                      )}
                    >
                      {mode === "chart" ? "Bar" : mode === "donut" ? "Donut" : "Cards"}
                    </button>
                  ))}
                </div>
              </div>

              {selectedAge && (() => {
                const persona = getPersonaByAgeGroup(selectedAge);
                return persona ? (
                  <div className="mb-8">
                    <PersonaCard persona={persona} />
                  </div>
                ) : null;
              })()}

              {viewMode === "chart" ? (
                <div className="w-full bg-white rounded-2xl border border-mushroom/60 p-3 md:p-6" style={{ height: isMobile ? 520 : 600 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 0, right: isMobile ? 55 : 75, left: 0, bottom: 0 }}
                    >
                      <XAxis
                        type="number"
                        tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#4A4A4A", fontSize: isMobile ? 10 : 11 }}
                      />
                      <YAxis
                        type="category"
                        dataKey="shortName"
                        width={isMobile ? 80 : 120}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#1A1A1A", fontSize: isMobile ? 10 : 11, fontFamily: "Inter" }}
                      />
                      <Tooltip
                        content={<ComparisonTooltip groupLabel={selectedGroup.label} />}
                        cursor={{ fill: "rgba(184, 169, 154, 0.15)" }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                        formatter={(value: string) =>
                          value === "national" ? "National Avg" : selectedGroup.label
                        }
                      />
                      <Bar dataKey="national" fill="#B8A99A" radius={[0, 4, 4, 0]} barSize={isMobile ? 8 : 11} animationDuration={1000} animationEasing="ease-out">
                        {!isMobile && <LabelList content={<GroupBarLabel />} />}
                      </Bar>
                      <Bar dataKey="group" fill="#6B4226" radius={[0, 4, 4, 0]} barSize={isMobile ? 8 : 11} animationDuration={1000} animationEasing="ease-out">
                        {!isMobile && <LabelList content={<GroupBarLabel />} />}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : viewMode === "donut" ? (
                <motion.div
                  key="donut"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full bg-white rounded-2xl border border-mushroom/60 p-3 md:p-6 flex justify-center"
                  style={{ height: isMobile ? 340 : 440 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
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
                        {donutData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                        <Label content={<DonutCenterLabel total={selectedGroup.totalExpenditure} />} position="center" />
                      </Pie>
                      <Tooltip content={<DonutTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CATEGORIES.map((cat, i) => (
                    <ComparisonCard
                      key={cat.id}
                      categoryId={cat.id}
                      nationalAmount={getSpendingAmount(NATIONAL_AVERAGE, cat.id)}
                      groupAmount={getSpendingAmount(selectedGroup, cat.id)}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
