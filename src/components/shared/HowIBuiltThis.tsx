import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, Cpu, Database, Lightbulb, TrendingUp, Wrench } from "lucide-react";

export interface BuildSection {
  icon: "data" | "approach" | "design" | "ai" | "lessons";
  title: string;
  items: string[];
}

export interface HowIBuiltThisProps {
  timeToBuild: string;
  aiTools: string[];
  dataSources: string[];
  sections: BuildSection[];
}

const iconMap = {
  data: Database,
  approach: TrendingUp,
  design: Wrench,
  ai: Cpu,
  lessons: Lightbulb,
};

function Section({ section }: { section: BuildSection }) {
  const Icon = iconMap[section.icon];
  return (
    <div className="bg-snow rounded-lg border border-mist p-5">
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-7 h-7 rounded-md bg-slate-navy/10 flex items-center justify-center shrink-0">
          <Icon size={14} className="text-slate-navy" />
        </div>
        <h4 className="font-heading font-semibold text-rich-black text-sm">{section.title}</h4>
      </div>
      <ul className="space-y-1.5">
        {section.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-charcoal leading-snug">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-navy/40 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HowIBuiltThis({ timeToBuild, aiTools, dataSources, sections }: HowIBuiltThisProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full group flex items-center justify-between gap-4 px-6 py-4 rounded-xl border border-mushroom bg-snow hover:border-slate-navy/30 hover:bg-mist transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-navy/10 flex items-center justify-center shrink-0">
            <Wrench size={15} className="text-slate-navy" />
          </div>
          <span className="font-heading font-semibold text-rich-black text-sm md:text-base">
            How I Built This
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-charcoal/60 font-body">
            <Clock size={11} />
            {timeToBuild}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={18} className="text-slate-navy/60 group-hover:text-slate-navy transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="mt-4 space-y-4">
              {/* Quick stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-snow rounded-lg border border-mist p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={13} className="text-slate-navy" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-navy">Time to build</span>
                  </div>
                  <p className="text-sm text-charcoal">{timeToBuild}</p>
                </div>
                <div className="bg-snow rounded-lg border border-mist p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu size={13} className="text-slate-navy" />
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-navy">AI tools used</span>
                  </div>
                  <p className="text-sm text-charcoal">{aiTools.join(", ")}</p>
                </div>
              </div>

              {/* Data sources */}
              <div className="bg-snow rounded-lg border border-mist p-5">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 rounded-md bg-slate-navy/10 flex items-center justify-center shrink-0">
                    <Database size={14} className="text-slate-navy" />
                  </div>
                  <h4 className="font-heading font-semibold text-rich-black text-sm">Data sources</h4>
                </div>
                <ul className="space-y-1.5">
                  {dataSources.map((src) => (
                    <li key={src} className="flex items-start gap-2 text-sm text-charcoal leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-navy/40 shrink-0" />
                      {src}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sections.map((section) => (
                  <Section key={section.title} section={section} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
