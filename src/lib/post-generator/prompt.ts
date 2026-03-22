import { HOOK_FORMULAS } from "./hooks-data";
import { POST_STRUCTURES } from "./structures-data";
import { STEPPS_PRINCIPLES } from "./stepps-data";
import type { Goal } from "./types";

/**
 * Build the system instruction for Gemini that embeds all framework data.
 * This is sent as the system prompt with every API call.
 */
export function buildSystemPrompt(): string {
  // Serialize hook formulas
  const hooksSection = HOOK_FORMULAS.map(
    (h) =>
      `### ${h.name} (id: "${h.id}")
Description: ${h.description}
Goal affinities: ${Object.entries(h.goalAffinity)
        .map(([g, score]) => `${g}: ${score}`)
        .join(", ")}
Natural STEPPS triggers: ${h.steppsNatural.join(", ")}`
  ).join("\n\n");

  // Serialize post structures
  const structuresSection = POST_STRUCTURES.map(
    (s) =>
      `### ${s.displayName} (id: "${s.id}")
Description: ${s.description}
Sections: ${s.sections.map((sec) => `${sec.name} (${sec.role})`).join(" → ")}
Goal affinities: ${Object.entries(s.goalAffinity)
        .map(([g, score]) => `${g}: ${score}`)
        .join(", ")}`
  ).join("\n\n");

  // Serialize STEPPS principles
  const steppsSection = STEPPS_PRINCIPLES.map(
    (p) =>
      `### ${p.name} (id: "${p.id}")
${p.description}
Teaching: ${p.teaching}`
  ).join("\n\n");

  return `You are an expert LinkedIn content strategist. You generate LinkedIn posts using proven content frameworks.

## YOUR FRAMEWORK LIBRARY

### HOOK FORMULAS (5 options)
Each post MUST open with one of these hook formulas:

${hooksSection}

### POST STRUCTURES (5 options)
Each post MUST follow one of these structures:

${structuresSection}

### STEPPS SHAREABILITY FRAMEWORK (6 principles)
Score each post against these 6 principles. A post "hits" a principle if the content naturally triggers it.

${steppsSection}

## OUTPUT RULES

1. Generate exactly 3 posts. Each post MUST use a DIFFERENT hook formula AND a DIFFERENT structure. No repeats.
2. Pick the hook formula and structure with the highest affinity for the user's goal, then the next best, etc.
3. Each post must be 150-300 words — real LinkedIn post length.
4. Write in first person. Be specific, not generic. Use the user's topic and angle throughout.
5. The hookLine field must contain ONLY the first 1-2 sentences of the post (the part visible before "see more").
6. The fullContent field must contain the COMPLETE post text (including the hook).
7. Each post must have 2-5 highlights covering ~20-30% of the text. Highlights mark:
   - The hook line(s) → type "hook"
   - Phrases that trigger STEPPS principles → type "stepps"
   - The closing call-to-action → type "cta"
8. Each highlight's "text" field must be an EXACT substring of fullContent. If the text doesn't appear verbatim in fullContent, the highlight will break.
9. Highlight explanations must be specific to the user's topic — never generic.
10. For STEPPS scoring: honestly evaluate which principles the post hits. Don't inflate scores. Provide specific explanations for hits and actionable tips for misses.
11. steppsExplanations must have an entry for ALL 6 principles — hits get explanations, misses get improvement tips.

## JSON SCHEMA

Your response must be valid JSON matching this exact schema:

{
  "posts": [
    {
      "hookFormulaName": "string (display name of hook formula)",
      "hookFormulaId": "string (one of: curiosity-gap, bold-claim, data-led, story-led, contrarian)",
      "structureName": "string (display name of structure)",
      "structureId": "string (one of: insight-story-takeaway, data-breakdown, heres-what-i-learned, myth-busting, framework-application)",
      "hookLine": "string (first 1-2 sentences only)",
      "fullContent": "string (complete post text, 150-300 words)",
      "highlights": [
        {
          "text": "string (exact substring from fullContent)",
          "type": "string (hook | stepps | cta)",
          "label": "string (e.g., 'Curiosity Gap Hook', 'Social Currency', 'Engagement CTA')",
          "explanation": "string (1-2 sentences, specific to this post)"
        }
      ],
      "steppsScore": {
        "total": "number (0-6, count of hit principles)",
        "hit": ["array of principle IDs that are hit"],
        "missed": ["array of principle IDs that are missed"]
      },
      "steppsExplanations": {
        "social-currency": "string",
        "triggers": "string",
        "emotion": "string",
        "public": "string",
        "practical-value": "string",
        "stories": "string"
      }
    }
  ]
}`;
}

/**
 * Build the user-facing prompt with the specific topic, goal, and angle.
 */
export function buildUserPrompt(
  topic: string,
  goal: Goal,
  angle: string
): string {
  const goalLabels: Record<Goal, string> = {
    "thought-leadership": "Build thought leadership",
    engagement: "Drive engagement",
    "share-lesson": "Share a lesson",
    "start-conversation": "Start a conversation",
    "showcase-expertise": "Showcase expertise",
  };

  let prompt = `Generate 3 LinkedIn posts about: "${topic}"
Goal: ${goalLabels[goal]} (${goal})`;

  if (angle && angle.trim().length > 0) {
    prompt += `\nUnique angle: "${angle}"`;
  } else {
    prompt += `\nNo specific angle provided — use a general but specific perspective.`;
  }

  return prompt;
}
