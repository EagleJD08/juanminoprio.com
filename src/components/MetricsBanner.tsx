import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@lib/hooks";

interface Metric {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  decimals?: number;
}

const METRICS: Metric[] = [
  {
    prefix: "",
    value: 10,
    suffix: "M+",
    label: "Impressions Driven",
    sublabel: "Schwab campaigns reaching investors & advisors",
    decimals: 1,
  },
  {
    prefix: "",
    value: 42,
    suffix: "%",
    label: "Faster Content Output",
    sublabel: "AI-assisted workflows vs. traditional production",
  },
  {
    prefix: "",
    value: 3,
    suffix: "",
    label: "Interactive Projects",
    sublabel: "Data dashboards live in portfolio",
  },
  {
    prefix: "$",
    value: 440,
    suffix: "B+",
    label: "Revenue Analyzed",
    sublabel: "Apple + Schwab financial models built",
  },
];

function MetricItem({ metric, inView }: { metric: Metric; inView: boolean }) {
  const raw = useCountUp(metric.value * (metric.decimals ? 10 : 1), 1800, inView);
  const display = metric.decimals
    ? (raw / 10).toFixed(metric.decimals)
    : raw.toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center text-center px-4 py-6"
    >
      <span className="font-heading font-bold text-navy leading-none"
        style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}>
        {metric.prefix}
        {display}
        {metric.suffix}
      </span>
      <span className="mt-3 font-heading font-semibold text-sm md:text-base text-navy/80 leading-snug">
        {metric.label}
      </span>
      <span className="mt-1 text-xs text-slate max-w-[160px] leading-snug">
        {metric.sublabel}
      </span>
    </motion.div>
  );
}

export default function MetricsBanner() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Key results"
      className="py-16 md:py-20 bg-navy relative overflow-hidden"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #FAFAFA 0%, transparent 60%), radial-gradient(circle at 80% 50%, #FAFAFA 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="font-body text-xs font-medium tracking-widest uppercase text-terracotta">
            Results
          </span>
          <h2 className="mt-2 font-heading font-bold text-cream text-2xl md:text-3xl">
            What I've shipped.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-cream/10 rounded-2xl overflow-hidden">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="bg-navy"
            >
              <MetricItem metric={metric} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
