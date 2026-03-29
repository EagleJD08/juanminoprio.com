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
              className="block bg-white rounded-xl border border-sand/30 p-4 hover:border-terracotta/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">
                  {TYPE_ICONS[resource.type]}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-heading font-semibold text-navy group-hover:text-terracotta transition-colors">
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
            {growthResources.slice(0, 2).map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-dusty-blue/5 rounded-xl border border-dusty-blue/15 p-4 hover:border-dusty-blue/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">
                    {TYPE_ICONS[resource.type]}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-heading font-semibold text-navy group-hover:text-dusty-blue transition-colors">
                        {resource.title}
                      </span>
                      {resource.author && (
                        <span className="text-xs text-slate/50">
                          by {resource.author}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate/70 mt-1 leading-relaxed">
                      {resource.description}
                    </p>
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
