import { motion } from "framer-motion";
import type { MarketerTypeId } from "../../lib/quiz/types";
import { MARKETER_TYPE_INFO } from "../../lib/quiz/types";
import { RESOURCES } from "../../lib/quiz/resources";

interface QuizResourcesProps {
  primaryType: MarketerTypeId;
  growthArea: MarketerTypeId;
}

const TYPE_ICONS: Record<string, string> = {
  book: "\u{1F4D6}",
  course: "\u{1F393}",
  tool: "\u{1F6E0}",
  podcast: "\u{1F399}",
  newsletter: "\u{1F4EC}",
  youtube: "\u25B6\uFE0F",
  community: "\u{1F465}",
};

const TYPE_CTAS: Record<string, string> = {
  book: "Start reading",
  course: "Start learning",
  tool: "Try it out",
  podcast: "Start listening",
  newsletter: "Subscribe",
  youtube: "Watch now",
  community: "Join the community",
};

export default function QuizResources({ primaryType, growthArea }: QuizResourcesProps) {
  const primaryResources = RESOURCES[primaryType] ?? [];
  const growthResources = RESOURCES[growthArea] ?? [];
  const primaryInfo = MARKETER_TYPE_INFO[primaryType];
  const growthInfo = MARKETER_TYPE_INFO[growthArea];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <h3 className="font-heading text-xl font-bold text-navy mb-6">
        Level Up Your Skills
      </h3>

      {/* Primary type resources */}
      <div className="mb-8">
        <h4 className="font-heading font-semibold text-navy text-sm uppercase tracking-wider mb-3">
          Deepen your strength &mdash; {primaryInfo.name}
        </h4>
        <div className="space-y-3">
          {primaryResources.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl border-2 border-sand/30 p-4 hover:border-terracotta/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">
                  {TYPE_ICONS[resource.type]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-heading font-semibold text-navy underline decoration-terracotta/30 underline-offset-2 group-hover:decoration-terracotta transition-colors">
                      {resource.title}
                    </span>
                    {resource.author && (
                      <span className="text-xs text-slate/50">
                        by {resource.author}
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-wider text-slate/40 font-medium px-1.5 py-0.5 bg-sand/10 rounded">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate/70 mt-1 leading-relaxed">
                    {resource.description}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-terracotta group-hover:gap-2 transition-all duration-200">
                    {TYPE_CTAS[resource.type] ?? "Check it out"}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Growth area resources */}
      {growthArea !== primaryType && (
        <div>
          <h4 className="font-heading font-semibold text-dusty-blue text-sm uppercase tracking-wider mb-3">
            Close your gap &mdash; {growthInfo.name}
          </h4>
          <div className="space-y-3">
            {growthResources.slice(0, 3).map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-dusty-blue/5 rounded-xl border-2 border-dusty-blue/15 p-4 hover:border-dusty-blue/40 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">
                    {TYPE_ICONS[resource.type]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-heading font-semibold text-navy underline decoration-dusty-blue/30 underline-offset-2 group-hover:decoration-dusty-blue transition-colors">
                        {resource.title}
                      </span>
                      {resource.author && (
                        <span className="text-xs text-slate/50">
                          by {resource.author}
                        </span>
                      )}
                      <span className="text-[10px] uppercase tracking-wider text-slate/40 font-medium px-1.5 py-0.5 bg-sand/10 rounded">
                        {resource.type}
                      </span>
                    </div>
                    <p className="text-sm text-slate/70 mt-1 leading-relaxed">
                      {resource.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-dusty-blue group-hover:gap-2 transition-all duration-200">
                      {TYPE_CTAS[resource.type] ?? "Check it out"}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
