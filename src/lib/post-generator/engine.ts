import type {
  GenerationInput,
  GeneratedPost,
  Goal,
  HookFormula,
  PostStructure,
  PostSection,
  SourcedStat,
} from "./types";
import { HOOK_FORMULAS } from "./hooks-data";
import { POST_STRUCTURES } from "./structures-data";
import { scorePost } from "./scorer";
import { SOURCED_STATS } from "./sources-data";

interface Combo {
  hook: HookFormula;
  structure: PostStructure;
}

/**
 * Replace {topic}, {angle}, {hookLine} placeholders in a template string.
 */
export function fillTemplate(
  template: string,
  vars: Record<string, string>
): string {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{${key}}`, value);
  }
  return result;
}

/**
 * Select the top 3 hook + structure combos for a given goal.
 * Ensures no duplicate hooks or structures.
 */
export function selectCombos(goal: Goal): Combo[] {
  // Sort hooks by goal affinity (descending)
  const rankedHooks = [...HOOK_FORMULAS].sort(
    (a, b) => b.goalAffinity[goal] - a.goalAffinity[goal]
  );

  // Sort structures by goal affinity (descending)
  const rankedStructures = [...POST_STRUCTURES].sort(
    (a, b) => b.goalAffinity[goal] - a.goalAffinity[goal]
  );

  // Pick top 3 hooks paired with top 3 structures (no reuse)
  const combos: Combo[] = [];
  for (let i = 0; i < 3; i++) {
    combos.push({
      hook: rankedHooks[i],
      structure: rankedStructures[i],
    });
  }

  return combos;
}

/**
 * Pick a random template from the array.
 */
function pickTemplate(templates: string[]): string {
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Find sourced stats relevant to a given post.
 */
function findRelevantStats(
  hook: HookFormula,
  structure: PostStructure
): SourcedStat[] {
  const stats: SourcedStat[] = [];
  const seen = new Set<string>();

  // Find stats related to this hook formula
  for (const stat of SOURCED_STATS) {
    if (stat.relatedTo === hook.id && !seen.has(stat.id)) {
      stats.push(stat);
      seen.add(stat.id);
    }
  }

  // Find stats related to this structure
  for (const stat of SOURCED_STATS) {
    if (stat.relatedTo === structure.id && !seen.has(stat.id)) {
      stats.push(stat);
      seen.add(stat.id);
    }
  }

  // Add a general stat if we have fewer than 2
  if (stats.length < 2) {
    for (const stat of SOURCED_STATS) {
      if (
        (stat.context === "general" || stat.context === "hook") &&
        !seen.has(stat.id)
      ) {
        stats.push(stat);
        seen.add(stat.id);
        if (stats.length >= 2) break;
      }
    }
  }

  return stats;
}

/**
 * Generate a single post from a hook + structure combo.
 */
function generateSinglePost(
  combo: Combo,
  input: GenerationInput
): GeneratedPost {
  const { hook, structure } = combo;
  const { topic, angle } = input;

  // Generate hook line from template
  const hookTemplate = pickTemplate(hook.templates);
  const hookLine = fillTemplate(hookTemplate, { topic, angle });

  // Generate each section
  const vars = { topic, angle, hookLine };
  const sections: PostSection[] = structure.sections.map((section) => ({
    name: section.name,
    content: fillTemplate(section.template, vars),
    role: section.role,
  }));

  // Combine into full content
  const fullContent = sections.map((s) => s.content).join("\n\n");

  // Score with STEPPS
  const steppsScore = scorePost(hook, structure, input);

  // Find relevant stats
  const relevantStats = findRelevantStats(hook, structure);

  return {
    hookFormula: hook,
    structure,
    hookLine,
    fullContent,
    sections,
    steppsScore,
    relevantStats,
  };
}

/**
 * Main generation function. Takes user input, returns 3 varied posts.
 */
export function generatePosts(input: GenerationInput): GeneratedPost[] {
  const combos = selectCombos(input.goal);
  return combos.map((combo) => generateSinglePost(combo, input));
}
