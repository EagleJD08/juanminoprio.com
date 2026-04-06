import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ExternalLink, X } from "lucide-react";

interface Evidence {
  label: string;
  href?: string;
  metric?: string;
}

interface Skill {
  subject: string;
  shortLabel: string;
  score: number;
  depth: "deep" | "wide";
  description: string;
  evidence: Evidence[];
}

const skills: Skill[] = [
  {
    subject: "Consumer Psychology",
    shortLabel: "Consumer\nPsychology",
    score: 95,
    depth: "deep",
    description:
      "My vertical — understanding behavioral triggers, cognitive biases, and the invisible forces behind every purchase decision. Applied daily at Schwab to campaigns reaching millions of investors.",
    evidence: [
      { label: "10.2M impressions driven at Schwab", metric: "10.2M impressions" },
      { label: "FIU Marketing degree with behavioral science focus", metric: "Academic foundation" },
      { label: "Marketer Archetype Quiz — built around 5 behavioral profiles", href: "/projects/marketer-quiz/" },
    ],
  },
  {
    subject: "AI for Marketing",
    shortLabel: "AI for\nMarketing",
    score: 88,
    depth: "wide",
    description:
      "Using Claude, ChatGPT, and Midjourney to accelerate content production, campaign analysis, and strategic planning. Built AI-powered tools that live on this site.",
    evidence: [
      { label: "LinkedIn Post Generator tool — live on this site", href: "/tools/post-generator/" },
      { label: "42% faster content turnaround with AI workflows", metric: "42% faster" },
      { label: "Cursor + Claude used to build this entire portfolio", metric: "This site" },
    ],
  },
  {
    subject: "Data Storytelling",
    shortLabel: "Data\nStorytelling",
    score: 85,
    depth: "wide",
    description:
      "Translating complex financial and marketing data into narratives that anyone can follow. Built two interactive data dashboards from scratch using Recharts and Framer Motion.",
    evidence: [
      { label: "Apple Revenue Dashboard — 9 chapters, $416.2B story", href: "/projects/apple/" },
      { label: "Charles Schwab Dashboard — 7 chapters, $23.9B story", href: "/projects/schwab/" },
      { label: "Consumer Spending Visualization — regional breakdown", href: "/projects/spending-viz/" },
    ],
  },
  {
    subject: "Financial Literacy",
    shortLabel: "Financial\nLiteracy",
    score: 80,
    depth: "wide",
    description:
      "Deep familiarity with financial services: revenue models, investor behavior, wealth management mechanics, and how macro conditions (rates, markets) affect marketing strategy.",
    evidence: [
      { label: "3+ years marketing at Charles Schwab — $9.9T AUM context", metric: "Enterprise finserv" },
      { label: "Schwab revenue model analysis — NII, AUM fees, trading", href: "/projects/schwab/" },
      { label: "Apple P&L analysis — segment margins, Services strategy", href: "/projects/apple/" },
    ],
  },
  {
    subject: "MarTech",
    shortLabel: "MarTech",
    score: 78,
    depth: "wide",
    description:
      "Hands-on experience with enterprise marketing technology stacks: Salesforce Marketing Cloud, HubSpot, Google Analytics 4, Sprinklr, and LinkedIn Campaign Manager.",
    evidence: [
      { label: "Salesforce Marketing Cloud — campaign management at Schwab", metric: "Enterprise CRM" },
      { label: "HubSpot — lifecycle flows and contact segmentation", metric: "Marketing automation" },
      { label: "GA4 + Plausible — analytics implementation on this site", metric: "Live analytics" },
    ],
  },
  {
    subject: "Content Production",
    shortLabel: "Content\nProduction",
    score: 82,
    depth: "wide",
    description:
      "From concept to distribution: writing, designing, and publishing content across LinkedIn, email, and web. Agency experience in influencer programs and paid media.",
    evidence: [
      { label: "3+ years agency content strategy and paid media in Miami", metric: "Agency experience" },
      { label: "LinkedIn Post Generator with 5 audience personas", href: "/tools/post-generator/" },
      { label: "Influencer program management across multiple brands", metric: "Influencer marketing" },
    ],
  },
  {
    subject: "Product Marketing",
    shortLabel: "Product\nMarketing",
    score: 72,
    depth: "wide",
    description:
      "Positioning, messaging, and go-to-market strategy for financial products. Experience translating complex offerings into clear value propositions for mass-affluent investors and financial advisors.",
    evidence: [
      { label: "Schwab campaigns targeting mass-affluent investor segments", metric: "B2C financial products" },
      { label: "Advisor-facing content and enablement materials at Schwab", metric: "B2B enablement" },
      { label: "Marketer Archetype Quiz — 12-question positioning framework", href: "/projects/marketer-quiz/" },
    ],
  },
];

// Prepare data for radar chart — close the polygon by repeating first point isn't needed with Recharts
const radarData = skills.map((s) => ({
  subject: s.shortLabel,
  score: s.score,
  fullSubject: s.subject,
}));

function CustomAngleAxisTick({
  x,
  y,
  payload,
  selectedSkill,
  onSelect,
}: {
  x: number;
  y: number;
  payload: { value: string };
  selectedSkill: string | null;
  onSelect: (name: string) => void;
}) {
  const lines = payload.value.split("\n");
  const skill = skills.find((s) => s.shortLabel === payload.value);
  const isSelected = skill?.subject === selectedSkill;
  const isDeep = skill?.depth === "deep";

  return (
    <g
      className="cursor-pointer"
      onClick={() => skill && onSelect(skill.subject)}
      role="button"
      aria-label={skill?.subject}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && skill && onSelect(skill.subject)}
    >
      {lines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={y + i * 14 - (lines.length - 1) * 7}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={11}
          fontFamily="'Inter', system-ui, sans-serif"
          fontWeight={isSelected || isDeep ? 600 : 400}
          fill={isSelected ? "#6B4226" : isDeep ? "#2C4A6E" : "#4A4A4A"}
        >
          {line}
        </text>
      ))}
      {isDeep && (
        <circle
          cx={x}
          cy={y + (lines.length - 1) * 14 + 6}
          r={3}
          fill="#2C4A6E"
          opacity={0.7}
        />
      )}
    </g>
  );
}

export default function SkillsRadar() {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  function handleSelect(name: string) {
    setSelectedSkill((prev) => (prev === name ? null : name));
  }

  const activeSkill = skills.find((s) => s.subject === selectedSkill);

  return (
    <section id="skills" className="py-24 md:py-32 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B8A99A] to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="reveal max-w-2xl mb-12">
          <span className="font-body text-xs font-medium tracking-widest uppercase text-[#6B4226]">
            T-shaped expertise
          </span>
          <h2
            className="mt-3 font-heading font-bold text-[#1A1A1A]"
            style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)" }}
          >
            Skills map.
          </h2>
          <p className="mt-4 text-[#4A4A4A] text-sm md:text-base">
            Deep in Consumer Psychology — wide across AI, MarTech, Data, and Finance.{" "}
            <span className="text-[#2C4A6E] font-medium">Click any skill</span> to see evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Radar Chart */}
          <div className="w-full" style={{ height: 420 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} margin={{ top: 30, right: 50, bottom: 30, left: 50 }}>
                <PolarGrid
                  gridType="polygon"
                  stroke="#B8A99A"
                  strokeOpacity={0.4}
                />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={(props) => (
                    <CustomAngleAxisTick
                      {...props}
                      selectedSkill={selectedSkill}
                      onSelect={handleSelect}
                    />
                  )}
                />
                <Radar
                  name="Skills"
                  dataKey="score"
                  stroke="#2C4A6E"
                  fill="#2C4A6E"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  dot={{ fill: "#2C4A6E", r: 4, strokeWidth: 0 }}
                  activeDot={{ fill: "#6B4226", r: 6, strokeWidth: 0 }}
                  onClick={(data) => {
                    const skill = skills.find(
                      (s) => s.shortLabel === data.subject
                    );
                    if (skill) handleSelect(skill.subject);
                  }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const d = payload[0].payload;
                    const skill = skills.find((s) => s.shortLabel === d.subject);
                    return (
                      <div className="bg-[#1A1A1A] text-white rounded-lg px-3 py-2 text-xs shadow-lg pointer-events-none">
                        <p className="font-semibold">{skill?.subject ?? d.subject}</p>
                        <p className="text-white/60 mt-0.5">
                          {skill?.depth === "deep" ? "Deep expertise" : "Wide range"} — click to expand
                        </p>
                      </div>
                    );
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-2 text-xs text-[#4A4A4A]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#2C4A6E]" />
                Deep vertical
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-0.5 bg-[#2C4A6E]/40" />
                Wide range
              </span>
            </div>
          </div>

          {/* Evidence Panel */}
          <div className="min-h-[300px] flex flex-col justify-start">
            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.subject}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="rounded-2xl border border-[#B8A99A]/50 bg-[#FAFAFA] p-6 relative"
                >
                  <button
                    onClick={() => setSelectedSkill(null)}
                    aria-label="Close"
                    className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-[#4A4A4A] hover:bg-[#B8A99A]/20 transition-colors"
                  >
                    <X size={14} />
                  </button>

                  <div className="pr-8">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wide mb-3 ${
                        activeSkill.depth === "deep"
                          ? "bg-[#2C4A6E]/10 text-[#2C4A6E]"
                          : "bg-[#6B4226]/10 text-[#6B4226]"
                      }`}
                    >
                      {activeSkill.depth === "deep" ? "Deep vertical" : "Wide range"}
                    </span>
                    <h3 className="font-heading font-bold text-[#1A1A1A] text-xl mb-3">
                      {activeSkill.subject}
                    </h3>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed mb-5">
                      {activeSkill.description}
                    </p>

                    <div className="space-y-2">
                      <p className="text-[10px] font-medium tracking-widest uppercase text-[#4A4A4A]/60 mb-2">
                        Evidence
                      </p>
                      {activeSkill.evidence.map((ev) => (
                        <div
                          key={ev.label}
                          className="flex items-start justify-between gap-3 py-2 border-b border-[#B8A99A]/30 last:border-0"
                        >
                          <p className="text-sm text-[#1A1A1A]">{ev.label}</p>
                          <div className="flex items-center gap-2 shrink-0">
                            {ev.metric && (
                              <span className="text-[11px] font-medium text-[#2C4A6E] bg-[#2C4A6E]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
                                {ev.metric}
                              </span>
                            )}
                            {ev.href && (
                              <a
                                href={ev.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-6 h-6 rounded-md flex items-center justify-center text-[#6B4226] hover:bg-[#6B4226]/10 transition-colors"
                                aria-label="View project"
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border-2 border-dashed border-[#B8A99A]/40 p-8 flex flex-col items-center justify-center text-center h-full min-h-[260px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#B8A99A]/20 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#B8A99A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                  </div>
                  <p className="font-heading font-semibold text-[#1A1A1A] text-sm">
                    Click any skill on the chart
                  </p>
                  <p className="mt-1.5 text-xs text-[#4A4A4A]/60 max-w-[200px]">
                    See a description and real evidence for that skill area
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
