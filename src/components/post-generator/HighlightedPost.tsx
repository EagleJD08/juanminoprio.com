import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { Highlight } from "@lib/post-generator/types";

interface Props {
  fullContent: string;
  highlights: Highlight[];
}

// Map highlight types to Tailwind background classes
const HIGHLIGHT_STYLES: Record<Highlight["type"], { bg: string; bgHover: string; border: string }> = {
  hook: {
    bg: "bg-terracotta/15",
    bgHover: "hover:bg-terracotta/25",
    border: "border-terracotta",
  },
  stepps: {
    bg: "bg-sage/15",
    bgHover: "hover:bg-sage/25",
    border: "border-sage",
  },
  cta: {
    bg: "bg-dusty-blue/15",
    bgHover: "hover:bg-dusty-blue/25",
    border: "border-dusty-blue",
  },
};

const TOOLTIP_LABEL_COLORS: Record<Highlight["type"], string> = {
  hook: "text-terracotta",
  stepps: "text-sage",
  cta: "text-dusty-blue",
};

interface TextSegment {
  text: string;
  highlight: Highlight | null;
}

/**
 * Split fullContent into segments, some of which are highlighted.
 * Finds each highlight's text as a substring and wraps it.
 * If a highlight text isn't found (AI hallucination), it's skipped gracefully.
 */
function buildSegments(fullContent: string, highlights: Highlight[]): TextSegment[] {
  // Find all highlight positions
  const positions: Array<{ start: number; end: number; highlight: Highlight }> = [];

  for (const hl of highlights) {
    const index = fullContent.indexOf(hl.text);
    if (index === -1) continue; // Skip highlights that don't match — graceful degradation
    positions.push({ start: index, end: index + hl.text.length, highlight: hl });
  }

  // Sort by start position
  positions.sort((a, b) => a.start - b.start);

  // Remove overlapping highlights (keep the first one)
  const filtered: typeof positions = [];
  let lastEnd = 0;
  for (const pos of positions) {
    if (pos.start >= lastEnd) {
      filtered.push(pos);
      lastEnd = pos.end;
    }
  }

  // Build segments
  const segments: TextSegment[] = [];
  let cursor = 0;

  for (const pos of filtered) {
    // Add plain text before this highlight
    if (cursor < pos.start) {
      segments.push({ text: fullContent.slice(cursor, pos.start), highlight: null });
    }
    // Add highlighted text
    segments.push({ text: fullContent.slice(pos.start, pos.end), highlight: pos.highlight });
    cursor = pos.end;
  }

  // Add remaining plain text
  if (cursor < fullContent.length) {
    segments.push({ text: fullContent.slice(cursor), highlight: null });
  }

  return segments;
}

export default function HighlightedPost({ fullContent, highlights }: Props) {
  const [activeHighlight, setActiveHighlight] = useState<Highlight | null>(null);

  const segments = useMemo(
    () => buildSegments(fullContent, highlights),
    [fullContent, highlights]
  );

  const handleHighlightClick = useCallback(
    (highlight: Highlight) => {
      setActiveHighlight((prev) =>
        prev && prev.text === highlight.text ? null : highlight
      );
    },
    []
  );

  const handleClose = useCallback(() => {
    setActiveHighlight(null);
  }, []);

  return (
    <div className="text-navy leading-relaxed font-body whitespace-pre-line">
      {segments.map((segment, i) => {
        if (!segment.highlight) {
          return <span key={i}>{segment.text}</span>;
        }

        const hl = segment.highlight;
        const style = HIGHLIGHT_STYLES[hl.type];
        const isActive = activeHighlight?.text === hl.text;

        return (
          <span key={i} className="relative inline">
            <span
              onClick={() => handleHighlightClick(hl)}
              className={`${style.bg} ${style.bgHover} cursor-pointer rounded-sm px-0.5 transition-colors ${
                isActive ? "ring-1 ring-offset-1 " + style.border.replace("border-", "ring-") : ""
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleHighlightClick(hl);
                }
              }}
              aria-expanded={isActive}
              aria-label={`${hl.label} — click to ${isActive ? "hide" : "show"} explanation`}
            >
              {segment.text}
            </span>

            {/* Tooltip */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`block mt-2 mb-2 p-4 bg-white rounded-lg border-l-4 ${style.border} shadow-md`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${TOOLTIP_LABEL_COLORS[hl.type]}`}
                    >
                      {hl.label}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClose();
                      }}
                      className="p-0.5 rounded hover:bg-sand/20 transition-colors"
                      aria-label="Close explanation"
                    >
                      <X className="w-3.5 h-3.5 text-sand" />
                    </button>
                  </div>
                  <p className="text-sm text-slate mt-1.5 leading-relaxed">
                    {hl.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </span>
        );
      })}
    </div>
  );
}
