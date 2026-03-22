import type {
  HookFormula,
  PostStructure,
  GenerationInput,
  STEPPSScore,
  STEPPSResult,
} from "./types";
import { STEPPS_PRINCIPLES } from "./stepps-data";
import { fillTemplate } from "./engine";

/**
 * Score a post against the 6 STEPPS principles.
 */
export function scorePost(
  hook: HookFormula,
  structure: PostStructure,
  input: GenerationInput
): STEPPSScore {
  const results: STEPPSResult[] = STEPPS_PRINCIPLES.map((principle) => {
    const hit = hook.steppsNatural.includes(principle.id);
    const explanation = hit
      ? `This post's ${hook.name} hook naturally triggers ${principle.name} — ${principle.description.toLowerCase()}`
      : "";
    const tip = !hit
      ? fillTemplate(principle.tipTemplate, {
          topic: input.topic,
          angle: input.angle,
        })
      : undefined;

    return { principle, hit, explanation, tip };
  });

  const total = results.filter((r) => r.hit).length;

  return { total, max: 6, results };
}
