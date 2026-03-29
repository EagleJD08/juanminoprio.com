import { useState, useCallback, useEffect } from "react";
import type { QuizScreen, QuizResult as QuizResultType } from "../../lib/quiz/types";
import { QUIZ_QUESTIONS } from "../../lib/quiz/questions";
import { calculateScores, getResult } from "../../lib/quiz/scoring";
import QuizLanding from "./QuizLanding";
import QuizQuestion from "./QuizQuestion";
import QuizAnalyzing from "./QuizAnalyzing";
import QuizResult from "./QuizResult";

export default function QuizApp() {
  const [screen, setScreen] = useState<QuizScreen>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [resultId, setResultId] = useState<string | null>(null);

  // Check for shared result URL on mount
  const [sharedResult, setSharedResult] = useState<QuizResultType | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rId = params.get("r");
    if (rId) {
      fetch(`/api/quiz-result/${rId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.resultType && data.scores && data.answers) {
            const scores = {
              raw: data.scores,
              normalized: (() => {
                const max = Math.max(...Object.values(data.scores as Record<string, number>));
                const norm: Record<string, number> = {};
                for (const [k, v] of Object.entries(data.scores as Record<string, number>)) {
                  norm[k] = max === 0 ? 0 : Math.round((v / max) * 100);
                }
                return norm;
              })(),
            };
            setSharedResult({
              primaryType: data.resultType,
              secondaryType: "",
              growthArea: "",
              scores: scores as any,
              answers: data.answers,
            });
            setResultId(rId);
            setScreen("result");
          }
        })
        .catch(() => {
          // Invalid share URL — show landing
        });
    }
  }, []);

  const handleStart = useCallback(() => {
    setScreen("question");
    setCurrentQuestion(0);
    setAnswers([]);
  }, []);

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answerIndex;
      setAnswers(newAnswers);

      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Last question — go to analyzing
        setScreen("analyzing");

        // Calculate scores
        const scores = calculateScores(newAnswers, QUIZ_QUESTIONS);
        const quizResult = getResult(scores, newAnswers);
        setResult(quizResult);

        // Fire-and-forget save to D1
        fetch("/api/quiz-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resultType: quizResult.primaryType,
            scores: quizResult.scores.raw,
            answers: quizResult.answers,
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.resultId) setResultId(data.resultId);
          })
          .catch(() => {
            // D1 save failed — non-blocking
          });

        // Show analyzing for 2.5s then reveal result
        setTimeout(() => setScreen("result"), 2500);
      }
    },
    [answers, currentQuestion]
  );

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const handleRetake = useCallback(() => {
    setScreen("landing");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setResultId(null);
    setSharedResult(null);
    // Clean URL params
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const activeResult = sharedResult || result;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      {screen === "landing" && <QuizLanding onStart={handleStart} />}

      {screen === "question" && (
        <QuizQuestion
          question={QUIZ_QUESTIONS[currentQuestion]}
          questionIndex={currentQuestion}
          totalQuestions={QUIZ_QUESTIONS.length}
          selectedAnswer={answers[currentQuestion] ?? null}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}

      {screen === "analyzing" && <QuizAnalyzing />}

      {screen === "result" && activeResult && (
        <QuizResult
          result={activeResult}
          resultId={resultId}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
}
