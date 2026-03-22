import { describe, it, expect } from "vitest";
import { generatePosts, selectCombos, fillTemplate } from "@lib/post-generator/engine";
import type { GenerationInput } from "@lib/post-generator/types";

describe("fillTemplate", () => {
  it("replaces {topic} and {angle} placeholders", () => {
    const result = fillTemplate("This is about {topic} and {angle}.", {
      topic: "AI marketing",
      angle: "I use it daily",
    });
    expect(result).toBe("This is about AI marketing and I use it daily.");
  });

  it("handles multiple occurrences of the same placeholder", () => {
    const result = fillTemplate("{topic} is great. I love {topic}.", {
      topic: "data viz",
      angle: "test",
    });
    expect(result).toBe("data viz is great. I love data viz.");
  });
});

describe("selectCombos", () => {
  it("returns exactly 3 combos", () => {
    const combos = selectCombos("thought-leadership");
    expect(combos).toHaveLength(3);
  });

  it("returns unique hook formulas (no duplicates)", () => {
    const combos = selectCombos("engagement");
    const hookIds = combos.map((c) => c.hook.id);
    expect(new Set(hookIds).size).toBe(3);
  });

  it("returns unique structures (no duplicates)", () => {
    const combos = selectCombos("share-lesson");
    const structureIds = combos.map((c) => c.structure.id);
    expect(new Set(structureIds).size).toBe(3);
  });

  it("ranks hooks by goal affinity (highest first)", () => {
    const combos = selectCombos("start-conversation");
    // Contrarian has 1.0 affinity for start-conversation, should be first
    expect(combos[0].hook.id).toBe("contrarian");
  });
});

describe("generatePosts", () => {
  const input: GenerationInput = {
    topic: "AI in marketing",
    goal: "thought-leadership",
    angle: "I use Claude to analyze campaign data daily",
  };

  it("returns exactly 3 generated posts", () => {
    const posts = generatePosts(input);
    expect(posts).toHaveLength(3);
  });

  it("each post has a non-empty hookLine", () => {
    const posts = generatePosts(input);
    posts.forEach((post) => {
      expect(post.hookLine.length).toBeGreaterThan(10);
    });
  });

  it("each post has fullContent containing the topic", () => {
    const posts = generatePosts(input);
    posts.forEach((post) => {
      expect(post.fullContent.toLowerCase()).toContain("ai");
    });
  });

  it("each post has sections matching the structure", () => {
    const posts = generatePosts(input);
    posts.forEach((post) => {
      expect(post.sections.length).toBe(post.structure.sections.length);
    });
  });

  it("each post has a STEPPS score", () => {
    const posts = generatePosts(input);
    posts.forEach((post) => {
      expect(post.steppsScore.total).toBeGreaterThanOrEqual(0);
      expect(post.steppsScore.total).toBeLessThanOrEqual(6);
      expect(post.steppsScore.results).toHaveLength(6);
    });
  });

  it("each post has at least one relevant stat", () => {
    const posts = generatePosts(input);
    posts.forEach((post) => {
      expect(post.relevantStats.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("no two posts use the same hook formula", () => {
    const posts = generatePosts(input);
    const hookIds = posts.map((p) => p.hookFormula.id);
    expect(new Set(hookIds).size).toBe(3);
  });
});
