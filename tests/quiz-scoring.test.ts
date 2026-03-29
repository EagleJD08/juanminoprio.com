import { describe, it, expect } from "vitest";
import { calculateScores, getResult } from "../src/lib/quiz/scoring";
import type { QuizQuestion } from "../src/lib/quiz/types";
import { MARKETER_TYPES } from "../src/lib/quiz/types";

const testQuestions: QuizQuestion[] = [
  {
    id: 1, scenario: "Test scenario 1",
    options: [
      { text: "A", scores: { "growth-hacker": 3, "performance-marketer": 1 } },
      { text: "B", scores: { storyteller: 3, "creative-director": 1 } },
      { text: "C", scores: { "data-scientist": 3, "product-marketer": 1 } },
      { text: "D", scores: { "automation-architect": 3, "content-engine": 1 } },
    ],
  },
  {
    id: 2, scenario: "Test scenario 2",
    options: [
      { text: "A", scores: { "growth-hacker": 3, "data-scientist": 1 } },
      { text: "B", scores: { storyteller: 3, "community-builder": 1 } },
      { text: "C", scores: { "content-engine": 3, storyteller: 1 } },
      { text: "D", scores: { "partnership-builder": 3, "community-builder": 1 } },
    ],
  },
  {
    id: 3, scenario: "Test scenario 3",
    options: [
      { text: "A", scores: { "growth-hacker": 3, "performance-marketer": 1 } },
      { text: "B", scores: { "creative-director": 3, storyteller: 1 } },
      { text: "C", scores: { "community-builder": 3, "partnership-builder": 1 } },
      { text: "D", scores: { "product-marketer": 3, "performance-marketer": 1 } },
    ],
  },
];

describe("calculateScores", () => {
  it("sums scores correctly for selected answers", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);
    expect(scores.raw["growth-hacker"]).toBe(9);
    expect(scores.raw["performance-marketer"]).toBe(2);
    expect(scores.raw["data-scientist"]).toBe(1);
  });

  it("returns zero for types that were never selected", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);
    expect(scores.raw.storyteller).toBe(0);
  });

  it("normalizes scores to 0-100 scale", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);
    expect(scores.normalized["growth-hacker"]).toBe(100);
    for (const type of MARKETER_TYPES) {
      expect(scores.normalized[type]).toBeGreaterThanOrEqual(0);
      expect(scores.normalized[type]).toBeLessThanOrEqual(100);
    }
  });

  it("handles all zeros gracefully (no division by zero)", () => {
    const emptyQuestions: QuizQuestion[] = [{
      id: 1, scenario: "test",
      options: [
        { text: "A", scores: {} },
        { text: "B", scores: { storyteller: 3 } },
        { text: "C", scores: { "data-scientist": 3 } },
        { text: "D", scores: { "growth-hacker": 3 } },
      ],
    }];
    const scores = calculateScores([0], emptyQuestions);
    expect(scores.normalized["growth-hacker"]).toBe(0);
  });
});

describe("getResult", () => {
  it("identifies the correct primary type", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);
    const result = getResult(scores, answers);
    expect(result.primaryType).toBe("growth-hacker");
  });

  it("identifies secondary type as second highest", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);
    const result = getResult(scores, answers);
    expect(result.secondaryType).toBe("performance-marketer");
  });

  it("identifies growth area as lowest scoring type", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);
    const result = getResult(scores, answers);
    expect(scores.raw[result.growthArea]).toBe(0);
  });

  it("returns the answers array in the result", () => {
    const answers = [1, 2, 3];
    const scores = calculateScores(answers, testQuestions);
    const result = getResult(scores, answers);
    expect(result.answers).toEqual([1, 2, 3]);
  });
});
