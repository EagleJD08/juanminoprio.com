export const MARKETER_TYPES = [
  "growth-hacker",
  "storyteller",
  "data-scientist",
  "community-builder",
  "content-engine",
  "performance-marketer",
  "product-marketer",
  "creative-director",
  "partnership-builder",
  "automation-architect",
] as const;

export type MarketerTypeId = (typeof MARKETER_TYPES)[number];

export interface MarketerType {
  id: MarketerTypeId;
  name: string;
  tagline: string;
  description: string;
  strengths: string[];
  growthTip: string;
}

export interface AnswerOption {
  text: string;
  scores: Partial<Record<MarketerTypeId, number>>;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  options: [AnswerOption, AnswerOption, AnswerOption, AnswerOption];
}

export interface QuizScores {
  raw: Record<MarketerTypeId, number>;
  normalized: Record<MarketerTypeId, number>;
}

export interface QuizResult {
  primaryType: MarketerTypeId;
  secondaryType: MarketerTypeId;
  growthArea: MarketerTypeId;
  scores: QuizScores;
  answers: number[];
}

export interface SavedResult {
  id: string;
  resultType: string;
  scores: Record<MarketerTypeId, number>;
  answers: number[];
  createdAt: string;
}

export interface Resource {
  title: string;
  author?: string;
  type: "book" | "course" | "tool";
  url: string;
  description: string;
}

export type QuizScreen = "landing" | "question" | "analyzing" | "result";

export const MARKETER_TYPE_INFO: Record<MarketerTypeId, MarketerType> = {
  "growth-hacker": {
    id: "growth-hacker",
    name: "The Growth Hacker",
    tagline: "Experiments, funnels, metrics-obsessed",
    description:
      "You live in spreadsheets and experiment dashboards. Every campaign is a hypothesis, every metric tells a story, and you won't rest until you've found the lever that moves the needle. You think in funnels, optimize relentlessly, and can spot a growth opportunity where others see noise.",
    strengths: ["Rapid experimentation", "Funnel optimization", "Data-driven decision making"],
    growthTip: "Balance your metric obsession with brand building — not everything that counts can be counted.",
  },
  storyteller: {
    id: "storyteller",
    name: "The Storyteller",
    tagline: "Brand, narrative, emotional connection",
    description:
      "You believe every brand has a story worth telling, and you know how to tell it in a way that makes people feel something. You craft narratives that stick, build emotional connections, and understand that the best marketing doesn't feel like marketing at all.",
    strengths: ["Narrative crafting", "Emotional resonance", "Brand voice development"],
    growthTip: "Pair your stories with data — prove the ROI of emotional connection to keep stakeholders bought in.",
  },
  "data-scientist": {
    id: "data-scientist",
    name: "The Data Scientist",
    tagline: "Analytics, attribution, dashboards",
    description:
      "Numbers speak to you. While others rely on gut feelings, you build dashboards, run attribution models, and turn raw data into actionable insights. You're the one who can prove what's actually working and explain exactly why.",
    strengths: ["Analytical rigor", "Attribution modeling", "Insight extraction"],
    growthTip: "Remember that data informs decisions but doesn't make them — develop your strategic intuition too.",
  },
  "community-builder": {
    id: "community-builder",
    name: "The Community Builder",
    tagline: "Social media, engagement, audience",
    description:
      "You understand that marketing is a conversation, not a broadcast. You build genuine communities, foster engagement, and create spaces where customers become advocates. Your superpower is making people feel like they belong.",
    strengths: ["Audience engagement", "Community management", "Advocacy cultivation"],
    growthTip: "Learn to quantify community value — tie engagement metrics to business outcomes to prove impact.",
  },
  "content-engine": {
    id: "content-engine",
    name: "The Content Engine",
    tagline: "SEO, blogs, long-form, distribution",
    description:
      "You're prolific and strategic. You understand that great content compounds over time, and you know how to create it at scale without sacrificing quality. SEO, distribution, repurposing — you think about the full content lifecycle.",
    strengths: ["Content strategy", "SEO mastery", "Scalable production"],
    growthTip: "Don't just produce — promote. The best content in the world fails if nobody sees it.",
  },
  "performance-marketer": {
    id: "performance-marketer",
    name: "The Performance Marketer",
    tagline: "Paid ads, ROAS, bidding strategies",
    description:
      "Every dollar you spend is accountable. You master paid channels, optimize ROAS obsessively, and can scale campaigns profitably. You think in CPAs, bid strategies, and audience segments, and you know exactly when to scale up or cut losses.",
    strengths: ["Paid media optimization", "Budget efficiency", "Channel scaling"],
    growthTip: "Build organic channels alongside paid — sustainable growth needs more than one engine.",
  },
  "product-marketer": {
    id: "product-marketer",
    name: "The Product Marketer",
    tagline: "Positioning, launches, competitive intel",
    description:
      "You sit at the intersection of product, sales, and marketing. You craft positioning that resonates, plan launches that land, and always know what the competition is doing. Your strength is translating complex products into clear value propositions.",
    strengths: ["Strategic positioning", "Launch orchestration", "Competitive analysis"],
    growthTip: "Stay close to customers — the best positioning comes from their words, not your conference room.",
  },
  "creative-director": {
    id: "creative-director",
    name: "The Creative Director",
    tagline: "Visual identity, campaigns, design thinking",
    description:
      "You think in visuals, concepts, and big ideas. You can take a brief and turn it into a campaign that stops people mid-scroll. You care about aesthetics, brand consistency, and the craft of making something beautiful that also converts.",
    strengths: ["Visual storytelling", "Campaign ideation", "Brand aesthetics"],
    growthTip: "Ground your creative vision in business objectives — beautiful work that doesn't convert is art, not marketing.",
  },
  "partnership-builder": {
    id: "partnership-builder",
    name: "The Partnership Builder",
    tagline: "Influencers, co-marketing, affiliations",
    description:
      "You know that the fastest way to grow is through other people's audiences. You're a natural networker who builds mutually beneficial partnerships, influencer relationships, and co-marketing deals that multiply your reach.",
    strengths: ["Relationship cultivation", "Deal structuring", "Audience leverage"],
    growthTip: "Document your partnership playbooks — the processes in your head need to be systems your team can run.",
  },
  "automation-architect": {
    id: "automation-architect",
    name: "The Automation Architect",
    tagline: "Email flows, martech stack, ops",
    description:
      "You see marketing as a system to be optimized. While others send one-off emails, you build automated flows that nurture leads at scale. You evaluate martech tools, design integrations, and create the infrastructure that lets the rest of the team move faster.",
    strengths: ["Systems thinking", "Marketing automation", "Tech stack design"],
    growthTip: "Don't automate bad processes — make sure the strategy is right before you scale it with technology.",
  },
};
