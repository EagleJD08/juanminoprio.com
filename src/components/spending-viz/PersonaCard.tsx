import { motion } from "framer-motion";
import type { Persona } from "@lib/persona-data";
import PersonaFace from "./PersonaFace";
import BrandConstellation from "./BrandConstellation";

interface PersonaCardProps {
  persona: Persona;
}

export default function PersonaCard({ persona }: PersonaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl border border-mushroom/60 overflow-hidden"
    >
      {/* Header with larger face */}
      <div className="bg-rich-black px-6 py-6 md:py-8">
        <div className="flex items-center gap-5">
          <PersonaFace
            ageGroupId={persona.ageGroupId}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 overflow-hidden shrink-0 ring-2 ring-white/20"
          />
          <div>
            <h3 className="font-heading font-bold text-snow text-xl md:text-2xl">
              {persona.archetype}
            </h3>
            <p className="text-snow/70 text-sm md:text-base font-accent italic mt-1">
              {persona.tagline}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Lifestyle traits */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-charcoal mb-3">
            Lifestyle Snapshot
          </h4>
          <ul className="space-y-2">
            {persona.lifestyle.map((trait, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="flex items-start gap-2.5 text-sm text-rich-black/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cocoa mt-1.5 shrink-0" />
                {trait}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Brand constellation */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-charcoal mb-2">
            Brand Universe
          </h4>
          <p className="text-xs text-charcoal/60 mb-3">
            Hover over a brand to learn more
          </p>
          <BrandConstellation
            brands={persona.topBrands}
            accentColor="#6B4226"
            faceImageSrc={`/projects/spending-viz/faces/${persona.ageGroupId}.png`}
          />
        </div>

        {/* Spending insight */}
        <div className="bg-linen rounded-xl px-4 py-3 border border-mushroom/40">
          <p className="text-xs font-medium uppercase tracking-widest text-charcoal mb-1">
            Key Spending Insight
          </p>
          <p className="text-sm text-rich-black/80 leading-relaxed">
            {persona.spendingInsight}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
