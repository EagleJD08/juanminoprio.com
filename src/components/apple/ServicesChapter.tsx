import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Store, Cloud, Music, Tv, Shield, CreditCard, Heart, Gamepad2, Newspaper } from "lucide-react";
import ChapterLayout from "../shared/ChapterLayout";
import { SERVICES_HISTORY, SERVICES_LIST } from "@lib/apple-data";
import { useCountUp } from "@lib/hooks";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Store,
  Cloud,
  Music,
  Tv,
  Shield,
  CreditCard,
  Heart,
  Gamepad2,
  Newspaper,
};

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-white rounded-lg shadow-lg border border-[#B8A99A] p-3 text-sm">
      <p className="font-semibold text-[#1D1D1F]">{d.year}</p>
      <p className="text-[#34C759]">${d.revenue}B</p>
    </div>
  );
}

export default function ServicesChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(1000, 1500, inView);

  const narrative = (
    <>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Services crossed <strong>$100B for the first time</strong> in FY2025 — reaching $109.2B,
        up +13.5% year-over-year. This is no longer a secondary business line.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Apple has 2.5 billion active devices and over 1 billion paid subscriptions across
        App Store, iCloud, Music, TV+, AppleCare, Pay, Fitness+, Arcade, and News+.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed">
        The gross margin on Services is <strong>75.4%</strong> — more than double the
        Products segment at 36.8%. Every new subscriber makes Apple more profitable.
      </p>
    </>
  );

  const visualization = (
    <div ref={ref} className="w-full">
      {/* Animated subscription counter */}
      <div className="text-center mb-5">
        <span
          className="text-4xl md:text-5xl font-extrabold text-[#34C759]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {count >= 1000 ? "1B+" : `${count}M+`}
        </span>
        <p className="text-xs text-[#86868B] mt-1">Paid Subscriptions</p>
        <div className="flex justify-center mt-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-[#e8f5e9] text-[#2e7d32]">
            Q1 FY2026: +14% YoY — another record quarter
          </span>
        </div>
      </div>

      {/* Line chart — Services revenue growth */}
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={SERVICES_HISTORY}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#86868B" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[75, 115]}
            tick={{ fontSize: 11, fill: "#86868B" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}B`}
            width={48}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#34C759"
            strokeWidth={3}
            dot={{ r: 6, fill: "#34C759", strokeWidth: 0 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* 3×3 Service icon grid */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {SERVICES_LIST.map((service) => {
          const Icon = ICON_MAP[service.icon];
          return (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * SERVICES_LIST.indexOf(service) }}
              className="flex flex-col items-center gap-1 p-2 rounded-md bg-[#F5F5F7]"
            >
              {Icon && <Icon size={16} className="text-[#34C759]" />}
              <span className="text-[10px] text-[#86868B] text-center leading-tight">{service.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div data-chapter={5}>
      <ChapterLayout
        chapterNumber={5}
        chapterLabel="The Recurring Revenue Machine"
        title="Services — The Recurring Revenue Machine"
        narrative={narrative}
        visualization={visualization}
        insight={{
          label: "Key Insight",
          text: "Services margin is 75.4% vs Products at 36.8%. As Services grows, the entire company gets more profitable.",
        }}
      />
    </div>
  );
}
