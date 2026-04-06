import { useEffect, useRef, useState } from "react";

interface Metric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

const metrics: Metric[] = [
  {
    value: 10.2,
    suffix: "M",
    label: "Impressions driven",
    sublabel: "Schwab campaigns reaching investors & advisors",
  },
  {
    value: 42,
    suffix: "%",
    label: "Faster turnaround",
    sublabel: "AI-assisted content workflows vs. manual",
  },
  {
    value: 4,
    suffix: "",
    label: "Interactive projects",
    sublabel: "Data dashboards shipped and live",
  },
  {
    value: 3,
    suffix: "+",
    label: "Years in the industry",
    sublabel: "Agency + in-house enterprise marketing",
  },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();
    const isDecimal = !Number.isInteger(target);

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [start, target, duration]);

  return count;
}

function MetricCard({ metric, index, inView }: { metric: Metric; index: number; inView: boolean }) {
  const count = useCountUp(metric.value, 1400, inView);
  const displayValue = Number.isInteger(metric.value) ? count : (count as number).toFixed(1);

  return (
    <div
      className="reveal text-center px-4 py-8"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="font-heading font-bold text-navy" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}>
        {metric.prefix && <span>{metric.prefix}</span>}
        <span>{displayValue}</span>
        <span className="text-terracotta">{metric.suffix}</span>
      </div>
      <p className="mt-2 font-heading font-semibold text-navy/80 text-base md:text-lg">
        {metric.label}
      </p>
      <p className="mt-1 text-sm text-slate max-w-[200px] mx-auto leading-snug">
        {metric.sublabel}
      </p>
    </div>
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-navy relative overflow-hidden"
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, white 40px, white 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, white 40px, white 41px)",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="reveal text-center mb-12">
          <span className="font-body text-xs font-medium tracking-widest uppercase text-terracotta">
            By the numbers
          </span>
          <h2
            className="mt-3 font-heading font-bold text-cream"
            style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 3rem)" }}
          >
            Results I've driven.
          </h2>
        </div>

        <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/10">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
