import { motion } from "framer-motion";

export default function ClosingSection() {
  return (
    <section className="px-6 py-20 md:py-28 max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs sm:text-sm font-medium tracking-widest uppercase text-charcoal mb-6">
          The Point
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-rich-black leading-tight">
          Every report deserves this treatment.
        </h2>
        <p className="mt-6 text-base md:text-lg text-rich-black/70 font-body max-w-xl mx-auto leading-relaxed">
          This started as a 200-page government PDF. Same data, completely different
          experience. The BLS didn't change their numbers — I changed how they're presented.
          AI handles the heavy lifting. Design does the rest. That's the skill: taking what
          matters and making people actually want to engage with it.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://www.bls.gov/cex/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rich-black text-snow text-sm font-medium hover:bg-cocoa transition-colors duration-200"
          >
            See the raw BLS data
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
          <a
            href="/#portfolio"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-mushroom text-rich-black text-sm font-medium hover:bg-rich-black hover:text-snow hover:border-rich-black transition-all duration-200"
          >
            More projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
