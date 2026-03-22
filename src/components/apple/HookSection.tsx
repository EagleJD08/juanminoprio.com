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
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: "#1D1D1F" }}
    >
      {/* Apple logo — large, semi-transparent, behind content */}
      <motion.svg
        className="absolute pointer-events-none select-none"
        style={{ width: "40vw", maxWidth: 500, height: "auto", opacity: 0.04 }}
        viewBox="0 0 814 1000"
        fill="white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8-62.2 0-106.9-56.3-155.5-125.9-56.8-81.2-102.4-207.6-102.4-328.3 0-193 125.5-295.5 248.8-295.5 65.5 0 120.1 43 161.2 43 39.5 0 101.1-45.6 176.1-45.6 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55 83.6-55 135.5 0 7.8.6 15.7 1.3 18.2 2.6.6 6.4 1.3 10.2 1.3 45.4 0 103.4-30.4 139.4-71.4z" />
      </motion.svg>

      <motion.div
        ref={ref}
        className="text-center max-w-3xl relative z-10"
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
