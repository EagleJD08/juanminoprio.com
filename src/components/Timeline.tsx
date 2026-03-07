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
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#FAF6F1] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#D4C5B2]/50 border border-[#D4C5B2] p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-[#1B2A4A]/30 font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-[#1B2A4A]/30 font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
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
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[#D4C5B2]/40 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#C4654A] via-[#6B8CAE] to-transparent from-[0%] via-[10%] rounded-full"
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
              <h4 className="text-xl md:text-2xl font-semibold text-[#1B2A4A] font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
                Marketing Specialist
              </h4>
              <p className="text-[#C4654A] font-medium text-sm mt-1">
                Charles Schwab · Full-time
              </p>
              <p className="text-[#6B7B8D]/60 text-xs mt-0.5">
                Jun 2025 – Present · Austin, Texas
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A9E7E]/10 text-[#7A9E7E] text-xs font-medium whitespace-nowrap self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A9E7E] animate-pulse"></span>
              Current
            </span>
          </div>
          <p className="text-[#6B7B8D] text-sm md:text-base leading-relaxed max-w-xl mb-4">
            Marketing Rotational Program — Advisor Services Marketing. Working on campaigns that reach millions of investors and advisors across the country.
          </p>
          <ul className="text-[#6B7B8D] text-sm leading-relaxed max-w-xl mb-6 space-y-2">
            <li className="flex gap-2">
              <span className="text-[#C4654A] flex-shrink-0">•</span>
              Exceeded expectations by building 96 additional communications and sending 54 more through compliance review than targeted
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4654A] flex-shrink-0">•</span>
              Reduced average campaign turnaround time by 42%
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4654A] flex-shrink-0">•</span>
              Partnered with sales directors and Bank & Lending SMEs to expand data analysis capabilities
            </li>
          </ul>
          <div className="flex flex-wrap gap-2">
            {[
              "Financial Marketing",
              "Email Marketing",
              "Marketing Automation",
              "Campaign Management",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-[#FAF6F1] border border-[#D4C5B2]/40 text-xs font-medium text-[#6B7B8D]"
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <div>
              <h4 className="text-xl md:text-2xl font-semibold text-[#1B2A4A] font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
                Content Marketing
              </h4>
              <p className="text-[#C4654A] font-medium text-sm mt-1">
                The Profit Lab · Part-time
              </p>
              <p className="text-[#6B7B8D]/60 text-xs mt-0.5">
                Oct 2022 – Jun 2025 · 2 yrs 9 mos · Miami, Florida
              </p>
            </div>
          </div>
          <ul className="text-[#6B7B8D] text-sm leading-relaxed max-w-xl mb-6 space-y-2">
            <li className="flex gap-2">
              <span className="text-[#C4654A] flex-shrink-0">•</span>
              Developed and executed organic short-form content strategy for Instagram Reels, TikTok, and YouTube Shorts — 12 clips/month
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4654A] flex-shrink-0">•</span>
              Designed and launched segmented email marketing programs via MailChimp, HubSpot, and GoHighLevel
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4654A] flex-shrink-0">•</span>
              Planned and optimized paid campaigns across Microsoft Ads, Facebook Ads, and Google Ads — 2.8% CTR increase
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4654A] flex-shrink-0">•</span>
              Managed website and CRM — A/B tests on landing pages, improved lead capture and qualification
            </li>
            <li className="flex gap-2">
              <span className="text-[#C4654A] flex-shrink-0">•</span>
              Built partnerships with respected voices in business-coaching space for co-created promotions
            </li>
          </ul>
          <div className="flex flex-wrap gap-2">
            {[
              "Paid Media",
              "Content Strategy",
              "A/B Testing",
              "Email Marketing",
              "Influencer Marketing",
            ].map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-[#FAF6F1] border border-[#D4C5B2]/40 text-xs font-medium text-[#6B7B8D]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <div className="space-y-6">
          {/* FIU */}
          <div>
            <h4 className="text-xl md:text-2xl font-semibold text-[#1B2A4A] font-[Plus_Jakarta_Sans,system-ui,sans-serif]">
              Florida International University
            </h4>
            <p className="text-[#C4654A] font-medium text-sm mt-1">
              College of Business
            </p>
            <p className="text-[#6B7B8D] text-sm mt-2">
              Bachelor of Business Administration — Marketing
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4A84B]/10 text-[#D4A84B] text-xs font-medium">
                GPA: 3.93
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7A9E7E]/10 text-[#7A9E7E] text-xs font-medium">
                Dean's List
              </span>
            </div>
            <p className="text-[#6B7B8D]/60 text-xs mt-3">
              Activities: ALPFA, BOLD FIU, AMA (American Marketing Association)
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Certifications",
      content: (
        <div className="space-y-3">
          <h4 className="text-xl md:text-2xl font-semibold text-[#1B2A4A] font-[Plus_Jakarta_Sans,system-ui,sans-serif] mb-4">
            Licenses & Certifications
          </h4>
          {[
            { name: "Google Analytics Certification", issuer: "Google Digital Academy" },
            { name: "AT&T Marketing Externship", issuer: "Paragon One" },
            { name: "Responsive Web Design", issuer: "freeCodeCamp" },
          ].map((cert) => (
            <div key={cert.name} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-[#7A9E7E]/20">
              <div className="w-9 h-9 rounded-lg bg-[#7A9E7E]/10 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-4 h-4 text-[#7A9E7E]"
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
                <p className="text-sm font-semibold text-[#1B2A4A]">{cert.name}</p>
                <p className="text-xs text-[#7A9E7E] font-medium">{cert.issuer}</p>
              </div>
            </div>
          ))}
          {/* Additional certs summary */}
          <p className="text-xs text-[#6B7B8D]/50 mt-2 pl-1">
            + Adobe Creative Suite (Illustrator, Photoshop, InDesign), Hootsuite Platform & Social Marketing
          </p>

          {/* Core Skills */}
          <div className="mt-6 pt-6 border-t border-[#D4C5B2]/30">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#1B2A4A]/50 mb-3">
              Core Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Financial Services Marketing",
                "Campaign Management",
                "Marketing Analytics",
                "Paid Media Advertising",
                "Email Marketing",
                "B2B Marketing",
                "Marketing Automation",
                "A/B Testing",
                "Product Marketing",
                "Cross-functional Coordination",
                "Bilingual EN/ES",
                "Photography",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#D4C5B2]/40 text-xs font-medium text-[#6B7B8D] hover:border-[#C4654A]/30 hover:text-[#1B2A4A] transition-all duration-200 cursor-default"
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
