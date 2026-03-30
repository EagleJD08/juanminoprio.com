"use client";
import { cn } from "../lib/utils";
import { Brain, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { Language } from "../i18n/strings";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  iconBgClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-[#7A9E7E]" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "",
  titleClassName = "text-[#2C4A6E]",
  iconBgClassName = "bg-[#2C4A6E]/15",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-[#B8A99A]/40 bg-white/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-white after:to-transparent after:content-[''] hover:border-[#B8A99A]/70 hover:bg-white/90 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span
          className={cn(
            "relative inline-block rounded-full p-1",
            iconBgClassName
          )}
        >
          {icon}
        </span>
        <p className={cn("text-lg font-semibold", titleClassName)}>{title}</p>
      </div>
      <p className="text-base text-[#1A1A1A]/80 leading-snug">
        {description}
      </p>
      <p className="text-[#4A4A4A] text-sm">{date}</p>
    </div>
  );
}

const cardData: Record<Language, DisplayCardProps[]> = {
  en: [
    {
      icon: <Brain className="size-4 text-[#6B4226]" />,
      title: "Consumer Psychology",
      description: "Why people buy, share, and stay loyal",
      date: "Deep Vertical",
      iconBgClassName: "bg-[#6B4226]/15",
      titleClassName: "text-[#6B4226]",
    },
    {
      icon: <Sparkles className="size-4 text-[#7A9E7E]" />,
      title: "AI for Marketing",
      description: "Real workflows and systems, not hype",
      date: "Applied AI",
      iconBgClassName: "bg-[#7A9E7E]/15",
      titleClassName: "text-[#7A9E7E]",
    },
    {
      icon: <TrendingUp className="size-4 text-[#2C4A6E]" />,
      title: "Business & Marketing",
      description: "Revenue stories and brand value",
      date: "Strategy",
      iconBgClassName: "bg-[#2C4A6E]/15",
      titleClassName: "text-[#2C4A6E]",
    },
  ],
  es: [
    {
      icon: <Brain className="size-4 text-[#6B4226]" />,
      title: "Psicolog\u00eda del Consumidor",
      description: "Por qu\u00e9 la gente compra, comparte y es leal",
      date: "Vertical Profunda",
      iconBgClassName: "bg-[#6B4226]/15",
      titleClassName: "text-[#6B4226]",
    },
    {
      icon: <Sparkles className="size-4 text-[#7A9E7E]" />,
      title: "IA para Marketing",
      description: "Flujos de trabajo reales, no hype",
      date: "IA Aplicada",
      iconBgClassName: "bg-[#7A9E7E]/15",
      titleClassName: "text-[#7A9E7E]",
    },
    {
      icon: <TrendingUp className="size-4 text-[#2C4A6E]" />,
      title: "Negocios & Marketing",
      description: "Historias de ingresos y valor de marca",
      date: "Estrategia",
      iconBgClassName: "bg-[#2C4A6E]/15",
      titleClassName: "text-[#2C4A6E]",
    },
  ],
};

const cardClassNames = [
  "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#B8A99A]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#FAFAFA]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#B8A99A]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#FAFAFA]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
];

export default function DisplayCards() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof document !== "undefined") {
      return (document.documentElement.getAttribute("data-lang") as Language) || "en";
    }
    return "en";
  });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.lang) setLang(detail.lang);
    };
    window.addEventListener("languagechange", handler);
    return () => window.removeEventListener("languagechange", handler);
  }, []);

  const cards = cardData[lang];

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100">
      {cards.map((cardProps, index) => (
        <DisplayCard key={`${lang}-${index}`} className={cardClassNames[index]} {...cardProps} />
      ))}
    </div>
  );
}
