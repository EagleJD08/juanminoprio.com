"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-32 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#FAFAFA] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#B8A99A]/50 border border-[#B8A99A] p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-[#1A1A1A]/30 font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-[#1A1A1A]/30 font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[#B8A99A]/40 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#6B4226] via-[#2C4A6E] to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

/* Pre-built Resume Timeline with Juan's data */
export default function ResumeTimeline() {
  const timelineData: TimelineEntry[] = [
    {
      title: "Current",
      content: (
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
                Marketing Professional
              </h4>
              <p className="text-[#6B4226] font-medium text-sm mt-1">
                Charles Schwab
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A9E7E]/10 text-[#7A9E7E] text-xs font-medium whitespace-nowrap self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A9E7E] animate-pulse"></span>
              Current
            </span>
          </div>
          <p className="text-[#4A4A4A] text-sm md:text-base leading-relaxed max-w-xl mb-6">
            Operating at the intersection of finance, product, and marketing
            inside one of the nation's largest financial institutions. Bridging
            data analysis with storytelling to drive strategy.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Marketing Strategy",
              "Data Visualization",
              "Financial Analysis",
              "Campaign Architecture",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#B8A99A]/40 text-xs font-medium text-[#4A4A4A]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Experience",
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-semibold text-[#1A1A1A]/50 font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
            Previous Roles
          </h4>
          <p className="text-[#4A4A4A]/60 text-sm md:text-base mt-2">
            Details coming soon.
          </p>
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <div>
          <h4 className="text-xl md:text-2xl font-semibold text-[#1A1A1A]/50 font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
            Education
          </h4>
          <p className="text-[#4A4A4A]/60 text-sm md:text-base mt-2">
            Details coming soon.
          </p>
        </div>
      ),
    },
    {
      title: "Certifications",
      content: (
        <div className="space-y-3">
          <h4 className="text-xl md:text-2xl font-semibold text-[#1A1A1A] font-[Plus_Jakarta_Sans,system-ui,sans-serif] mb-4">
            Licenses & Certifications
          </h4>
          {/* SIE - In Progress */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#D4A84B]/20">
            <div className="w-9 h-9 rounded-lg bg-[#D4A84B]/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-[#D4A84B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">SIE Exam</p>
              <p className="text-xs text-[#D4A84B] font-medium">In Progress</p>
            </div>
          </div>
          {/* Series 63 */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 border border-[#B8A99A]/30">
            <div className="w-9 h-9 rounded-lg bg-[#B8A99A]/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-[#4A4A4A]/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]/50">
                Series 63
              </p>
              <p className="text-xs text-[#4A4A4A]/50">Planned</p>
            </div>
          </div>
          {/* Series 7 */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/60 border border-[#B8A99A]/30">
            <div className="w-9 h-9 rounded-lg bg-[#B8A99A]/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-[#4A4A4A]/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#1A1A1A]/50">Series 7</p>
              <p className="text-xs text-[#4A4A4A]/50">Future</p>
            </div>
          </div>

          {/* Core Skills */}
          <div className="mt-6 pt-6 border-t border-[#B8A99A]/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/50 mb-3">
              Core Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Marketing Strategy",
                "Data Visualization",
                "Financial Analysis",
                "AI Workflows",
                "Consumer Psychology",
                "Content Strategy",
                "Campaign Analysis",
                "Product Thinking",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#B8A99A]/40 text-xs font-medium text-[#4A4A4A] hover:border-[#6B4226]/30 hover:text-[#1A1A1A] transition-all duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={timelineData} />;
}
