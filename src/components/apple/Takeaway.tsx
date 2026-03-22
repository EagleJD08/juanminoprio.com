import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { KEY_TAKEAWAYS, YOY_METRICS } from "@lib/apple-data";

const FLYWHEEL_NODES = [
  { label: "Hardware", sub: "Devices" },
  { label: "Installed Base", sub: "2.5B" },
  { label: "Services", sub: "$109.2B" },
  { label: "Profit", sub: "$112B" },
  { label: "R&D", sub: "$34.6B" },
];

export default function Takeaway() {
  return (
    <section
      data-chapter={8}
      className="w-full py-20 md:py-28 px-6"
      style={{ backgroundColor: "#1D1D1F" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#86868B] mb-3">
            Chapter 08 — The Flywheel
          </p>
          <h2
            className="text-white text-2xl md:text-4xl font-extrabold leading-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            The Takeaway
          </h2>
        </motion.div>

        {/* 3 takeaway cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {KEY_TAKEAWAYS.map((item, i) => (
            <motion.div
              key={item.title}
              className="bg-[#2C2C2E] rounded-xl p-6 overflow-hidden relative"
              style={{ borderTop: `3px solid ${item.accent}` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3 className="text-white text-base font-bold mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-[#86868B] text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Flywheel */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-center text-xs font-medium tracking-[0.15em] uppercase text-[#86868B] mb-6">
            The Apple Flywheel
          </p>
          {/* Desktop: horizontal row */}
          <div className="hidden sm:flex items-center justify-center gap-0 flex-wrap">
            {FLYWHEEL_NODES.map((node, i) => (
              <div key={node.label} className="flex items-center">
                <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-[#2C2C2E] min-w-[90px]">
                  <span className="text-white text-xs font-semibold text-center leading-tight">
                    {node.label}
                  </span>
                  <span className="text-[#86868B] text-[10px] mt-0.5 text-center">
                    {node.sub}
                  </span>
                </div>
                {i < FLYWHEEL_NODES.length - 1 && (
                  <ArrowRight size={14} className="text-[#86868B] mx-1 flex-shrink-0" />
                )}
                {i === FLYWHEEL_NODES.length - 1 && (
                  <div className="flex items-center ml-1">
                    <ArrowRight size={14} className="text-[#007AFF] flex-shrink-0" />
                    <span className="text-[#007AFF] text-[10px] ml-1 font-medium">back to Hardware</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Mobile: vertical list */}
          <div className="flex sm:hidden flex-col items-center gap-1">
            {FLYWHEEL_NODES.map((node, i) => (
              <div key={node.label} className="flex flex-col items-center">
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-lg bg-[#2C2C2E] w-48">
                  <div>
                    <p className="text-white text-xs font-semibold">{node.label}</p>
                    <p className="text-[#86868B] text-[10px]">{node.sub}</p>
                  </div>
                </div>
                {i < FLYWHEEL_NODES.length - 1 && (
                  <div className="w-px h-3 bg-[#3A3A3C]" />
                )}
              </div>
            ))}
            <div className="w-px h-3 bg-[#007AFF]" />
            <span className="text-[#007AFF] text-[10px] font-medium">back to Hardware</span>
          </div>
        </motion.div>

        {/* YoY metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {YOY_METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="bg-[#2C2C2E] rounded-xl p-5 text-center"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className="text-2xl font-extrabold text-[#34C759] mb-1"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {metric.value}
              </p>
              <p className="text-white text-xs font-semibold">{metric.label}</p>
              <p className="text-[#86868B] text-[10px] mt-0.5">{metric.subtext}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="text-center border-t border-[#3A3A3C] pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-white text-sm font-semibold mb-2">Built by Juan Minoprio</p>
          <p className="text-[#86868B] text-xs leading-relaxed">
            Data: Apple FY2025 10-K, Q1 FY2026 Earnings Release, Apple Newsroom
          </p>
        </motion.div>
      </div>
    </section>
  );
}
