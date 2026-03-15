import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Insight {
  stat: string;
  description: string;
  color: string;
  bgColor: string;
  emoji: string;
  label: string;
}

const insights: Insight[] = [
  {
    stat: "2.1x",
    description: "75+ households spend 2.1x the national average on reading materials — the biggest generational gap in any category.",
    color: "#2C4A6E",
    bgColor: "rgba(44, 74, 110, 0.1)",
    emoji: "📚",
    label: "Reading",
  },
  {
    stat: "$378 vs $265",
    description: "The lowest income quintile spends more on tobacco than the highest earners. One of the few categories where spending goes down as income goes up.",
    color: "#6B4226",
    bgColor: "rgba(107, 66, 38, 0.1)",
    emoji: "🚬",
    label: "Tobacco",
  },
  {
    stat: "3x",
    description: "Top earners spend 3x more on entertainment than the bottom quintile — $5,193 vs $1,723 per year.",
    color: "#1A1A1A",
    bgColor: "rgba(26, 26, 26, 0.07)",
    emoji: "🎭",
    label: "Entertainment",
  },
  {
    stat: "$8,145",
    description: "75+ households spend the most on healthcare — nearly 5x what under-25s spend. It becomes their #2 expense after housing.",
    color: "#4A4A4A",
    bgColor: "rgba(74, 74, 74, 0.1)",
    emoji: "🏥",
    label: "Healthcare",
  },
];

function AnimatedStat({ stat, color, bgColor, emoji }: { stat: string; color: string; bgColor: string; emoji: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [displayed, setDisplayed] = useState(stat);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;

    const match = stat.match(/^\$?([\d,]+)/);
    if (!match) {
      setDisplayed(stat);
      return;
    }

    const target = parseInt(match[1].replace(/,/g, ""), 10);
    const prefix = stat.startsWith("$") ? "$" : "";
    const suffix = stat.slice(match[0].length);
    const steps = 40;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.min(Math.round(increment * step), target);
      const formatted = current.toLocaleString("en-US");
      setDisplayed(`${prefix}${formatted}${suffix}`);
      if (step >= steps) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [visible, stat]);

  return (
    <div
      ref={ref}
      className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xl md:text-2xl font-heading font-bold"
      style={{ backgroundColor: bgColor, color }}
    >
      <span className="text-lg">{emoji}</span>
      {displayed}
    </div>
  );
}

export default function InsightCards() {
  return (
    <section className="px-6 py-16 md:py-24 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-rich-black mb-2">
          The Weird Stuff
        </h2>
        <p className="text-charcoal text-base md:text-lg mb-8">
          Patterns you won't find in the executive summary
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-xl border border-mushroom/60 p-6 hover-lift group"
            >
              <div className="flex items-start justify-between mb-4">
                <AnimatedStat
                  stat={insight.stat}
                  color={insight.color}
                  bgColor={insight.bgColor}
                  emoji={insight.emoji}
                />
                <span
                  className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded-full"
                  style={{ backgroundColor: insight.bgColor, color: insight.color }}
                >
                  {insight.label}
                </span>
              </div>
              <p className="text-rich-black/80 text-sm leading-relaxed">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
