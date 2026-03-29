# Marketer Type Quiz — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive "What Kind of Marketer Are You?" quiz on juanminoprio.com with Cloudflare Workers + D1 backend for result storage and analytics.

**Architecture:** Astro SSG page with a React island for the quiz flow. Client-side scoring engine calculates results instantly. Cloudflare Pages Functions (Workers) provide 3 API endpoints that read/write a D1 SQLite database for result persistence, shareable URLs, and social proof analytics.

**Tech Stack:** Astro 5, React 19, TypeScript, Tailwind CSS 4, Framer Motion, Recharts, Cloudflare Pages Functions, Cloudflare D1

**PRD:** `/Users/juanminoprio/.claude/plans/wondrous-noodling-sedgewick.md`

---

## File Map

### New files (create):
```
src/lib/quiz/types.ts                    — TypeScript types for quiz engine
src/lib/quiz/scoring.ts                  — Scoring algorithm (pure function)
src/lib/quiz/questions.ts                — 10 scenario questions with answer→type mappings
src/lib/quiz/resources.ts                — Curated resources per marketer type
src/components/quiz/QuizApp.tsx          — Main orchestrator: state machine managing all screens
src/components/quiz/QuizLanding.tsx      — Landing screen: headline, social proof, start CTA
src/components/quiz/QuizQuestion.tsx     — Single question screen: scenario, 4 options, progress bar
src/components/quiz/QuizAnalyzing.tsx    — 2-3s "Analyzing" animation screen
src/components/quiz/QuizResult.tsx       — Result screen: type, description, radar chart
src/components/quiz/QuizResources.tsx    — Resources section: books, courses, tools per type
src/components/quiz/ShareCard.tsx        — Canvas-based shareable image generator + download
src/pages/tools/marketer-quiz/index.astro — Astro page shell with SEO meta
functions/api/quiz-result.ts             — POST save + GET stats endpoints
functions/api/quiz-result/[id].ts        — GET individual result endpoint
wrangler.toml                            — D1 binding configuration
migrations/0001_create_quiz_results.sql  — D1 schema
tests/quiz-scoring.test.ts              — Scoring engine unit tests
```

### Modify:
```
package.json                             — Add wrangler + nanoid as dev/dep
src/components/Navbar.astro              — Add "Quiz" link for tools subpage
.gitignore                               — Add .wrangler, replace .netlify
```

### Delete (stale Netlify artifacts):
```
netlify.toml
netlify/                                 — Contains duplicate of already-migrated function
.netlify/                                — Stale state (already in .gitignore)
```

---

## Task 1: TypeScript Types

**Files:**
- Create: `src/lib/quiz/types.ts`

- [ ] **Step 1: Write all quiz types**

```typescript
// src/lib/quiz/types.ts

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
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/quiz/types.ts
git commit -m "feat(quiz): add TypeScript types and marketer type definitions"
```

---

## Task 2: Scoring Engine + Tests (TDD)

**Files:**
- Create: `src/lib/quiz/scoring.ts`
- Create: `tests/quiz-scoring.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// tests/quiz-scoring.test.ts
import { describe, it, expect } from "vitest";
import { calculateScores, getResult } from "../src/lib/quiz/scoring";
import type { QuizQuestion, MarketerTypeId } from "../src/lib/quiz/types";
import { MARKETER_TYPES } from "../src/lib/quiz/types";

// Minimal test questions — 3 questions for testing
const testQuestions: QuizQuestion[] = [
  {
    id: 1,
    scenario: "Test scenario 1",
    options: [
      { text: "A", scores: { "growth-hacker": 3, "performance-marketer": 1 } },
      { text: "B", scores: { storyteller: 3, "creative-director": 1 } },
      { text: "C", scores: { "data-scientist": 3, "product-marketer": 1 } },
      { text: "D", scores: { "automation-architect": 3, "content-engine": 1 } },
    ],
  },
  {
    id: 2,
    scenario: "Test scenario 2",
    options: [
      { text: "A", scores: { "growth-hacker": 3, "data-scientist": 1 } },
      { text: "B", scores: { storyteller: 3, "community-builder": 1 } },
      { text: "C", scores: { "content-engine": 3, storyteller: 1 } },
      { text: "D", scores: { "partnership-builder": 3, "community-builder": 1 } },
    ],
  },
  {
    id: 3,
    scenario: "Test scenario 3",
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
    // Select option 0 (A) for all 3 questions → growth-hacker should dominate
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);

    // growth-hacker: 3+3+3=9, performance-marketer: 1+0+1=2, data-scientist: 0+1+0=1
    expect(scores.raw["growth-hacker"]).toBe(9);
    expect(scores.raw["performance-marketer"]).toBe(2);
    expect(scores.raw["data-scientist"]).toBe(1);
  });

  it("returns zero for types that were never selected", () => {
    const answers = [0, 0, 0]; // Never picks storyteller
    const scores = calculateScores(answers, testQuestions);
    expect(scores.raw.storyteller).toBe(0);
  });

  it("normalizes scores to 0-100 scale", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);

    // growth-hacker has the max raw score (9), should normalize to 100
    expect(scores.normalized["growth-hacker"]).toBe(100);

    // All normalized scores should be between 0 and 100
    for (const type of MARKETER_TYPES) {
      expect(scores.normalized[type]).toBeGreaterThanOrEqual(0);
      expect(scores.normalized[type]).toBeLessThanOrEqual(100);
    }
  });

  it("handles all zeros gracefully (no division by zero)", () => {
    // Create questions where option 0 gives no scores to any type
    const emptyQuestions: QuizQuestion[] = [
      {
        id: 1,
        scenario: "test",
        options: [
          { text: "A", scores: {} },
          { text: "B", scores: { storyteller: 3 } },
          { text: "C", scores: { "data-scientist": 3 } },
          { text: "D", scores: { "growth-hacker": 3 } },
        ],
      },
    ];
    const scores = calculateScores([0], emptyQuestions);
    expect(scores.normalized["growth-hacker"]).toBe(0);
  });
});

describe("getResult", () => {
  it("identifies the correct primary type", () => {
    const answers = [0, 0, 0]; // All growth-hacker
    const scores = calculateScores(answers, testQuestions);
    const result = getResult(scores, answers);

    expect(result.primaryType).toBe("growth-hacker");
  });

  it("identifies secondary type as second highest", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);
    const result = getResult(scores, answers);

    // performance-marketer has 2, data-scientist has 1
    expect(result.secondaryType).toBe("performance-marketer");
  });

  it("identifies growth area as lowest scoring type", () => {
    const answers = [0, 0, 0];
    const scores = calculateScores(answers, testQuestions);
    const result = getResult(scores, answers);

    // Several types at 0 — growth area should be one of them
    expect(scores.raw[result.growthArea]).toBe(0);
  });

  it("returns the answers array in the result", () => {
    const answers = [1, 2, 3];
    const scores = calculateScores(answers, testQuestions);
    const result = getResult(scores, answers);

    expect(result.answers).toEqual([1, 2, 3]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd ~/Documents/Claude/juanminoprio.com && npx vitest run tests/quiz-scoring.test.ts
```

Expected: FAIL — module `../src/lib/quiz/scoring` does not exist

- [ ] **Step 3: Write the scoring engine**

```typescript
// src/lib/quiz/scoring.ts
import type { QuizQuestion, QuizScores, QuizResult, MarketerTypeId } from "./types";
import { MARKETER_TYPES } from "./types";

export function calculateScores(
  answers: number[],
  questions: QuizQuestion[]
): QuizScores {
  // Initialize raw scores to 0
  const raw = Object.fromEntries(
    MARKETER_TYPES.map((t) => [t, 0])
  ) as Record<MarketerTypeId, number>;

  // Sum weighted scores from each answer
  for (let i = 0; i < answers.length; i++) {
    const question = questions[i];
    if (!question) continue;
    const selectedOption = question.options[answers[i]];
    if (!selectedOption) continue;

    for (const [typeId, weight] of Object.entries(selectedOption.scores)) {
      raw[typeId as MarketerTypeId] += weight;
    }
  }

  // Normalize to 0-100
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
  // Sort types by raw score descending, then by name for deterministic ties
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd ~/Documents/Claude/juanminoprio.com && npx vitest run tests/quiz-scoring.test.ts
```

Expected: All tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/quiz/scoring.ts tests/quiz-scoring.test.ts
git commit -m "feat(quiz): add scoring engine with tests"
```

---

## Task 3: Quiz Questions Data

**Files:**
- Create: `src/lib/quiz/questions.ts`

- [ ] **Step 1: Write 10 scenario-based questions**

```typescript
// src/lib/quiz/questions.ts
import type { QuizQuestion } from "./types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario:
      "Your company just acquired a new product line. What's your first move?",
    options: [
      {
        text: "Run rapid experiments to find the most efficient acquisition channel",
        scores: { "growth-hacker": 3, "performance-marketer": 1 },
      },
      {
        text: "Craft a compelling origin story that connects emotionally with the audience",
        scores: { storyteller: 3, "creative-director": 1 },
      },
      {
        text: "Analyze the competitive landscape and craft positioning against key alternatives",
        scores: { "product-marketer": 3, "data-scientist": 1 },
      },
      {
        text: "Build an automated nurture sequence to warm up the existing database",
        scores: { "automation-architect": 3, "content-engine": 1 },
      },
    ],
  },
  {
    id: 2,
    scenario:
      "You're given $50K to spend this quarter. Where does the budget go first?",
    options: [
      {
        text: "Paid ads with rigorous A/B testing across channels",
        scores: { "performance-marketer": 3, "growth-hacker": 1 },
      },
      {
        text: "A brand campaign that tells a bigger story about who you are",
        scores: { storyteller: 3, "creative-director": 1 },
      },
      {
        text: "Community events and programs that drive user-generated content",
        scores: { "community-builder": 3, "partnership-builder": 1 },
      },
      {
        text: "Analytics infrastructure so you can finally measure everything properly",
        scores: { "data-scientist": 3, "automation-architect": 1 },
      },
    ],
  },
  {
    id: 3,
    scenario:
      "A competitor just launched a feature that directly copies yours. What's your move?",
    options: [
      {
        text: "Deep dive into the data — how are customers actually responding to this?",
        scores: { "data-scientist": 3, "product-marketer": 1 },
      },
      {
        text: "Create thought leadership content showing your deeper expertise",
        scores: { "content-engine": 3, storyteller: 1 },
      },
      {
        text: "Rally your community and let your advocates speak for you",
        scores: { "community-builder": 3, "partnership-builder": 1 },
      },
      {
        text: "Launch a targeted campaign highlighting your unique positioning",
        scores: { "performance-marketer": 3, "growth-hacker": 1 },
      },
    ],
  },
  {
    id: 4,
    scenario:
      "What topic do you always end up bringing to the marketing team meeting?",
    options: [
      {
        text: "Funnel metrics, conversion rates, and experiment results",
        scores: { "growth-hacker": 3, "data-scientist": 1 },
      },
      {
        text: "Customer stories, testimonials, and feedback themes",
        scores: { storyteller: 3, "community-builder": 1 },
      },
      {
        text: "New tools, integrations, and workflow automation opportunities",
        scores: { "automation-architect": 3, "data-scientist": 1 },
      },
      {
        text: "Visual campaign concepts and brand consistency observations",
        scores: { "creative-director": 3, "content-engine": 1 },
      },
    ],
  },
  {
    id: 5,
    scenario:
      "You have 2 hours blocked for content creation. What do you make?",
    options: [
      {
        text: "A data-driven analysis with original research and charts",
        scores: { "data-scientist": 3, "content-engine": 1 },
      },
      {
        text: "A personal story that teaches a business lesson people won't forget",
        scores: { storyteller: 3, "community-builder": 1 },
      },
      {
        text: "A visually stunning campaign concept with mockups",
        scores: { "creative-director": 3, storyteller: 1 },
      },
      {
        text: "A comprehensive SEO-optimized guide that'll rank for months",
        scores: { "content-engine": 3, "growth-hacker": 1 },
      },
    ],
  },
  {
    id: 6,
    scenario:
      "If you could add one specialist to your marketing team, who would it be?",
    options: [
      {
        text: "A media buyer who can scale paid channels profitably",
        scores: { "performance-marketer": 3, "growth-hacker": 1 },
      },
      {
        text: "A brand designer who elevates everything visually",
        scores: { "creative-director": 3, storyteller: 1 },
      },
      {
        text: "A marketing ops person to automate all the manual workflows",
        scores: { "automation-architect": 3, "data-scientist": 1 },
      },
      {
        text: "A partnerships manager to unlock co-marketing opportunities",
        scores: { "partnership-builder": 3, "community-builder": 1 },
      },
    ],
  },
  {
    id: 7,
    scenario:
      "It's Monday morning. What's the first metric you check?",
    options: [
      {
        text: "CAC, ROAS, and ad spend efficiency across campaigns",
        scores: { "performance-marketer": 3, "growth-hacker": 1 },
      },
      {
        text: "Engagement rate, comments, and share of voice on social",
        scores: { "community-builder": 3, "content-engine": 1 },
      },
      {
        text: "Pipeline influenced and deals sourced by marketing",
        scores: { "product-marketer": 3, "partnership-builder": 1 },
      },
      {
        text: "Email open rates, flow performance, and automation health",
        scores: { "automation-architect": 3, "growth-hacker": 1 },
      },
    ],
  },
  {
    id: 8,
    scenario:
      "You have a free week for professional development. What do you study?",
    options: [
      {
        text: "Behavioral psychology — what makes ideas spread and people buy",
        scores: { storyteller: 3, "product-marketer": 1 },
      },
      {
        text: "SQL, analytics platforms, and data visualization tools",
        scores: { "data-scientist": 3, "automation-architect": 1 },
      },
      {
        text: "Negotiation, networking, and relationship building",
        scores: { "partnership-builder": 3, "community-builder": 1 },
      },
      {
        text: "Design thinking, typography, and creative direction",
        scores: { "creative-director": 3, "content-engine": 1 },
      },
    ],
  },
  {
    id: 9,
    scenario:
      "A customer sends detailed product feedback. Your first thought is...",
    options: [
      {
        text: "How to turn this into a compelling case study or testimonial",
        scores: { "content-engine": 3, storyteller: 1 },
      },
      {
        text: "Whether this represents a pattern I can find in the usage data",
        scores: { "data-scientist": 3, "product-marketer": 1 },
      },
      {
        text: "How to amplify this voice in the community and feature them",
        scores: { "community-builder": 3, "partnership-builder": 1 },
      },
      {
        text: "Which segment this maps to and how to adjust our messaging",
        scores: { "product-marketer": 3, "performance-marketer": 1 },
      },
    ],
  },
  {
    id: 10,
    scenario:
      "If you could lead any marketing project with unlimited resources, what would it be?",
    options: [
      {
        text: "A viral growth experiment that 10x's signups in a quarter",
        scores: { "growth-hacker": 3, "performance-marketer": 1 },
      },
      {
        text: "A full rebrand with a new visual identity and campaign launch",
        scores: { "creative-director": 3, storyteller: 1 },
      },
      {
        text: "Building the ultimate marketing tech stack from scratch",
        scores: { "automation-architect": 3, "data-scientist": 1 },
      },
      {
        text: "A strategic partnership program with 5 major complementary brands",
        scores: { "partnership-builder": 3, "product-marketer": 1 },
      },
    ],
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/quiz/questions.ts
git commit -m "feat(quiz): add 10 scenario-based quiz questions"
```

---

## Task 4: Resources Data

**Files:**
- Create: `src/lib/quiz/resources.ts`

- [ ] **Step 1: Write curated resources for all 10 types**

```typescript
// src/lib/quiz/resources.ts
import type { MarketerTypeId, Resource } from "./types";

export const RESOURCES: Record<MarketerTypeId, Resource[]> = {
  "growth-hacker": [
    { title: "Hacking Growth", author: "Sean Ellis & Morgan Brown", type: "book", url: "https://www.amazon.com/Hacking-Growth-Fastest-Growing-Companies-Breakout/dp/045149721X", description: "The playbook that coined the term — systematic approach to rapid experimentation across the customer journey." },
    { title: "Reforge Growth Series", type: "course", url: "https://www.reforge.com/growth-series", description: "The gold standard in growth education — taught by practitioners from Hubspot, Dropbox, and Eventbrite." },
    { title: "Amplitude", type: "tool", url: "https://amplitude.com", description: "Product analytics platform for tracking user behavior, funnels, and experiment results." },
  ],
  storyteller: [
    { title: "Building a StoryBrand", author: "Donald Miller", type: "book", url: "https://www.amazon.com/Building-StoryBrand-Clarify-Message-Customers/dp/0718033329", description: "Framework for making your customer the hero of the story — the most practical brand storytelling book." },
    { title: "Contagious: Why Things Catch On", author: "Jonah Berger", type: "book", url: "https://www.amazon.com/Contagious-Things-Catch-Jonah-Berger/dp/1451686587", description: "The STEPPS framework for understanding why ideas spread ��� backed by research, not guesswork." },
    { title: "Hemingway Editor", type: "tool", url: "https://hemingwayapp.com", description: "Makes your writing bold and clear — highlights complex sentences and suggests simpler alternatives." },
  ],
  "data-scientist": [
    { title: "Lean Analytics", author: "Alistair Croll & Benjamin Yoskovitz", type: "book", url: "https://www.amazon.com/Lean-Analytics-Better-Startup-Faster/dp/1449335675", description: "How to pick the right metric for your stage and use data to make decisions, not just dashboards." },
    { title: "Google Data Analytics Certificate", type: "course", url: "https://www.coursera.org/professional-certificates/google-data-analytics", description: "Foundational data skills — spreadsheets, SQL, Tableau, and R — from Google on Coursera." },
    { title: "Looker Studio", type: "tool", url: "https://lookerstudio.google.com", description: "Free dashboarding tool that connects to everything — turn your data into visual stories." },
  ],
  "community-builder": [
    { title: "The Business of Belonging", author: "David Spinks", type: "book", url: "https://www.amazon.com/Business-Belonging-Community-Competitive-Advantage/dp/1119766125", description: "The definitive guide to building community as a business strategy, not just a nice-to-have." },
    { title: "CMX Community Strategy", type: "course", url: "https://cmxhub.com/academy", description: "Industry-standard community management certification — strategy, metrics, and engagement tactics." },
    { title: "Circle", type: "tool", url: "https://circle.so", description: "Modern community platform built for creators and brands — discussions, events, courses in one place." },
  ],
  "content-engine": [
    { title: "They Ask, You Answer", author: "Marcus Sheridan", type: "book", url: "https://www.amazon.com/They-Ask-You-Answer-Revolutionary/dp/1119610141", description: "Answer your customers' real questions and watch organic traffic compound — the content strategy that actually works." },
    { title: "HubSpot Content Marketing Certification", type: "course", url: "https://academy.hubspot.com/courses/content-marketing", description: "Free certification covering content strategy, creation, promotion, and analytics." },
    { title: "Ahrefs", type: "tool", url: "https://ahrefs.com", description: "SEO and content research powerhouse — keyword research, competitor analysis, and content gap identification." },
  ],
  "performance-marketer": [
    { title: "Ultimate Guide to Google Ads", author: "Perry Marshall", type: "book", url: "https://www.amazon.com/Ultimate-Guide-Google-Ads-Perry/dp/1599186349", description: "The bible of paid search — covers strategy, bidding, ad copy, and scaling profitably." },
    { title: "Meta Blueprint Certification", type: "course", url: "https://www.facebook.com/business/learn/certification", description: "Official Meta advertising certification — master Facebook and Instagram ad platforms." },
    { title: "Triple Whale", type: "tool", url: "https://triplewhale.com", description: "Attribution and analytics for paid marketers — finally understand true ROAS across channels." },
  ],
  "product-marketer": [
    { title: "Obviously Awesome", author: "April Dunford", type: "book", url: "https://www.amazon.com/Obviously-Awesome-Product-Positioning-Customers/dp/1999023005", description: "The positioning playbook — step-by-step framework for making your product's value obvious." },
    { title: "Lenny's Newsletter", type: "course", url: "https://www.lennysnewsletter.com", description: "The #1 product and growth newsletter — practical frameworks from top PMs and PMMs." },
    { title: "Klue", type: "tool", url: "https://klue.com", description: "Competitive intelligence platform — track competitors, enable sales, and stay ahead of the market." },
  ],
  "creative-director": [
    { title: "Steal Like an Artist", author: "Austin Kleon", type: "book", url: "https://www.amazon.com/Steal-Like-Artist-Things-Creative/dp/0761169253", description: "A manifesto for creative work — how to find inspiration, develop your voice, and ship creative work." },
    { title: "Figma for Beginners", type: "course", url: "https://help.figma.com/hc/en-us/categories/360002051613", description: "Official Figma tutorials — learn the design tool that's become the industry standard." },
    { title: "Figma", type: "tool", url: "https://figma.com", description: "Collaborative design platform — mockups, prototypes, and design systems in one place." },
  ],
  "partnership-builder": [
    { title: "Never Eat Alone", author: "Keith Ferrazzi", type: "book", url: "https://www.amazon.com/Never-Eat-Alone-Expanded-Updated/dp/0385346654", description: "The networking bible — how to build genuine relationships that create mutual value." },
    { title: "Partnership Leaders Community", type: "course", url: "https://partnershipleaders.com", description: "The largest community for partnership professionals — resources, events, and certification." },
    { title: "PartnerStack", type: "tool", url: "https://partnerstack.com", description: "Partnership management platform — recruit, manage, and scale partner programs." },
  ],
  "automation-architect": [
    { title: "Marketing Automation for Dummies", author: "Mathew Sweezey", type: "book", url: "https://www.amazon.com/Marketing-Automation-Dummies-Mathew-Sweezey/dp/1118772229", description: "Practical guide to building automated marketing systems — strategy before tools." },
    { title: "HubSpot Marketing Software Certification", type: "course", url: "https://academy.hubspot.com/courses/marketing-software", description: "Free certification on the most popular marketing automation platform — hands-on and practical." },
    { title: "Make (formerly Integromat)", type: "tool", url: "https://www.make.com", description: "Visual automation platform — connect any tools and build workflows without code." },
  ],
};
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/quiz/resources.ts
git commit -m "feat(quiz): add curated resources for all 10 marketer types"
```

---

## Task 5: D1 Database Setup

**Files:**
- Create: `wrangler.toml`
- Create: `migrations/0001_create_quiz_results.sql`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install wrangler and nanoid**

```bash
cd ~/Documents/Claude/juanminoprio.com && npm install --save-dev wrangler && npm install nanoid
```

- [ ] **Step 2: Create D1 database**

```bash
cd ~/Documents/Claude/juanminoprio.com && npx wrangler d1 create marketer-quiz-db
```

Save the database_id from the output — you'll need it for wrangler.toml.

- [ ] **Step 3: Write wrangler.toml**

```toml
# wrangler.toml
name = "juanminoprio-com"
compatibility_date = "2024-12-01"

[[d1_databases]]
binding = "DB"
database_name = "marketer-quiz-db"
database_id = "<paste-database-id-from-step-2>"
migrations_dir = "migrations"
```

Replace `<paste-database-id-from-step-2>` with the actual ID.

- [ ] **Step 4: Write migration SQL**

```sql
-- migrations/0001_create_quiz_results.sql
CREATE TABLE IF NOT EXISTS quiz_results (
  id TEXT PRIMARY KEY,
  result_type TEXT NOT NULL,
  scores TEXT NOT NULL,
  answers TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  user_agent TEXT,
  referrer TEXT
);

CREATE INDEX idx_quiz_results_created_at ON quiz_results(created_at);
CREATE INDEX idx_quiz_results_result_type ON quiz_results(result_type);
```

- [ ] **Step 5: Run migration locally**

```bash
cd ~/Documents/Claude/juanminoprio.com && npx wrangler d1 migrations apply marketer-quiz-db --local
```

Expected: Migration applied successfully

- [ ] **Step 6: Update .gitignore**

Replace the Netlify line and add Wrangler:

In `.gitignore`, replace:
```
# Local Netlify folder
.netlify
```

With:
```
# Wrangler local state
.wrangler/
```

- [ ] **Step 7: Commit**

```bash
git add wrangler.toml migrations/ .gitignore package.json package-lock.json
git commit -m "feat(quiz): add D1 database setup with wrangler config and migration"
```

---

## Task 6: Workers API Endpoints

**Files:**
- Create: `functions/api/quiz-result.ts`
- Create: `functions/api/quiz-result/[id].ts`

- [ ] **Step 1: Write POST + GET /api/quiz-result endpoint**

```typescript
// functions/api/quiz-result.ts
import { nanoid } from "nanoid";

interface Env {
  DB: D1Database;
}

const ALLOWED_ORIGINS = [
  "https://juanminoprio.com",
  "https://www.juanminoprio.com",
];

function corsHeaders(origin: string | null): Record<string, string> {
  const isAllowed =
    origin !== null &&
    (ALLOWED_ORIGINS.includes(origin) || origin.startsWith("http://localhost"));

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

// CORS preflight
export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
};

// POST — save quiz result
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, headers);
  }

  const { resultType, scores, answers } = body as Record<string, unknown>;

  // Validate
  if (typeof resultType !== "string" || !resultType) {
    return json({ error: "resultType is required" }, 400, headers);
  }
  if (!scores || typeof scores !== "object") {
    return json({ error: "scores object is required" }, 400, headers);
  }
  if (!Array.isArray(answers)) {
    return json({ error: "answers array is required" }, 400, headers);
  }

  const id = nanoid(10);
  const userAgent = request.headers.get("user-agent") || "";
  const referrer = request.headers.get("referer") || "";

  try {
    await env.DB.prepare(
      "INSERT INTO quiz_results (id, result_type, scores, answers, user_agent, referrer) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(id, resultType, JSON.stringify(scores), JSON.stringify(answers), userAgent, referrer)
      .run();

    return json({ success: true, resultId: id }, 201, headers);
  } catch (err) {
    console.error("D1 insert error:", err);
    return json({ error: "Failed to save result" }, 500, headers);
  }
};

// GET — quiz stats (total completions + type distribution)
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  try {
    const totalResult = await env.DB.prepare(
      "SELECT COUNT(*) as total FROM quiz_results"
    ).first<{ total: number }>();

    const distributionResult = await env.DB.prepare(
      "SELECT result_type, COUNT(*) as count FROM quiz_results GROUP BY result_type ORDER BY count DESC"
    ).all<{ result_type: string; count: number }>();

    const typeDistribution: Record<string, number> = {};
    for (const row of distributionResult.results) {
      typeDistribution[row.result_type] = row.count;
    }

    return json(
      {
        totalCompletions: totalResult?.total ?? 0,
        typeDistribution,
      },
      200,
      headers
    );
  } catch (err) {
    console.error("D1 query error:", err);
    return json({ error: "Failed to fetch stats" }, 500, headers);
  }
};
```

- [ ] **Step 2: Write GET /api/quiz-result/[id] endpoint**

```typescript
// functions/api/quiz-result/[id].ts
interface Env {
  DB: D1Database;
}

const ALLOWED_ORIGINS = [
  "https://juanminoprio.com",
  "https://www.juanminoprio.com",
];

function corsHeaders(origin: string | null): Record<string, string> {
  const isAllowed =
    origin !== null &&
    (ALLOWED_ORIGINS.includes(origin) || origin.startsWith("http://localhost"));

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  const id = params.id as string;

  if (!id || typeof id !== "string") {
    return json({ error: "Result ID is required" }, 400, headers);
  }

  try {
    const result = await env.DB.prepare(
      "SELECT id, result_type, scores, answers, created_at FROM quiz_results WHERE id = ?"
    )
      .bind(id)
      .first<{ id: string; result_type: string; scores: string; answers: string; created_at: string }>();

    if (!result) {
      return json({ error: "Result not found" }, 404, headers);
    }

    return json(
      {
        id: result.id,
        resultType: result.result_type,
        scores: JSON.parse(result.scores),
        answers: JSON.parse(result.answers),
        createdAt: result.created_at,
      },
      200,
      headers
    );
  } catch (err) {
    console.error("D1 query error:", err);
    return json({ error: "Failed to fetch result" }, 500, headers);
  }
};
```

- [ ] **Step 3: Test locally with wrangler**

```bash
cd ~/Documents/Claude/juanminoprio.com && npx wrangler pages dev dist --d1=DB=marketer-quiz-db --port 8788
```

In another terminal, test:
```bash
# Test POST
curl -X POST http://localhost:8788/api/quiz-result \
  -H "Content-Type: application/json" \
  -d '{"resultType":"storyteller","scores":{"storyteller":100,"growth-hacker":40},"answers":[1,0,2,3,1,2,0,1,3,2]}'

# Test GET stats
curl http://localhost:8788/api/quiz-result

# Test GET by ID (use the resultId from POST response)
curl http://localhost:8788/api/quiz-result/RESULT_ID_HERE
```

Expected: POST returns `{ success: true, resultId: "..." }`, GET returns stats, GET by ID returns the saved result.

- [ ] **Step 4: Commit**

```bash
git add functions/api/quiz-result.ts functions/api/quiz-result/
git commit -m "feat(quiz): add Workers API endpoints for quiz results and stats"
```

---

## Task 7: QuizApp Orchestrator + QuizLanding

**Files:**
- Create: `src/components/quiz/QuizApp.tsx`
- Create: `src/components/quiz/QuizLanding.tsx`

- [ ] **Step 1: Write QuizLanding component**

```tsx
// src/components/quiz/QuizLanding.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface QuizLandingProps {
  onStart: () => void;
}

export default function QuizLanding({ onStart }: QuizLandingProps) {
  const [totalCompletions, setTotalCompletions] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/quiz-result")
      .then((r) => r.json())
      .then((data) => {
        if (data.totalCompletions != null) {
          setTotalCompletions(data.totalCompletions);
        }
      })
      .catch(() => {
        // Silently fail ��� social proof is non-critical
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center max-w-2xl mx-auto px-4"
    >
      <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-soft-plum/10 text-soft-plum rounded-full mb-6">
        Free Marketing Quiz
      </span>

      <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy leading-tight mb-4">
        What Kind of Marketer{" "}
        <span className="font-accent italic text-terracotta">Are You?</span>
      </h1>

      <p className="text-slate text-lg mb-8 max-w-lg">
        Discover your marketing archetype across 10 dimensions. Get personalized
        resources to sharpen your strengths and close your gaps.
      </p>

      <div className="flex items-center gap-4 text-sm text-slate/70 mb-8">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          2 min
        </span>
        <span className="w-1 h-1 rounded-full bg-slate/30" />
        <span>10 questions</span>
        <span className="w-1 h-1 rounded-full bg-slate/30" />
        <span>No signup needed</span>
      </div>

      <button
        onClick={onStart}
        className="group relative px-8 py-4 bg-navy text-cream font-heading font-semibold text-lg rounded-xl hover:bg-navy/90 transition-all duration-200 hover:shadow-lg hover:shadow-navy/20 cursor-pointer"
      >
        Discover Your Type
        <span className="inline-block ml-2 transition-transform duration-200 group-hover:translate-x-1">
          &rarr;
        </span>
      </button>

      {totalCompletions !== null && totalCompletions > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-slate/60"
        >
          {totalCompletions.toLocaleString()} marketer{totalCompletions === 1 ? "" : "s"} have discovered their type
        </motion.p>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 2: Write QuizApp orchestrator**

```tsx
// src/components/quiz/QuizApp.tsx
import { useState, useCallback, useEffect } from "react";
import type { QuizScreen, QuizResult as QuizResultType } from "../../lib/quiz/types";
import { QUIZ_QUESTIONS } from "../../lib/quiz/questions";
import { calculateScores, getResult } from "../../lib/quiz/scoring";
import QuizLanding from "./QuizLanding";
import QuizQuestion from "./QuizQuestion";
import QuizAnalyzing from "./QuizAnalyzing";
import QuizResult from "./QuizResult";

export default function QuizApp() {
  const [screen, setScreen] = useState<QuizScreen>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [resultId, setResultId] = useState<string | null>(null);

  // Check for shared result URL on mount
  const [sharedResult, setSharedResult] = useState<QuizResultType | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rId = params.get("r");
    if (rId) {
      fetch(`/api/quiz-result/${rId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.resultType && data.scores && data.answers) {
            const scores = {
              raw: data.scores,
              normalized: (() => {
                const max = Math.max(...Object.values(data.scores as Record<string, number>));
                const norm: Record<string, number> = {};
                for (const [k, v] of Object.entries(data.scores as Record<string, number>)) {
                  norm[k] = max === 0 ? 0 : Math.round((v / max) * 100);
                }
                return norm;
              })(),
            };
            setSharedResult({
              primaryType: data.resultType,
              secondaryType: "", // Will be recalculated
              growthArea: "",
              scores: scores as any,
              answers: data.answers,
            });
            setResultId(rId);
            setScreen("result");
          }
        })
        .catch(() => {
          // Invalid share URL — show landing
        });
    }
  }, []);

  const handleStart = useCallback(() => {
    setScreen("question");
    setCurrentQuestion(0);
    setAnswers([]);
  }, []);

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answerIndex;
      setAnswers(newAnswers);

      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Last question — go to analyzing
        setScreen("analyzing");

        // Calculate scores
        const scores = calculateScores(newAnswers, QUIZ_QUESTIONS);
        const quizResult = getResult(scores, newAnswers);
        setResult(quizResult);

        // Fire-and-forget save to D1
        fetch("/api/quiz-result", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resultType: quizResult.primaryType,
            scores: quizResult.scores.raw,
            answers: quizResult.answers,
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.resultId) setResultId(data.resultId);
          })
          .catch(() => {
            // D1 save failed — non-blocking
          });

        // Show analyzing for 2.5s then reveal result
        setTimeout(() => setScreen("result"), 2500);
      }
    },
    [answers, currentQuestion]
  );

  const handleBack = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const handleRetake = useCallback(() => {
    setScreen("landing");
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setResultId(null);
    setSharedResult(null);
    // Clean URL params
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const activeResult = sharedResult || result;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      {screen === "landing" && <QuizLanding onStart={handleStart} />}

      {screen === "question" && (
        <QuizQuestion
          question={QUIZ_QUESTIONS[currentQuestion]}
          questionIndex={currentQuestion}
          totalQuestions={QUIZ_QUESTIONS.length}
          selectedAnswer={answers[currentQuestion] ?? null}
          onAnswer={handleAnswer}
          onBack={handleBack}
        />
      )}

      {screen === "analyzing" && <QuizAnalyzing />}

      {screen === "result" && activeResult && (
        <QuizResult
          result={activeResult}
          resultId={resultId}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/quiz/QuizApp.tsx src/components/quiz/QuizLanding.tsx
git commit -m "feat(quiz): add QuizApp orchestrator and QuizLanding screen"
```

---

## Task 8: QuizQuestion Component

**Files:**
- Create: `src/components/quiz/QuizQuestion.tsx`

- [ ] **Step 1: Write QuizQuestion with progress bar and transitions**

```tsx
// src/components/quiz/QuizQuestion.tsx
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion as QuizQuestionType } from "../../lib/quiz/types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
  onBack: () => void;
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswer,
  onBack,
}: QuizQuestionProps) {
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate/60 font-medium">
            {questionIndex + 1} of {totalQuestions}
          </span>
          {questionIndex > 0 && (
            <button
              onClick={onBack}
              className="text-sm text-slate/60 hover:text-navy transition-colors cursor-pointer flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}
        </div>
        <div className="h-1.5 bg-sand/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-terracotta rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-8 leading-snug">
            {question.scenario}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => onAnswer(i)}
                className={`w-full text-left p-4 md:p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer group ${
                  selectedAnswer === i
                    ? "border-terracotta bg-terracotta/5"
                    : "border-sand/30 hover:border-sand hover:bg-cream/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      selectedAnswer === i
                        ? "bg-terracotta text-white"
                        : "bg-sand/20 text-slate group-hover:bg-sand/40"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-navy font-medium leading-relaxed">
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/quiz/QuizQuestion.tsx
git commit -m "feat(quiz): add QuizQuestion component with animated transitions"
```

---

## Task 9: QuizAnalyzing Animation

**Files:**
- Create: `src/components/quiz/QuizAnalyzing.tsx`

- [ ] **Step 1: Write analyzing screen**

```tsx
// src/components/quiz/QuizAnalyzing.tsx
import { motion } from "framer-motion";

export default function QuizAnalyzing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center px-4"
    >
      {/* Animated dots */}
      <div className="flex gap-2 mb-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-terracotta"
            animate={{
              y: [0, -12, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <h2 className="font-heading text-2xl font-bold text-navy mb-3">
        Analyzing your marketing DNA
      </h2>

      <motion.p
        className="text-slate/60 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Mapping your strengths across 10 dimensions...
      </motion.p>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/quiz/QuizAnalyzing.tsx
git commit -m "feat(quiz): add QuizAnalyzing loading animation"
```

---

## Task 10: QuizResult + Radar Chart

**Files:**
- Create: `src/components/quiz/QuizResult.tsx`

- [ ] **Step 1: Write result page with radar chart**

```tsx
// src/components/quiz/QuizResult.tsx
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { MARKETER_TYPE_INFO, MARKETER_TYPES } from "../../lib/quiz/types";
import type { QuizResult as QuizResultType, MarketerTypeId } from "../../lib/quiz/types";
import QuizResources from "./QuizResources";
import ShareCard from "./ShareCard";

interface QuizResultProps {
  result: QuizResultType;
  resultId: string | null;
  onRetake: () => void;
}

export default function QuizResult({ result, resultId, onRetake }: QuizResultProps) {
  const primary = MARKETER_TYPE_INFO[result.primaryType];
  const growthArea = MARKETER_TYPE_INFO[result.growthArea];

  const radarData = MARKETER_TYPES.map((typeId) => ({
    type: MARKETER_TYPE_INFO[typeId].name.replace("The ", ""),
    score: result.scores.normalized[typeId] ?? 0,
  }));

  // Top 3 strengths (sorted by score, excluding primary since it's shown separately)
  const topStrengths = [...MARKETER_TYPES]
    .sort((a, b) => (result.scores.raw[b] ?? 0) - (result.scores.raw[a] ?? 0))
    .slice(0, 3);

  const shareUrl = resultId
    ? `${window.location.origin}/tools/marketer-quiz?r=${resultId}`
    : null;

  const shareText = `I'm "${primary.name}" — ${primary.tagline}. Take the free marketing quiz to discover your type!`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      {/* Primary Type */}
      <div className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider uppercase bg-terracotta/10 text-terracotta rounded-full mb-4"
        >
          Your Marketing Archetype
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-heading text-4xl md:text-5xl font-bold text-navy mb-3"
        >
          {primary.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-accent italic text-terracotta text-lg mb-6"
        >
          {primary.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate max-w-xl mx-auto leading-relaxed"
        >
          {primary.description}
        </motion.p>
      </div>

      {/* Radar Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-sand/30 p-6 mb-8"
      >
        <h3 className="font-heading font-semibold text-navy text-center mb-4">
          Your Marketing DNA
        </h3>
        <div className="w-full h-[350px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="#B8A99A" strokeOpacity={0.3} />
              <PolarAngleAxis
                dataKey="type"
                tick={{ fontSize: 11, fill: "#4A4A4A" }}
              />
              <Radar
                dataKey="score"
                stroke="#6B4226"
                fill="#6B4226"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Top Strengths */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid md:grid-cols-3 gap-4 mb-8"
      >
        {topStrengths.map((typeId, i) => {
          const info = MARKETER_TYPE_INFO[typeId];
          return (
            <div
              key={typeId}
              className="bg-white rounded-xl border border-sand/30 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-terracotta">
                  #{i + 1}
                </span>
                <span className="font-heading font-semibold text-navy text-sm">
                  {info.name.replace("The ", "")}
                </span>
              </div>
              <div className="h-1.5 bg-sand/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-terracotta rounded-full transition-all duration-500"
                  style={{ width: `${result.scores.normalized[typeId]}%` }}
                />
              </div>
              <span className="text-xs text-slate/60 mt-1 block">
                {result.scores.normalized[typeId]}%
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Growth Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-dusty-blue/5 rounded-xl border border-dusty-blue/20 p-5 mb-8"
      >
        <h3 className="font-heading font-semibold text-dusty-blue text-sm uppercase tracking-wider mb-2">
          Your Growth Area
        </h3>
        <p className="font-heading font-semibold text-navy mb-1">
          {growthArea.name}
        </p>
        <p className="text-slate text-sm">{growthArea.growthTip}</p>
      </motion.div>

      {/* Resources */}
      <QuizResources
        primaryType={result.primaryType}
        growthArea={result.growthArea}
      />

      {/* Share + Download */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-10 pt-8 border-t border-sand/30"
      >
        <h3 className="font-heading font-semibold text-navy text-center mb-6">
          Share Your Result
        </h3>

        <ShareCard result={result} />

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {shareUrl && (
            <>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0077B5] text-white text-sm font-semibold rounded-lg hover:bg-[#006097] transition-colors"
              >
                Share on LinkedIn
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy/80 transition-colors"
              >
                Share on X
              </a>
            </>
          )}
          <button
            onClick={() => {
              if (shareUrl) {
                navigator.clipboard.writeText(shareUrl);
              }
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sand/20 text-navy text-sm font-semibold rounded-lg hover:bg-sand/30 transition-colors cursor-pointer"
          >
            Copy Link
          </button>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={onRetake}
            className="text-sm text-slate/60 hover:text-terracotta transition-colors underline underline-offset-4 cursor-pointer"
          >
            Retake the quiz
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/quiz/QuizResult.tsx
git commit -m "feat(quiz): add QuizResult with radar chart and share buttons"
```

---

## Task 11: QuizResources Component

**Files:**
- Create: `src/components/quiz/QuizResources.tsx`

- [ ] **Step 1: Write resources section**

```tsx
// src/components/quiz/QuizResources.tsx
import { motion } from "framer-motion";
import type { MarketerTypeId } from "../../lib/quiz/types";
import { MARKETER_TYPE_INFO } from "../../lib/quiz/types";
import { RESOURCES } from "../../lib/quiz/resources";

interface QuizResourcesProps {
  primaryType: MarketerTypeId;
  growthArea: MarketerTypeId;
}

const TYPE_ICONS: Record<string, string> = {
  book: "📖",
  course: "🎓",
  tool: "🛠",
};

export default function QuizResources({ primaryType, growthArea }: QuizResourcesProps) {
  const primaryResources = RESOURCES[primaryType] ?? [];
  const growthResources = RESOURCES[growthArea] ?? [];
  const primaryInfo = MARKETER_TYPE_INFO[primaryType];
  const growthInfo = MARKETER_TYPE_INFO[growthArea];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
    >
      <h3 className="font-heading text-xl font-bold text-navy mb-6">
        Level Up Your Skills
      </h3>

      {/* Primary type resources */}
      <div className="mb-8">
        <h4 className="font-heading font-semibold text-navy text-sm uppercase tracking-wider mb-3">
          Deepen your strength &mdash; {primaryInfo.name}
        </h4>
        <div className="space-y-3">
          {primaryResources.map((resource) => (
            <a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-xl border border-sand/30 p-4 hover:border-terracotta/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">
                  {TYPE_ICONS[resource.type]}
                </span>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-heading font-semibold text-navy group-hover:text-terracotta transition-colors">
                      {resource.title}
                    </span>
                    {resource.author && (
                      <span className="text-xs text-slate/50">
                        by {resource.author}
                      </span>
                    )}
                    <span className="text-[10px] uppercase tracking-wider text-slate/40 font-medium px-1.5 py-0.5 bg-sand/10 rounded">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate/70 mt-1 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Growth area resources */}
      {growthArea !== primaryType && (
        <div>
          <h4 className="font-heading font-semibold text-dusty-blue text-sm uppercase tracking-wider mb-3">
            Close your gap &mdash; {growthInfo.name}
          </h4>
          <div className="space-y-3">
            {growthResources.slice(0, 2).map((resource) => (
              <a
                key={resource.title}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-dusty-blue/5 rounded-xl border border-dusty-blue/15 p-4 hover:border-dusty-blue/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0 mt-0.5">
                    {TYPE_ICONS[resource.type]}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-heading font-semibold text-navy group-hover:text-dusty-blue transition-colors">
                        {resource.title}
                      </span>
                      {resource.author && (
                        <span className="text-xs text-slate/50">
                          by {resource.author}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate/70 mt-1 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/quiz/QuizResources.tsx
git commit -m "feat(quiz): add QuizResources section with curated links"
```

---

## Task 12: ShareCard (Canvas PNG Generator)

**Files:**
- Create: `src/components/quiz/ShareCard.tsx`

- [ ] **Step 1: Write canvas-based share card generator**

```tsx
// src/components/quiz/ShareCard.tsx
import { useRef, useCallback } from "react";
import type { QuizResult } from "../../lib/quiz/types";
import { MARKETER_TYPE_INFO, MARKETER_TYPES } from "../../lib/quiz/types";

interface ShareCardProps {
  result: QuizResult;
}

export default function ShareCard({ result }: ShareCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const primary = MARKETER_TYPE_INFO[result.primaryType];

  const generateCard = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = "#FAFAFA";
    ctx.fillRect(0, 0, W, H);

    // Top accent bar
    ctx.fillStyle = "#6B4226";
    ctx.fillRect(0, 0, W, 6);

    // "My Marketing Archetype" label
    ctx.fillStyle = "#6B4226";
    ctx.font = "bold 14px Inter, system-ui, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("MY MARKETING ARCHETYPE", 60, 60);

    // Type name
    ctx.fillStyle = "#1A1A1A";
    ctx.font = "bold 48px Plus Jakarta Sans, system-ui, sans-serif";
    ctx.fillText(primary.name, 60, 120);

    // Tagline
    ctx.fillStyle = "#4A4A4A";
    ctx.font = "italic 20px Lora, Georgia, serif";
    ctx.fillText(primary.tagline, 60, 155);

    // Mini bar chart for top 5
    const sorted = [...MARKETER_TYPES].sort(
      (a, b) => (result.scores.normalized[b] ?? 0) - (result.scores.normalized[a] ?? 0)
    );
    const top5 = sorted.slice(0, 5);
    const barY = 200;
    const barHeight = 24;
    const barGap = 36;
    const maxBarWidth = 500;

    top5.forEach((typeId, i) => {
      const info = MARKETER_TYPE_INFO[typeId];
      const score = result.scores.normalized[typeId] ?? 0;
      const y = barY + i * barGap;

      // Label
      ctx.fillStyle = "#4A4A4A";
      ctx.font = "500 13px Inter, system-ui, sans-serif";
      ctx.fillText(info.name.replace("The ", ""), 60, y + 16);

      // Bar background
      ctx.fillStyle = "#E8E4DF";
      ctx.beginPath();
      ctx.roundRect(260, y, maxBarWidth, barHeight, 4);
      ctx.fill();

      // Bar fill
      ctx.fillStyle = typeId === result.primaryType ? "#6B4226" : "#B8A99A";
      const barWidth = (score / 100) * maxBarWidth;
      ctx.beginPath();
      ctx.roundRect(260, y, barWidth, barHeight, 4);
      ctx.fill();

      // Score
      ctx.fillStyle = "#4A4A4A";
      ctx.font = "600 13px Inter, system-ui, sans-serif";
      ctx.fillText(`${score}%`, 770, y + 16);
    });

    // Branding
    ctx.fillStyle = "#B8A99A";
    ctx.font = "500 14px Inter, system-ui, sans-serif";
    ctx.fillText("juanminoprio.com/tools/marketer-quiz", 60, H - 40);

    // Description (wrapped)
    ctx.fillStyle = "#4A4A4A";
    ctx.font = "400 15px Inter, system-ui, sans-serif";
    const descLines = wrapText(ctx, primary.description, 380);
    descLines.slice(0, 6).forEach((line, i) => {
      ctx.fillText(line, 820, 200 + i * 22);
    });

    // Right side header
    ctx.fillStyle = "#1A1A1A";
    ctx.font = "bold 16px Plus Jakarta Sans, system-ui, sans-serif";
    ctx.fillText("About this type", 820, 175);
  }, [result, primary]);

  const handleDownload = useCallback(() => {
    generateCard();
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `marketer-type-${result.primaryType}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [generateCard, result.primaryType]);

  return (
    <div className="text-center">
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white text-sm font-semibold rounded-lg hover:bg-terracotta/90 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Result Card
      </button>
    </div>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/quiz/ShareCard.tsx
git commit -m "feat(quiz): add ShareCard with canvas PNG generation"
```

---

## Task 13: Astro Page + Navbar Update

**Files:**
- Create: `src/pages/tools/marketer-quiz/index.astro`
- Modify: `src/components/Navbar.astro`

- [ ] **Step 1: Write Astro page shell**

```astro
---
// src/pages/tools/marketer-quiz/index.astro
import BaseLayout from "@/layouts/BaseLayout.astro";
import Navbar from "@components/Navbar.astro";
import Footer from "@components/Footer.astro";
import QuizApp from "@components/quiz/QuizApp";
---

<BaseLayout
  title="What Kind of Marketer Are You? | Free Marketing Quiz"
  description="Discover your marketing archetype across 10 dimensions. Get personalized resources to sharpen your strengths and close your gaps. 2 minutes, 10 questions, no signup."
  ogImage="/images/quiz-og.png"
>
  <Navbar />

  <main id="main" class="pt-24 pb-16 flex-1">
    <QuizApp client:load />
  </main>

  <Footer />
</BaseLayout>
```

- [ ] **Step 2: Update Navbar to link to quiz**

In `src/components/Navbar.astro`, update the navLinks array:

```javascript
const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/#resume" },
  { label: "Tools", href: "/#tools" },
  { label: "Quiz", href: "/tools/marketer-quiz" },
  { label: "Contact", href: "/#contact" },
];
```

Note: Added `/#` prefix to existing links so they work from any page, not just the homepage. Added "Quiz" link.

Also update the navbar to always show (remove scroll-based opacity on non-homepage pages). In the `<script>` section:

```javascript
const navbar = document.getElementById("navbar");
const isHomepage = window.location.pathname === "/";
if (!isHomepage && navbar) {
  navbar.classList.remove("opacity-0", "-translate-y-4");
  navbar.classList.add("opacity-100", "translate-y-0");
}
window.addEventListener("scroll", () => {
  if (!navbar || !isHomepage) return;
  if (window.scrollY > 100) {
    navbar.classList.remove("opacity-0", "-translate-y-4");
    navbar.classList.add("opacity-100", "translate-y-0");
  } else {
    navbar.classList.add("opacity-0", "-translate-y-4");
    navbar.classList.remove("opacity-100", "translate-y-0");
  }
}, { passive: true });
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/tools/marketer-quiz/ src/components/Navbar.astro
git commit -m "feat(quiz): add Astro page and update Navbar with quiz link"
```

---

## Task 14: Netlify Cleanup

**Files:**
- Delete: `netlify.toml`
- Delete: `netlify/` directory
- Modify: `package.json` (remove `@netlify/functions`)

- [ ] **Step 1: Remove stale Netlify artifacts**

```bash
cd ~/Documents/Claude/juanminoprio.com
rm netlify.toml
rm -rf netlify/
rm -rf .netlify/
```

- [ ] **Step 2: Remove @netlify/functions from package.json**

In `package.json`, remove the line:
```
"@netlify/functions": "^5.1.5",
```

Then run:
```bash
npm install
```

- [ ] **Step 3: Verify existing function still works**

```bash
cd ~/Documents/Claude/juanminoprio.com && ls functions/api/
```

Expected: `generate-post.ts` and the new `quiz-result.ts` + `quiz-result/` directory

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove stale Netlify config and dependencies"
```

---

## Task 15: Integration Test + Deploy

- [ ] **Step 1: Run build to catch compile errors**

```bash
cd ~/Documents/Claude/juanminoprio.com && npm run build
```

Expected: Build succeeds with no errors

- [ ] **Step 2: Run scoring tests**

```bash
cd ~/Documents/Claude/juanminoprio.com && npx vitest run
```

Expected: All tests pass

- [ ] **Step 3: Run local dev server and test quiz flow**

```bash
cd ~/Documents/Claude/juanminoprio.com && npm run dev
```

Open `http://localhost:4321/tools/marketer-quiz` and verify:
- Landing page loads with headline and CTA
- Clicking "Discover Your Type" starts the quiz
- Progress bar advances with each question
- Back button works
- After question 10, analyzing animation plays
- Result page shows type, radar chart, strengths, growth area, resources
- Share buttons render
- Download card button generates a PNG
- Retake quiz link works

- [ ] **Step 4: Test Workers API locally**

```bash
cd ~/Documents/Claude/juanminoprio.com && npx wrangler pages dev dist --d1=DB=marketer-quiz-db
```

Verify API endpoints respond correctly (POST save, GET stats, GET by ID).

- [ ] **Step 5: Run D1 migration on production**

```bash
cd ~/Documents/Claude/juanminoprio.com && npx wrangler d1 migrations apply marketer-quiz-db --remote
```

- [ ] **Step 6: Deploy**

```bash
cd ~/Documents/Claude/juanminoprio.com && git push origin main
```

Wait for Cloudflare Pages to build. Verify at `https://juanminoprio.com/tools/marketer-quiz`.

- [ ] **Step 7: Smoke test production**

- Complete the quiz on the live URL
- Verify result saves to D1: `npx wrangler d1 execute marketer-quiz-db --remote --command "SELECT * FROM quiz_results LIMIT 5;"`
- Test share URL works in incognito
- Test on mobile viewport
- Verify homepage and other pages still work (regression check)

- [ ] **Step 8: Final commit if any fixes needed**

```bash
git add -A && git commit -m "fix(quiz): post-deploy fixes" && git push origin main
```
