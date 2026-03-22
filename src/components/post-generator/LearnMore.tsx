import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface Props {
  hookExamples: string[];
  structureNotes: string[];
}

export default function LearnMore({ hookExamples, structureNotes }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-cream/50 rounded-xl border border-sand/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-sm font-medium text-navy">
          Learn more about these frameworks
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate" />
        )}
      </button>

      {isOpen && (
        <div className="px-5 pb-5 space-y-4">
          {/* Hook examples */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta mb-2">
              More hook examples
            </h4>
            <ul className="space-y-1">
              {hookExamples.map((ex, i) => (
                <li key={i} className="text-sm text-slate italic">
                  "{ex}"
                </li>
              ))}
            </ul>
          </div>

          {/* Structure tips */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-dusty-blue mb-2">
              Structure tips
            </h4>
            <ul className="space-y-1">
              {structureNotes.map((note, i) => (
                <li key={i} className="text-sm text-slate">
                  → {note}
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div className="pt-3 border-t border-sand/30">
            <p className="text-xs text-sand">
              This methodology is based on Jonah Berger's STEPPS framework and
              proven LinkedIn content patterns.
            </p>
            <p className="text-xs text-sand mt-1">
              Built by{" "}
              <a
                href="https://www.linkedin.com/in/juanminoprio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta hover:underline inline-flex items-center gap-1"
              >
                Juan Minoprio
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
