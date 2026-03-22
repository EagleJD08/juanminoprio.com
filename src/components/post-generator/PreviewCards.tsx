import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { DisplayPost } from "@lib/post-generator/types";

interface Props {
  posts: DisplayPost[];
  onSelect: (index: number) => void;
  onStartOver: () => void;
}

const ACCENT_COLORS = [
  {
    border: "border-terracotta",
    hoverBorder: "hover:border-terracotta",
    badge: "bg-terracotta/10 text-terracotta",
  },
  {
    border: "border-dusty-blue",
    hoverBorder: "hover:border-dusty-blue",
    badge: "bg-dusty-blue/10 text-dusty-blue",
  },
  {
    border: "border-sage",
    hoverBorder: "hover:border-sage",
    badge: "bg-sage/10 text-sage",
  },
];

export default function PreviewCards({ posts, onSelect, onStartOver }: Props) {
  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-2">
          3 Post Ideas
        </h2>
        <p className="text-slate">
          Each uses a different hook and structure. Click one to see the full
          post and learn why it works.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post, i) => (
          <motion.button
            key={i}
            onClick={() => onSelect(i)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className={`text-left p-6 bg-white rounded-xl border-2 border-sand/40 ${ACCENT_COLORS[i].hoverBorder} hover:shadow-lg transition-all cursor-pointer group`}
          >
            {/* Hook formula badge */}
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${ACCENT_COLORS[i].badge}`}
            >
              {post.hookFormulaName}
            </span>

            {/* Hook line preview */}
            <p className="font-body text-navy font-medium leading-relaxed mb-4 line-clamp-3">
              {post.hookLine}
            </p>

            {/* Structure + STEPPS */}
            <div className="flex items-center justify-between text-xs text-slate">
              <span>{post.structureDisplayName}</span>
              <span
                className={`px-2 py-0.5 rounded-full ${ACCENT_COLORS[i].badge}`}
              >
                {post.stepps.total}/6 STEPPS
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={onStartOver}
          className="inline-flex items-center gap-2 text-sm text-slate hover:text-navy transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Start over with a new topic
        </button>
      </div>
    </div>
  );
}
