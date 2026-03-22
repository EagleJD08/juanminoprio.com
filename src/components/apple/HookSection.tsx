import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@lib/hooks";
import { ChevronDown } from "lucide-react";

export default function HookSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(4162, 2000, inView);

  return (
    <section
      data-chapter={0}
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#1D1D1F" }}
    >
      <motion.div
        ref={ref}
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          One Ecosystem.<br />Five Revenue Streams.
        </h1>

        <div className="mt-6">
          <span
            className="text-white text-5xl md:text-7xl lg:text-8xl font-extrabold tabular-nums"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            ${(count / 10).toFixed(1)}B
          </span>
        </div>

        <p className="text-[#86868B] text-sm mt-4 uppercase tracking-widest">
          Total Revenue · FY2025
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-[#86868B]"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
