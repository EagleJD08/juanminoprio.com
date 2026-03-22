import { useState, useEffect } from "react";

interface ProgressIndicatorProps {
  totalChapters: number;
}

export default function ProgressIndicator({ totalChapters }: ProgressIndicatorProps) {
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-chapter]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-chapter"));
            if (!isNaN(idx)) setActiveChapter(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2">
      {Array.from({ length: totalChapters }).map((_, i) => (
        <button
          key={i}
          onClick={() => {
            const el = document.querySelector(`[data-chapter="${i}"]`);
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
            i === activeChapter
              ? "bg-slate-navy scale-125"
              : "bg-mushroom hover:bg-charcoal"
          }`}
          aria-label={`Go to chapter ${i}`}
        />
      ))}
    </div>
  );
}
