import { Scissors, Zap, User } from "lucide-react";
import type { RefineAction } from "@lib/post-generator/types";

interface Props {
  onRefine: (action: RefineAction) => void;
  isRefining: boolean;
  refineCount: number;
  maxRefines: number;
}

const REFINE_OPTIONS: {
  action: RefineAction;
  label: string;
  icon: typeof Scissors;
}[] = [
  { action: "shorter", label: "Shorter & punchier", icon: Scissors },
  { action: "hook", label: "Strengthen the hook", icon: Zap },
  { action: "personal", label: "Add a personal angle", icon: User },
];

export default function RefineBar({
  onRefine,
  isRefining,
  refineCount,
  maxRefines,
}: Props) {
  const canRefine = refineCount < maxRefines;

  if (!canRefine && !isRefining) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-slate mr-1">Refine:</span>
      {REFINE_OPTIONS.map(({ action, label, icon: Icon }) => (
        <button
          key={action}
          onClick={() => onRefine(action)}
          disabled={isRefining || !canRefine}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-sand/15 border border-sand/30 rounded-full hover:bg-terracotta/10 hover:border-terracotta/30 hover:text-terracotta transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon className="w-3 h-3" />
          {label}
        </button>
      ))}
      {isRefining && (
        <span className="text-xs text-terracotta animate-pulse">
          Refining...
        </span>
      )}
      {!isRefining && canRefine && (
        <span className="text-xs text-sand">
          {refineCount}/{maxRefines} used
        </span>
      )}
    </div>
  );
}
