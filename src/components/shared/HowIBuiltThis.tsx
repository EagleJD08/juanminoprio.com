import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Cpu, Database, Palette, Lightbulb, BarChart2 } from "lucide-react";

export interface HowIBuiltThisProps {
  timeToBuild: string;
  aiTools: string[];
  dataSources: string[];
  analyticalApproach: string;
  designDecisions: string;
  lessonsLearned: string;
  theme?: "dark" | "light";
}

export default function HowIBuiltThis({
  timeToBuild,
  aiTools,
  dataSources,
  analyticalApproach,
  designDecisions,
  lessonsLearned,
  theme = "dark",
}: HowIBuiltThisProps) {
  const [open, setOpen] = useState(false);

  const isDark = theme === "dark";

  const colors = {
    bg: isDark ? "#1D1D1F" : "#FAFAFA",
    border: isDark ? "#3A3A3C" : "#D9CFC8",
    headerBg: isDark ? "#2C2C2E" : "#F5F0EB",
    headerText: isDark ? "#FAFAFA" : "#1A1A1A",
    subText: isDark ? "#86868B" : "#6B6B6B",
    labelText: isDark ? "#FAFAFA" : "#1A1A1A",
    bodyText: isDark ? "#D1D1D6" : "#4A4A4A",
    chipBg: isDark ? "#3A3A3C" : "#EDE8E3",
    chipText: isDark ? "#D1D1D6" : "#4A4A4A",
    accentBg: isDark ? "#2C3A4E" : "#E8EDF3",
    accentText: isDark ? "#6BA3D6" : "#2C4A6E",
    sectionBg: isDark ? "#2C2C2E" : "#FFFFFF",
  };

  return (
    <div
      style={{
        borderTop: `1px solid ${colors.border}`,
        backgroundColor: colors.bg,
      }}
      className="w-full"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="how-i-built-this-content"
        className="w-full flex items-center justify-between gap-4 px-6 md:px-12 py-6 text-left transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        style={{
          backgroundColor: colors.headerBg,
          color: colors.headerText,
          focusVisibleRingColor: isDark ? "#FAFAFA" : "#6B4226",
        }}
      >
        <div className="flex items-center gap-3">
          <BarChart2
            className="w-4 h-4 shrink-0"
            style={{ color: isDark ? "#86868B" : "#6B4226" }}
          />
          <span
            className="font-heading font-semibold text-sm tracking-wide"
            style={{ color: colors.headerText }}
          >
            How I Built This
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown
            className="w-4 h-4 shrink-0"
            style={{ color: colors.subText }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="how-i-built-this-content"
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 md:px-12 py-10 max-w-6xl mx-auto">
              {/* Quick-stats row */}
              <div className="flex flex-wrap gap-3 mb-10">
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                  style={{ backgroundColor: colors.chipBg, color: colors.chipText }}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    <span className="opacity-60 mr-1">Time to build:</span>
                    {timeToBuild}
                  </span>
                </div>
                {aiTools.map((tool) => (
                  <div
                    key={tool}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                    style={{ backgroundColor: colors.accentBg, color: colors.accentText }}
                  >
                    <Cpu className="w-3.5 h-3.5" />
                    {tool}
                  </div>
                ))}
              </div>

              {/* Three-column detail grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Data Sources */}
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.border}` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-3.5 h-3.5" style={{ color: isDark ? "#86868B" : "#6B4226" }} />
                    <span
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: colors.subText }}
                    >
                      Data Sources
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {dataSources.map((src) => (
                      <li
                        key={src}
                        className="text-sm leading-snug"
                        style={{ color: colors.bodyText }}
                      >
                        · {src}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Analytical Approach */}
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.border}` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BarChart2 className="w-3.5 h-3.5" style={{ color: isDark ? "#86868B" : "#6B4226" }} />
                    <span
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: colors.subText }}
                    >
                      Analytical Approach
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: colors.bodyText }}>
                    {analyticalApproach}
                  </p>
                </div>

                {/* Design Decisions */}
                <div
                  className="rounded-xl p-5"
                  style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.border}` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Palette className="w-3.5 h-3.5" style={{ color: isDark ? "#86868B" : "#6B4226" }} />
                    <span
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: colors.subText }}
                    >
                      Design Decisions
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: colors.bodyText }}>
                    {designDecisions}
                  </p>
                </div>
              </div>

              {/* Lessons learned — full width */}
              <div
                className="rounded-xl p-5"
                style={{ backgroundColor: colors.sectionBg, border: `1px solid ${colors.border}` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-3.5 h-3.5" style={{ color: isDark ? "#86868B" : "#6B4226" }} />
                  <span
                    className="text-xs font-semibold tracking-widest uppercase"
                    style={{ color: colors.subText }}
                  >
                    Lessons Learned
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: colors.bodyText }}>
                  {lessonsLearned}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
