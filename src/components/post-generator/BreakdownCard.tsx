import { motion } from "framer-motion";
import type { SourcedStat } from "@lib/post-generator/types";

interface Props {
  label: string;
  sublabel: string;
  borderColor: string; // Tailwind border class, e.g., "border-terracotta"
  labelColor: string; // Tailwind text class, e.g., "text-terracotta"
  children: React.ReactNode;
  stat?: SourcedStat;
}

export default function BreakdownCard({
  label,
  sublabel,
  borderColor,
  labelColor,
  children,
  stat,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-5 bg-white rounded-xl border-l-4 ${borderColor}`}
    >
      <div className={`text-xs font-bold uppercase tracking-wider ${labelColor} mb-1`}>
        {label}
      </div>
      <div className="text-sm font-medium text-navy mb-3">{sublabel}</div>
      <div className="text-sm text-slate leading-relaxed">{children}</div>

      {stat && (
        <div className="mt-4 pt-3 border-t border-sand/30">
          <p className="text-xs text-slate">
            <span className="font-medium">{stat.value}</span> — {stat.stat}
          </p>
          <p className="text-[10px] text-sand mt-1">
            Source: {stat.source} ({stat.year})
          </p>
        </div>
      )}
    </motion.div>
  );
}
