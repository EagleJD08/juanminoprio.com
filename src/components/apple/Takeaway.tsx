import { motion } from "framer-motion";
import { KEY_TAKEAWAYS, YOY_METRICS } from "@lib/apple-data";
import FlywheelDiagram from "./FlywheelDiagram";

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
        <div className="mb-14">
          <FlywheelDiagram />
        </div>

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
            Data:{" "}
            <a
              href="https://investor.apple.com/sec-filings/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#86868B] hover:text-white transition-colors"
            >
              Apple FY2025 10-K
            </a>
            ,{" "}
            <a
              href="https://www.apple.com/newsroom/2026/01/apple-reports-first-quarter-results/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#86868B] hover:text-white transition-colors"
            >
              Q1 FY2026 Earnings Release
            </a>
            ,{" "}
            <a
              href="https://www.apple.com/newsroom/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#86868B] hover:text-white transition-colors"
            >
              Apple Newsroom
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
