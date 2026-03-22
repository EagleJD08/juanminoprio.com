import { describe, it, expect } from "vitest";
import { scorePost } from "@lib/post-generator/scorer";
import { HOOK_FORMULAS } from "@lib/post-generator/hooks-data";
import { POST_STRUCTURES } from "@lib/post-generator/structures-data";
import type { GenerationInput } from "@lib/post-generator/types";

const input: GenerationInput = {
  topic: "content marketing",
  goal: "engagement",
  angle: "I tested 50 different hooks",
};

describe("scorePost", () => {
  it("returns a score object with total and 6 results", () => {
    const hook = HOOK_FORMULAS[0]; // curiosity-gap
    const structure = POST_STRUCTURES[0]; // insight-story-takeaway
    const score = scorePost(hook, structure, input);

    expect(score.max).toBe(6);
    expect(score.results).toHaveLength(6);
    expect(score.total).toBeGreaterThanOrEqual(0);
    expect(score.total).toBeLessThanOrEqual(6);
  });

  it("marks hit principles based on hook's steppsNatural", () => {
    // curiosity-gap naturally hits: social-currency, emotion
    const hook = HOOK_FORMULAS.find((h) => h.id === "curiosity-gap")!;
    const structure = POST_STRUCTURES[0];
    const score = scorePost(hook, structure, input);

    const socialCurrency = score.results.find(
      (r) => r.principle.id === "social-currency"
    )!;
    expect(socialCurrency.hit).toBe(true);
    expect(socialCurrency.explanation.length).toBeGreaterThan(0);
  });

  it("provides tips for missed principles", () => {
    const hook = HOOK_FORMULAS.find((h) => h.id === "curiosity-gap")!;
    const structure = POST_STRUCTURES[0];
    const score = scorePost(hook, structure, input);

    // curiosity-gap does NOT hit practical-value
    const practicalValue = score.results.find(
      (r) => r.principle.id === "practical-value"
    )!;
    expect(practicalValue.hit).toBe(false);
    expect(practicalValue.tip).toBeDefined();
    expect(practicalValue.tip!.length).toBeGreaterThan(0);
  });

  it("tips contain the user's topic", () => {
    const hook = HOOK_FORMULAS[0];
    const structure = POST_STRUCTURES[0];
    const score = scorePost(hook, structure, input);

    const missedResult = score.results.find((r) => !r.hit);
    if (missedResult?.tip) {
      expect(missedResult.tip).toContain("content marketing");
    }
  });

  it("total equals count of hit principles", () => {
    const hook = HOOK_FORMULAS[0];
    const structure = POST_STRUCTURES[0];
    const score = scorePost(hook, structure, input);

    const hitCount = score.results.filter((r) => r.hit).length;
    expect(score.total).toBe(hitCount);
  });
});
