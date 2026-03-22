import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const PLACEHOLDER_EXAMPLES = [
  "AI changing how marketers work",
  "a leadership lesson I learned the hard way",
  "why most startups fail at marketing",
  "the future of content creation",
  "what I learned from analyzing 100 LinkedIn posts",
];

interface Props {
  onSubmit: (topic: string) => void;
}

export default function TopicInput({ onSubmit }: Props) {
  const [topic, setTopic] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim().length > 0) {
      onSubmit(topic.trim());
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-heading text-5xl md:text-6xl font-bold text-navy mb-4">
        LinkedIn Post Generator
      </h1>
      <p className="text-lg text-slate mb-12 max-w-lg">
        Turn any idea into a LinkedIn post — and learn why it works.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <div className="relative">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={PLACEHOLDER_EXAMPLES[placeholderIndex]}
            className="w-full px-6 py-4 text-lg bg-white border-2 border-sand/60 rounded-xl focus:outline-none focus:border-terracotta transition-colors placeholder:text-sand"
            autoFocus
          />
          <button
            type="submit"
            disabled={topic.trim().length === 0}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-terracotta text-cream disabled:opacity-30 disabled:cursor-not-allowed hover:bg-terracotta/90 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <p className="text-sm text-sand mt-3">
          What do you want to post about?
        </p>
      </form>
    </div>
  );
}
