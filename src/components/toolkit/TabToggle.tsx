import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TabToggle() {
  const [active, setActive] = useState<'built' | 'curated'>('built');

  const handleClick = (tab: 'built' | 'curated') => {
    setActive(tab);
    window.dispatchEvent(new CustomEvent('toolkit-tab-change', { detail: tab }));
  };

  return (
    <div className="flex justify-center">
      <div className="inline-flex bg-navy/[0.04] rounded-xl p-1 gap-0.5">
        {(['built', 'curated'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`relative px-6 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 cursor-pointer ${
              active === tab
                ? 'text-navy'
                : 'text-slate hover:text-navy'
            }`}
          >
            {active === tab && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">
              <span data-lang-en>{tab === 'built' ? 'Built by Me' : 'Curated'}</span>
              <span data-lang-es>{tab === 'built' ? 'Creado por Mí' : 'Seleccionados'}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
