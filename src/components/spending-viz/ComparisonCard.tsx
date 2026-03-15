import { motion } from "framer-motion";
import { formatCurrency, formatPercent, formatDelta } from "@lib/utils";
import { getCategoryById } from "@lib/spending-data";

interface ComparisonCardProps {
  categoryId: string;
  nationalAmount: number;
  groupAmount: number;
  index: number;
}

export default function ComparisonCard({ categoryId, nationalAmount, groupAmount, index }: ComparisonCardProps) {
  const category = getCategoryById(categoryId);
  if (!category) return null;

  const { amount: deltaAmount, percent: deltaPercent } = formatDelta(nationalAmount, groupAmount);
  const isMore = deltaAmount > 0;
  const isEqual = deltaAmount === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="bg-white rounded-xl border border-mushroom/60 p-5 hover-lift"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full shrink-0"
            style={{ backgroundColor: category.color }}
          />
          <h3 className="font-heading font-semibold text-rich-black text-sm leading-tight">
            {category.name}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-charcoal uppercase tracking-wide">National</p>
          <p className="text-rich-black font-medium text-lg">{formatCurrency(nationalAmount)}</p>
        </div>
        <div>
          <p className="text-xs text-charcoal uppercase tracking-wide">Your Group</p>
          <p className="text-rich-black font-medium text-lg">{formatCurrency(groupAmount)}</p>
        </div>
      </div>

      {!isEqual && (
        <div
          className="rounded-lg px-3 py-2 text-sm font-medium text-center"
          style={{
            backgroundColor: isMore ? "rgba(107, 66, 38, 0.08)" : "rgba(44, 74, 110, 0.08)",
            color: isMore ? "#6B4226" : "#2C4A6E",
          }}
        >
          {isMore ? "+" : ""}
          {formatCurrency(deltaAmount)} ({formatPercent(deltaPercent)})
        </div>
      )}
    </motion.div>
  );
}
