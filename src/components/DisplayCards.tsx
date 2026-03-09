"use client";
import { cn } from "../lib/utils";
import { BarChart3, Megaphone, Sparkles } from "lucide-react";

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
  titleClassName = "text-[#6B8CAE]",
  iconBgClassName = "bg-[#6B8CAE]/15",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-[#D4C5B2]/40 bg-white/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-white after:to-transparent after:content-[''] hover:border-[#D4C5B2]/70 hover:bg-white/90 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
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
      <p className="text-base text-[#1B2A4A]/80 leading-snug">
        {description}
      </p>
      <p className="text-[#6B7B8D] text-sm">{date}</p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#D4C5B2]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#FAF6F1]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      icon: <BarChart3 className="size-4 text-[#6B8CAE]" />,
      title: "Business & Finance",
      description: "Revenue models & competitive dynamics",
      date: "Pillar 1",
      iconBgClassName: "bg-[#6B8CAE]/15",
      titleClassName: "text-[#6B8CAE]",
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-[#D4C5B2]/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-[#FAF6F1]/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
      icon: <Megaphone className="size-4 text-[#C4654A]" />,
      title: "Marketing & Psychology",
      description: "Consumer behavior & campaign strategy",
      date: "Pillar 2",
      iconBgClassName: "bg-[#C4654A]/15",
      titleClassName: "text-[#C4654A]",
    },
    {
      className:
        "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
      icon: <Sparkles className="size-4 text-[#7A9E7E]" />,
      title: "AI & Productivity",
      description: "Real workflows & practical systems",
      date: "Pillar 3",
      iconBgClassName: "bg-[#7A9E7E]/15",
      titleClassName: "text-[#7A9E7E]",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
