import { motion } from "framer-motion";
import { YOY_METRICS } from "@lib/schwab-data";

const TAKEAWAYS = [
  {
    number: "01",
    title: "A Bank in Disguise",
    description:
      "49% of revenue comes from net interest — lending your cash deposits. Schwab isn't primarily a brokerage. It's a bank that offers one.",
    accent: "#2C4A6E",
  },
  {
    number: "02",
    title: "Scale Creates Billions",
    description:
      "$11.9 trillion in assets means even a 0.05% fee generates $6.5B. Scale is the moat.",
    accent: "#6B4226",
  },
  {
    number: "03",
    title: "The Flywheel",
    description:
      "Free trades attract clients \u2192 clients bring assets \u2192 assets earn interest \u2192 more revenue \u2192 better platform \u2192 more clients. The loop compounds.",
    accent: "#4A4A4A",
  },
];

export default function Takeaway() {
  return (
    <section data-chapter={6} className="bg-linen py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-charcoal mb-3">
            Chapter 06 — The Takeaway
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black">
            What This Tells Us
          </h2>
        </motion.div>

        {/* Insight cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {TAKEAWAYS.map((t, i) => (
            <motion.div
              key={t.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="bg-snow rounded-lg border border-mushroom p-6 relative overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 w-full h-[3px]"
                style={{ background: t.accent }}
              />
              <p className="text-xs font-medium tracking-widest text-mushroom mb-3">
                {t.number}
              </p>
              <h3 className="font-heading font-bold text-lg text-rich-black mb-2">
                {t.title}
              </h3>
              <p className="text-sm text-charcoal leading-relaxed">
                {t.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* YoY Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-xs font-medium tracking-[0.15em] uppercase text-charcoal text-center mb-5">
            2024 &rarr; 2025 Year-Over-Year
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {YOY_METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="bg-snow rounded-lg border border-mushroom p-4 text-center"
              >
                <p className="font-heading text-2xl font-bold text-rich-black">
                  {m.value}
                </p>
                {m.yoyChange && (
                  <p className="text-sm font-semibold text-emerald-600 mt-1">
                    {m.yoyChange}
                  </p>
                )}
                {m.subtext && (
                  <p className="text-xs text-charcoal mt-1">{m.subtext}</p>
                )}
                <p className="text-[11px] text-mushroom mt-1">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Attribution */}
        <div className="mt-14 text-center space-y-2">
          <p className="text-xs text-charcoal/60">
            Data: Charles Schwab Corporation FY2025 10-K Annual Report. All
            figures from public filings.
          </p>
          <p className="text-sm text-charcoal">
            Built by{" "}
            <a
              href="/"
              className="text-slate-navy font-medium hover:underline"
            >
              Juan Minoprio
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
