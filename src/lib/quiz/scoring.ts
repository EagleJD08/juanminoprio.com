import type { QuizQuestion, QuizScores, QuizResult, MarketerTypeId } from "./types";
import { MARKETER_TYPES } from "./types";

export function calculateScores(
  answers: number[],
  questions: QuizQuestion[]
): QuizScores {
  const raw = Object.fromEntries(
    MARKETER_TYPES.map((t) => [t, 0])
  ) as Record<MarketerTypeId, number>;

  for (let i = 0; i < answers.length; i++) {
    const question = questions[i];
    if (!question) continue;
    const selectedOption = question.options[answers[i]];
    if (!selectedOption) continue;

    for (const [typeId, weight] of Object.entries(selectedOption.scores)) {
      raw[typeId as MarketerTypeId] += weight;
    }
  }

  const maxScore = Math.max(...Object.values(raw));
  const normalized = Object.fromEntries(
    MARKETER_TYPES.map((t) => [
      t,
      maxScore === 0 ? 0 : Math.round((raw[t] / maxScore) * 100),
    ])
  ) as Record<MarketerTypeId, number>;

  return { raw, normalized };
}

export function getResult(scores: QuizScores, answers: number[]): QuizResult {
  const sorted = [...MARKETER_TYPES].sort((a, b) => {
    const diff = scores.raw[b] - scores.raw[a];
    if (diff !== 0) return diff;
    return a.localeCompare(b);
  });

  return {
    primaryType: sorted[0],
    secondaryType: sorted[1],
    growthArea: sorted[sorted.length - 1],
    scores,
    answers,
  };
}
