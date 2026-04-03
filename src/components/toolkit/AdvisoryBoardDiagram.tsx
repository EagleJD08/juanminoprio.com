import { motion } from 'framer-motion';

const personas = [
  { icon: '📋', name: 'COS', label: 'Chief of Staff', desc: 'Accountability mirror. Cross-domain patterns.', desc_es: 'Espejo de responsabilidad. Patrones entre dominios.' },
  { icon: '🎯', name: 'PM', label: 'Product Manager', desc: 'Prioritization. Dependencies. North star.', desc_es: 'Priorización. Dependencias. Estrella del norte.' },
  { icon: '⚡', name: 'CTO', label: 'Chief Technology Officer', desc: 'Innovation. Automation. Tech leverage.', desc_es: 'Innovación. Automatización. Ventaja tecnológica.' },
  { icon: '📢', name: 'CMO', label: 'Chief Marketing Officer', desc: 'Audience-first. Positioning. Content.', desc_es: 'Audiencia primero. Posicionamiento. Contenido.' },
  { icon: '🧪', name: 'CPO', label: 'Chief Product Officer', desc: 'Product-market fit. Jobs to be done.', desc_es: 'Product-market fit. Trabajos por hacer.' },
  { icon: '🔥', name: 'Challenge', label: 'Independent Director', desc: "Devil's advocate. Pre-mortems. Stress-testing.", desc_es: 'Abogado del diablo. Pre-mortems. Pruebas de estrés.' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function AdvisoryBoardDiagram() {
  return (
    <div className="bg-white border border-sand/30 rounded-2xl p-8 md:p-10 shadow-sm">
      {/* Decision input */}
      <div className="text-center mb-8">
        <span className="inline-block bg-navy text-white px-6 py-2.5 rounded-xl text-sm font-heading font-semibold">
          <span data-lang-en>Your Decision</span>
          <span data-lang-es>Tu Decisión</span>
        </span>
      </div>

      {/* Personas grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        {personas.map((p) => (
          <motion.div
            key={p.name}
            variants={item}
            className="text-center p-5 bg-cream rounded-xl hover:bg-sand/10 transition-colors duration-200"
          >
            <div className="text-3xl mb-2">{p.icon}</div>
            <div className="text-sm font-heading font-bold text-navy">{p.name}</div>
            <div className="text-[10px] text-slate/60 mt-0.5">{p.label}</div>
            <div className="text-xs text-slate mt-2 leading-relaxed">
              <span data-lang-en>{p.desc}</span>
              <span data-lang-es>{p.desc_es}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Flow arrow + result */}
      <div className="text-center mt-8">
        <div className="text-2xl text-sand mb-3">↓</div>
        <span className="inline-block bg-sage/10 text-sage px-6 py-2.5 rounded-xl text-sm font-heading font-semibold">
          <span data-lang-en>Informed Decision</span>
          <span data-lang-es>Decisión Informada</span>
        </span>
      </div>
    </div>
  );
}
