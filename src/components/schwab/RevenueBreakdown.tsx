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
import ChapterLayout from "./ChapterLayout";
import { REVENUE_STREAMS, formatBillions } from "@lib/schwab-data";
import { useWindowWidth } from "@lib/hooks";

const chartData = REVENUE_STREAMS.map((s) => ({
  name: s.shortName,
  fullName: s.name,
  amount: s.amount,
  percent: s.percentOfTotal,
  color: s.color,
  growth: s.yoyGrowth,
}));

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-mushroom px-4 py-3">
      <p className="font-heading font-semibold text-rich-black text-sm">
        {d.fullName}
      </p>
      <p className="text-rich-black/80 text-sm mt-1">
        {formatBillions(d.amount)}{" "}
        <span className="text-charcoal">({d.percent}% of revenue)</span>
      </p>
      {d.growth > 0 && (
        <p className="text-emerald-600 text-xs mt-1">
          ↑ {d.growth}% YoY growth
        </p>
      )}
    </div>
  );
}

function RevenueChart() {
  const width = useWindowWidth();
  const isMobile = width < 640;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 0,
            right: 60,
            left: isMobile ? 60 : 80,
            bottom: 0,
          }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            tick={{
              fontSize: 12,
              fill: "#4A4A4A",
              fontFamily: "Inter",
            }}
            width={isMobile ? 55 : 75}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "rgba(0,0,0,0.03)" }}
          />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]} barSize={32}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
            <LabelList
              dataKey="amount"
              position="right"
              formatter={(v) => formatBillions(Number(v))}
              style={{
                fontSize: 12,
                fontWeight: 600,
                fill: "#1A1A1A",
                fontFamily: "Inter",
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 justify-center">
        {chartData.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm"
              style={{ background: d.color }}
            />
            <span className="text-[11px] text-charcoal">{d.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RevenueBreakdown() {
  return (
    <div data-chapter={1}>
      <ChapterLayout
        chapterNumber={1}
        chapterLabel="The Big Picture"
        title="Where Does $23.9 Billion Actually Come From?"
        narrative={
          <>
            <p>
              Most people think Schwab makes money from trading commissions.
            </p>
            <p>
              But Schwab <strong>eliminated commissions in 2019</strong>. Zero.
              Gone. So where does $23.9 billion in revenue actually come from?
            </p>
            <p>
              The answer is four very different revenue streams — and the biggest
              one might surprise you.
            </p>
          </>
        }
        visualization={<RevenueChart />}
        insight={{
          label: "Key Insight",
          text: "The biggest chunk isn't from trading. It's from lending your cash. Net interest revenue is 49% of total — nearly half.",
        }}
      />
    </div>
  );
}
