import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { Goal } from "@lib/post-generator/types";
import { GOALS } from "@lib/post-generator/types";

interface Props {
  topic: string;
  onSubmit: (goal: Goal, angle: string) => void;
  onBack: () => void;
}

export default function ContextForm({ topic, onSubmit, onBack }: Props) {
  const [goal, setGoal] = useState<Goal>("thought-leadership");
  const [angle, setAngle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(goal, angle.trim());
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <button
        onClick={onBack}
        className="self-start mb-8 flex items-center gap-2 text-sm text-slate hover:text-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="text-center mb-10">
        <p className="text-sm text-terracotta font-medium mb-2">
          Posting about
        </p>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy">
          {topic}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        {/* Goal dropdown */}
        <div>
          <label
            htmlFor="goal"
            className="block text-sm font-medium text-navy mb-2"
          >
            What's your goal?
          </label>
          <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full px-4 py-3 bg-white border-2 border-sand/60 rounded-xl focus:outline-none focus:border-terracotta transition-colors text-navy"
          >
            {GOALS.map((g) => (
              <option key={g.id} value={g.id}>
                {g.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-sand mt-1">
            {GOALS.find((g) => g.id === goal)?.description}
          </p>
        </div>

        {/* Unique angle */}
        <div>
          <label
            htmlFor="angle"
            className="block text-sm font-medium text-navy mb-2"
          >
            What's your unique angle?
          </label>
          <input
            id="angle"
            type="text"
            value={angle}
            onChange={(e) => setAngle(e.target.value)}
            placeholder="What do you know about this that most people don't?"
            className="w-full px-4 py-3 bg-white border-2 border-sand/60 rounded-xl focus:outline-none focus:border-terracotta transition-colors placeholder:text-sand"
          />
          <p className="text-xs text-sand mt-1">
            Optional — but posts with a unique perspective perform better.
          </p>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-terracotta text-cream font-heading font-semibold rounded-xl hover:bg-terracotta/90 transition-colors"
        >
          <Sparkles className="w-5 h-5" />
          Create Posts
        </button>
      </form>
    </div>
  );
}
