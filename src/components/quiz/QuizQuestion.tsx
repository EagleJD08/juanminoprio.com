import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion as QuizQuestionType } from "../../lib/quiz/types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  onBack: () => void;
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onBack,
}: QuizQuestionProps) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate/60 font-medium">
            {questionIndex + 1} of {totalQuestions}
          </span>
          {questionIndex > 0 && (
            <button
              onClick={onBack}
              className="text-sm text-slate/60 hover:text-navy transition-colors cursor-pointer flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
        </div>
        <div className="h-1.5 bg-sand/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-terracotta rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-8 leading-snug">
            {question.scenario}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                  selectedAnswer === i
                    ? "border-terracotta bg-terracotta/5"
                    : "border-sand/30 hover:border-sand hover:bg-cream/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      selectedAnswer === i
                        ? "bg-terracotta text-white"
                        : "bg-sand/20 text-slate group-hover:bg-sand/40"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-navy font-medium leading-relaxed">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
