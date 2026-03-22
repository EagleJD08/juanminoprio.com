// === Enums & Literals ===

export type HookFormulaId =
  | "curiosity-gap"
  | "bold-claim"
  | "data-led"
  | "story-led"
  | "contrarian";

export type PostStructureId =
  | "insight-story-takeaway"
  | "data-breakdown"
  | "heres-what-i-learned"
  | "myth-busting"
  | "framework-application";

export type Goal =
  | "thought-leadership"
  | "engagement"
  | "share-lesson"
  | "start-conversation"
  | "showcase-expertise";

export type STEPPSPrincipleId =
  | "social-currency"
  | "triggers"
  | "emotion"
  | "public"
  | "practical-value"
  | "stories";

export type Screen = "topic" | "context" | "previews" | "fullPost";

// === Framework Data Shapes ===

export interface HookFormula {
  id: HookFormulaId;
  name: string;
  description: string;
  templates: string[];
  goalAffinity: Record<Goal, number>;
  steppsNatural: STEPPSPrincipleId[];
  teaching: {
    whatItIs: string;
    whyItWorksTemplate: string;
    examples: string[];
  };
}

export interface StructureSection {
  name: string;
  role: string;
  template: string;
}

export interface PostStructure {
  id: PostStructureId;
  name: string;
  displayName: string;
  description: string;
  sections: StructureSection[];
  goalAffinity: Record<Goal, number>;
  teaching: {
    howItFlows: string;
    whyItFitsTemplate: Record<Goal, string>;
    sectionNotes: string[];
  };
}

export interface STEPPSPrinciple {
  id: STEPPSPrincipleId;
  name: string;
  description: string;
  teaching: string;
  tipTemplate: string;
}

export interface SourcedStat {
  id: string;
  stat: string;
  value: string;
  source: string;
  url: string;
  year: number;
  context: "hook" | "structure" | "stepps" | "general";
  relatedTo?: HookFormulaId | PostStructureId | STEPPSPrincipleId;
}

// === Generation Output ===

export interface PostSection {
  name: string;
  content: string;
  role: string;
}

export interface STEPPSResult {
  principle: STEPPSPrinciple;
  hit: boolean;
  explanation: string;
  tip?: string;
}

export interface STEPPSScore {
  total: number;
  max: 6;
  results: STEPPSResult[];
}

export interface GeneratedPost {
  hookFormula: HookFormula;
  structure: PostStructure;
  hookLine: string;
  fullContent: string;
  sections: PostSection[];
  steppsScore: STEPPSScore;
  relevantStats: SourcedStat[];
}

export interface GenerationInput {
  topic: string;
  goal: Goal;
  angle: string;
}

// === Persistence ===

export interface SavedPost {
  id: string;
  topic: string;
  goal: Goal;
  content: string;
  hookFormulaName: string;
  structureName: string;
  steppsTotal: number;
  savedAt: string;
}

// === Goal metadata ===

export interface GoalOption {
  id: Goal;
  label: string;
  description: string;
}

export const GOALS: GoalOption[] = [
  {
    id: "thought-leadership",
    label: "Build thought leadership",
    description: "Position yourself as an expert in your field",
  },
  {
    id: "engagement",
    label: "Drive engagement",
    description: "Get comments, reactions, and shares",
  },
  {
    id: "share-lesson",
    label: "Share a lesson",
    description: "Pass on something you learned from experience",
  },
  {
    id: "start-conversation",
    label: "Start a conversation",
    description: "Spark discussion and diverse viewpoints",
  },
  {
    id: "showcase-expertise",
    label: "Showcase expertise",
    description: "Demonstrate deep knowledge in your domain",
  },
];

// === AI Engine Types (v2) ===

export interface Highlight {
  text: string; // exact substring from fullContent (must be unique within the post)
  type: "hook" | "stepps" | "cta";
  label: string;
  explanation: string;
}

export interface AIResponsePost {
  hookFormulaName: string;
  hookFormulaId: HookFormulaId;
  structureName: string;
  structureId: PostStructureId;
  hookLine: string;
  fullContent: string;
  highlights: Highlight[];
  steppsScore: {
    total: number;
    hit: STEPPSPrincipleId[];
    missed: STEPPSPrincipleId[];
  };
  steppsExplanations: Record<STEPPSPrincipleId, string>;
}

export interface DisplayPost {
  source: "ai" | "rule-based";
  hookFormulaName: string;
  hookFormulaId: HookFormulaId;
  structureDisplayName: string;
  structureId: PostStructureId;
  hookLine: string;
  fullContent: string;
  highlights: Highlight[]; // empty array for rule-based posts
  stepps: {
    total: number;
    max: 6;
    hit: { id: STEPPSPrincipleId; name: string; explanation: string }[];
    missed: { id: STEPPSPrincipleId; name: string; tip: string }[];
  };
}
