import { useMemo } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { motion } from "framer-motion";
import ChapterLayout from "../shared/ChapterLayout";
import { REVENUE_SEGMENTS, formatBillions } from "@lib/apple-data";
import { useWindowWidth } from "@lib/hooks";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-[#B8A99A] p-3 text-sm">
      <p className="font-semibold text-[#1D1D1F]">{d.name}</p>
      <p className="text-[#4A4A4A]">{formatBillions(d.amount)} · {d.percentOfTotal}%</p>
      <p className={d.yoyGrowth >= 0 ? "text-[#34C759]" : "text-[#ef4444]"}>
        {d.yoyGrowth >= 0 ? "+" : ""}{d.yoyGrowth}% YoY
      </p>
    </div>
  );
}

export default function RevenueBreakdown() {
  const width = useWindowWidth();
  const isMobile = width < 768;

  const chartData = useMemo(
    () => REVENUE_SEGMENTS.map((s) => ({ ...s })),
    []
  );

  const narrative = (
    <>
      <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed mb-4">
        Half of Apple's revenue comes from one product. But the real story is what's
        growing fastest — and why it changes everything about Apple's future.
      </p>
      <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed">
        In FY2025, Apple generated <strong>$416.2 billion</strong> in revenue across five
        segments. iPhone dominates at 50%, but Services — growing at 13.5% — is
        quietly reshaping the company's profit engine.
      </p>
    </>
  );

  const visualization = (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={isMobile
            ? { top: 5, right: 10, left: 0, bottom: 5 }
            : { top: 5, right: 30, left: 10, bottom: 5 }
          }
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="shortName"
            type="category"
            width={isMobile ? 60 : 80}
            tick={{ fontSize: 12, fill: "#86868B" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F5F0EB" }} />
          <Bar dataKey="amount" radius={[0, 6, 6, 0]} barSize={28}>
            {chartData.map((entry) => (
              <Cell key={entry.id} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {REVENUE_SEGMENTS.map((s) => (
          <div key={s.id} className="flex items-center gap-1.5 text-xs text-[#86868B]">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            {s.shortName} {s.percentOfTotal}%
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div data-chapter={1}>
      <ChapterLayout
        chapterNumber={1}
        chapterLabel="Chapter 01"
        title="The Big Picture"
        narrative={narrative}
        visualization={visualization}
        insight={{
          label: "Key Insight",
          text: "The fastest-growing segment isn't a product you can hold — it's Services, at +13.5% YoY.",
        }}
      />
    </div>
  );
}
