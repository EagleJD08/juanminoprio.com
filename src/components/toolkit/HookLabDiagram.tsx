import { motion } from 'framer-motion';

const juryPersonas = [
  { icon: '👔', name: 'The Executive', desc: 'C-suite perspective' },
  { icon: '📊', name: 'The Analyst', desc: 'Data-driven evaluation' },
  { icon: '🎨', name: 'The Creative', desc: 'Storytelling instinct' },
  { icon: '🎯', name: 'The Marketer', desc: 'Audience psychology' },
  { icon: '🤔', name: 'The Skeptic', desc: 'Devil\'s advocate' },
];

const scoringDimensions = [
  'Scroll-Stop Power',
  'Curiosity Gap',
  'Specificity',
  'Emotional Pull',
  'Brand Alignment',
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function HookLabDiagram() {
  return (
    <div className="bg-white border border-sand/30 rounded-2xl p-8 md:p-10 shadow-sm">

      {/* Step 1: Input */}
      <div className="text-center mb-6">
        <span className="inline-block bg-navy text-white px-6 py-2.5 rounded-xl text-sm font-heading font-semibold">
          <span data-lang-en>Your Hook</span>
          <span data-lang-es>Tu Hook</span>
        </span>
      </div>

      <div className="text-center text-2xl text-sand mb-6">↓</div>

      {/* Step 2: 20 Variations */}
      <div className="text-center mb-6">
        <div className="inline-block bg-terracotta/10 rounded-xl px-6 py-4">
          <div className="text-sm font-heading font-bold text-terracotta">
            <span data-lang-en>20 Variations Generated</span>
            <span data-lang-es>20 Variaciones Generadas</span>
          </div>
          <div className="text-xs text-terracotta/70 mt-1">
            <span data-lang-en>8 mutation strategies applied</span>
            <span data-lang-es>8 estrategias de mutación aplicadas</span>
          </div>
        </div>
      </div>

      <div className="text-center text-2xl text-sand mb-6">↓</div>

      {/* Step 3: Jury Panel */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        {juryPersonas.map((p) => (
          <motion.div
            key={p.name}
            variants={item}
            className="text-center p-3 bg-cream rounded-xl"
          >
            <div className="text-2xl mb-1">{p.icon}</div>
            <div className="text-[11px] font-heading font-bold text-navy leading-tight">{p.name}</div>
            <div className="text-[9px] text-slate/60 mt-0.5">{p.desc}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center text-2xl text-sand mb-6">↓</div>

      {/* Step 4: Scoring Dimensions */}
      <div className="text-center mb-6">
        <div className="inline-flex flex-wrap justify-center gap-2">
          {scoringDimensions.map((dim) => (
            <span
              key={dim}
              className="text-[10px] font-medium bg-dusty-blue/10 text-dusty-blue px-3 py-1 rounded-full"
            >
              {dim}
            </span>
          ))}
        </div>
      </div>

      <div className="text-center text-2xl text-sand mb-6">↓</div>

      {/* Step 5: Result */}
      <div className="text-center">
        <span className="inline-block bg-sage/10 text-sage px-6 py-2.5 rounded-xl text-sm font-heading font-semibold">
          <span data-lang-en>Top 10 Ranked Hooks</span>
          <span data-lang-es>Top 10 Hooks Clasificados</span>
        </span>
      </div>
    </div>
  );
}
