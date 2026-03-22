import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin } from "lucide-react";
import ChapterLayout from "../shared/ChapterLayout";
import { FACILITIES, US_INVESTMENT, RD_SPEND } from "@lib/apple-data";
import { useCountUp } from "@lib/hooks";

const STATUS_COLORS: Record<string, string> = {
  "In production — 4nm chips since Jan 2025": "#34C759",
  "Mass production 2025": "#34C759",
  "Broke ground": "#FF9500",
  "Production begins 2026": "#FF9500",
  "Opened Aug 2025": "#34C759",
  "Operational": "#34C759",
  "Announced": "#007AFF",
};

function getStatusColor(status: string): string {
  return STATUS_COLORS[status] ?? "#86868B";
}

export default function InfrastructureChapter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(600, 1800, inView);

  const narrative = (
    <>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Everyone asks: <strong>"Where's Apple's ChatGPT?"</strong> That's the wrong question.
        While Google, OpenAI, and Meta race to build the best AI model, Apple is building something
        only a handful of companies on earth <em>can</em> build: <strong>the infrastructure to run AI
        on every device you own.</strong>
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Think about it: Apple has <strong>2.5 billion active devices</strong> with custom silicon
        designed to run AI locally. They committed <strong>$600B to US manufacturing</strong> —
        TSMC Arizona already producing 4nm chips, Houston AI server facilities in mass production,
        an Intel 18A partnership for next-gen chips. 19 billion chips sourced from US factories in 2025 alone.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed mb-3">
        Models are commoditizing. Infrastructure isn't. Apple hasn't released a breakthrough
        AI model because they don't need to — they're building the distribution layer that makes
        <em> any</em> model run on <em>every</em> Apple device, on-device, private, and fast.
      </p>
      <p className="text-charcoal text-sm md:text-[0.925rem] leading-relaxed">
        That's not falling behind. That's playing a different game entirely.
      </p>
    </>
  );

  const visualization = (
    <div ref={ref} className="w-full">
      {/* Animated investment counter */}
      <div className="text-center mb-5">
        <span
          className="text-4xl md:text-5xl font-extrabold text-[#1D1D1F]"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          ${count >= US_INVESTMENT ? US_INVESTMENT : count}B
        </span>
        <p className="text-xs text-[#86868B] mt-1">Committed to US Investment</p>
      </div>

      {/* Facility cards */}
      <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
        {FACILITIES.map((facility, i) => (
          <motion.div
            key={facility.id}
            className="flex items-start gap-3 bg-[#F5F5F7] rounded-lg p-3"
            initial={{ opacity: 0, x: 16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * i }}
          >
            <div
              className="mt-0.5 w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: getStatusColor(facility.status) }}
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#1D1D1F] truncate">{facility.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={10} className="text-[#86868B] flex-shrink-0" />
                <p className="text-[10px] text-[#86868B] truncate">{facility.location}</p>
              </div>
              <p className="text-[10px] text-[#86868B] mt-0.5">{facility.investment}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { value: "19B+", label: "US chips" },
          { value: "20K", label: "new jobs" },
          { value: `$${RD_SPEND}B`, label: "R&D spend" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="bg-[#F5F5F7] rounded-lg p-2.5 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
          >
            <p className="text-sm font-extrabold text-[#1D1D1F]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {stat.value}
            </p>
            <p className="text-[10px] text-[#86868B] mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div data-chapter={7}>
      <ChapterLayout
        chapterNumber={7}
        chapterLabel="The Infrastructure Bet"
        title="Building the Future — The Infrastructure Bet"
        narrative={narrative}
        visualization={visualization}
        insight={{
          label: "Key Insight",
          text: "Apple isn't competing on models. They're competing on infrastructure — and they have 2.5 billion endpoints.",
        }}
      />
    </div>
  );
}
