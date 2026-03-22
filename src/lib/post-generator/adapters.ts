import type {
  AIResponsePost,
  GeneratedPost,
  DisplayPost,
  STEPPSPrincipleId,
} from "./types";
import { STEPPS_PRINCIPLES } from "./stepps-data";

/**
 * Look up a STEPPS principle name by its ID.
 */
function steppsPrincipleName(id: STEPPSPrincipleId): string {
  const found = STEPPS_PRINCIPLES.find((p) => p.id === id);
  return found ? found.name : id;
}

/**
 * Convert an AI response post into the unified DisplayPost shape.
 */
export function aiToDisplayPost(aiPost: AIResponsePost): DisplayPost {
  return {
    source: "ai",
    hookFormulaName: aiPost.hookFormulaName,
    hookFormulaId: aiPost.hookFormulaId,
    structureDisplayName: aiPost.structureName,
    structureId: aiPost.structureId,
    hookLine: aiPost.hookLine,
    fullContent: aiPost.fullContent,
    highlights: aiPost.highlights,
    stepps: {
      total: aiPost.steppsScore.total,
      max: 6,
      hit: aiPost.steppsScore.hit.map((id) => ({
        id,
        name: steppsPrincipleName(id),
        explanation: aiPost.steppsExplanations[id] || "",
      })),
      missed: aiPost.steppsScore.missed.map((id) => ({
        id,
        name: steppsPrincipleName(id),
        tip: aiPost.steppsExplanations[id] || "",
      })),
    },
  };
}

/**
 * Convert a rule-based GeneratedPost into the unified DisplayPost shape.
 */
export function ruleBasedToDisplayPost(post: GeneratedPost): DisplayPost {
  const hitResults = post.steppsScore.results.filter((r) => r.hit);
  const missedResults = post.steppsScore.results.filter((r) => !r.hit);

  return {
    source: "rule-based",
    hookFormulaName: post.hookFormula.name,
    hookFormulaId: post.hookFormula.id,
    structureDisplayName: post.structure.displayName,
    structureId: post.structure.id,
    hookLine: post.hookLine,
    fullContent: post.fullContent,
    highlights: [], // rule-based engine doesn't produce highlights
    stepps: {
      total: post.steppsScore.total,
      max: 6,
      hit: hitResults.map((r) => ({
        id: r.principle.id,
        name: r.principle.name,
        explanation: r.explanation,
      })),
      missed: missedResults.map((r) => ({
        id: r.principle.id,
        name: r.principle.name,
        tip: r.tip || r.principle.tipTemplate,
      })),
    },
  };
}
