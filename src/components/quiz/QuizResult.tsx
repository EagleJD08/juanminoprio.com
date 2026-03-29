import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { MARKETER_TYPE_INFO, MARKETER_TYPES } from "../../lib/quiz/types";
import type { QuizResult as QuizResultType, MarketerTypeId } from "../../lib/quiz/types";
import QuizResources from "./QuizResources";
import ShareCard from "./ShareCard";

interface QuizResultProps {
  result: QuizResultType;
  resultId: string | null;
  onRetake: () => void;
}

export default function QuizResult({ result, resultId, onRetake }: QuizResultProps) {
  const primary = MARKETER_TYPE_INFO[result.primaryType];
  const growthArea = MARKETER_TYPE_INFO[result.growthArea];

  const radarData = MARKETER_TYPES.map((typeId) => ({
    type: MARKETER_TYPE_INFO[typeId].name.replace("The ", ""),
    score: result.scores.normalized[typeId] ?? 0,
  }));

  // Top 3 strengths (sorted by score, excluding primary since it's shown separately)
  const topStrengths = [...MARKETER_TYPES]
    .sort((a, b) => (result.scores.raw[b] ?? 0) - (result.scores.raw[a] ?? 0))
    .slice(0, 3);

  const shareUrl = resultId
    ? `${window.location.origin}/tools/marketer-quiz?r=${resultId}`
    : null;

  const shareText = `I'm "${primary.name}" — ${primary.tagline}. Take the free marketing quiz to discover your type!`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      {/* Primary Type */}
      <div className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-terracotta/10 text-terracotta rounded-full mb-4"
        >
          Your Marketing Archetype
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-4xl md:text-5xl font-bold text-navy mb-3"
        >
          {primary.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-accent italic text-terracotta text-lg mb-6"
        >
          {primary.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate max-w-xl mx-auto leading-relaxed"
        >
          {primary.description}
        </motion.p>
      </div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-sand/30 p-6 mb-8"
      >
        <h3 className="font-heading font-semibold text-navy text-center mb-4">
          Your Marketing DNA
        </h3>
        <div className="w-full h-[350px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#B8A99A" strokeOpacity={0.3} />
              <PolarAngleAxis
                dataKey="type"
                tick={{ fontSize: 11, fill: "#4A4A4A" }}
              />
              <Radar
                dataKey="score"
                stroke="#6B4226"
                fill="#6B4226"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-3 gap-4 mb-8"
      >
        {topStrengths.map((typeId, i) => {
          const info = MARKETER_TYPE_INFO[typeId];
          return (
            <div
              key={typeId}
              className="bg-white rounded-xl border border-sand/30 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-terracotta">
                  #{i + 1}
                </span>
                <span className="font-heading font-semibold text-navy text-sm">
                  {info.name.replace("The ", "")}
                </span>
              </div>
              <div className="h-1.5 bg-sand/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-terracotta rounded-full transition-all duration-500"
                  style={{ width: `${result.scores.normalized[typeId]}%` }}
                />
              </div>
              <span className="text-xs text-slate/60 mt-1 block">
                {result.scores.normalized[typeId]}%
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Growth Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-dusty-blue/5 rounded-xl border border-dusty-blue/20 p-5 mb-8"
      >
        <h3 className="font-heading font-semibold text-dusty-blue text-sm uppercase tracking-wider mb-2">
          Your Growth Area
        </h3>
        <p className="font-heading font-semibold text-navy mb-1">
          {growthArea.name}
        </p>
        <p className="text-slate text-sm">{growthArea.growthTip}</p>
      </motion.div>

      {/* Resources */}
      <QuizResources
        primaryType={result.primaryType}
        growthArea={result.growthArea}
      />

      {/* Share + Download */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-10 pt-8 border-t border-sand/30"
      >
        <h3 className="font-heading font-semibold text-navy text-center mb-6">
          Share Your Result
        </h3>

        <ShareCard result={result} />

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {shareUrl && (
            <>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] text-white text-sm font-semibold rounded-lg hover:bg-[#006097] transition-colors"
              >
                Share on LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/80 transition-colors"
              >
                Share on X
              </a>
            </>
          )}
          <button
            onClick={() => {
              if (shareUrl) {
                navigator.clipboard.writeText(shareUrl);
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sand/20 text-navy text-sm font-semibold rounded-lg hover:bg-sand/30 transition-colors cursor-pointer"
          >
            Copy Link
          </button>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onRetake}
            className="text-sm text-slate/60 hover:text-terracotta transition-colors underline underline-offset-4 cursor-pointer"
          >
            Retake the quiz
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
