import type { QuizQuestion } from "./types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario: "Your company just acquired a new product line. What's your first move?",
    options: [
      { text: "Run rapid experiments to find the most efficient acquisition channel", scores: { "growth-hacker": 3, "performance-marketer": 1 } },
      { text: "Craft a compelling origin story that connects emotionally with the audience", scores: { storyteller: 3, "creative-director": 1 } },
      { text: "Analyze the competitive landscape and craft positioning against key alternatives", scores: { "product-marketer": 3, "data-scientist": 1 } },
      { text: "Build an automated nurture sequence to warm up the existing database", scores: { "automation-architect": 3, "content-engine": 1 } },
    ],
  },
  {
    id: 2,
    scenario: "You're given $50K to spend this quarter. Where does the budget go first?",
    options: [
      { text: "Paid ads with rigorous A/B testing across channels", scores: { "performance-marketer": 3, "growth-hacker": 1 } },
      { text: "A brand campaign that tells a bigger story about who you are", scores: { storyteller: 3, "creative-director": 1 } },
      { text: "Community events and programs that drive user-generated content", scores: { "community-builder": 3, "partnership-builder": 1 } },
      { text: "Analytics infrastructure so you can finally measure everything properly", scores: { "data-scientist": 3, "automation-architect": 1 } },
    ],
  },
  {
    id: 3,
    scenario: "A competitor just launched a feature that directly copies yours. What's your move?",
    options: [
      { text: "Deep dive into the data — how are customers actually responding to this?", scores: { "data-scientist": 3, "product-marketer": 1 } },
      { text: "Create thought leadership content showing your deeper expertise", scores: { "content-engine": 3, storyteller: 1 } },
      { text: "Rally your community and let your advocates speak for you", scores: { "community-builder": 3, "partnership-builder": 1 } },
      { text: "Launch a targeted campaign highlighting your unique positioning", scores: { "performance-marketer": 3, "growth-hacker": 1 } },
    ],
  },
  {
    id: 4,
    scenario: "What topic do you always end up bringing to the marketing team meeting?",
    options: [
      { text: "Funnel metrics, conversion rates, and experiment results", scores: { "growth-hacker": 3, "data-scientist": 1 } },
      { text: "Customer stories, testimonials, and feedback themes", scores: { storyteller: 3, "community-builder": 1 } },
      { text: "New tools, integrations, and workflow automation opportunities", scores: { "automation-architect": 3, "data-scientist": 1 } },
      { text: "Visual campaign concepts and brand consistency observations", scores: { "creative-director": 3, "content-engine": 1 } },
    ],
  },
  {
    id: 5,
    scenario: "You have 2 hours blocked for content creation. What do you make?",
    options: [
      { text: "A data-driven analysis with original research and charts", scores: { "data-scientist": 3, "content-engine": 1 } },
      { text: "A personal story that teaches a business lesson people won't forget", scores: { storyteller: 3, "community-builder": 1 } },
      { text: "A visually stunning campaign concept with mockups", scores: { "creative-director": 3, storyteller: 1 } },
      { text: "A comprehensive SEO-optimized guide that'll rank for months", scores: { "content-engine": 3, "growth-hacker": 1 } },
    ],
  },
  {
    id: 6,
    scenario: "If you could add one specialist to your marketing team, who would it be?",
    options: [
      { text: "A media buyer who can scale paid channels profitably", scores: { "performance-marketer": 3, "growth-hacker": 1 } },
      { text: "A brand designer who elevates everything visually", scores: { "creative-director": 3, storyteller: 1 } },
      { text: "A marketing ops person to automate all the manual workflows", scores: { "automation-architect": 3, "data-scientist": 1 } },
      { text: "A partnerships manager to unlock co-marketing opportunities", scores: { "partnership-builder": 3, "community-builder": 1 } },
    ],
  },
  {
    id: 7,
    scenario: "It's Monday morning. What's the first metric you check?",
    options: [
      { text: "CAC, ROAS, and ad spend efficiency across campaigns", scores: { "performance-marketer": 3, "growth-hacker": 1 } },
      { text: "Engagement rate, comments, and share of voice on social", scores: { "community-builder": 3, "content-engine": 1 } },
      { text: "Pipeline influenced and deals sourced by marketing", scores: { "product-marketer": 3, "partnership-builder": 1 } },
      { text: "Email open rates, flow performance, and automation health", scores: { "automation-architect": 3, "growth-hacker": 1 } },
    ],
  },
  {
    id: 8,
    scenario: "You have a free week for professional development. What do you study?",
    options: [
      { text: "Behavioral psychology — what makes ideas spread and people buy", scores: { storyteller: 3, "product-marketer": 1 } },
      { text: "SQL, analytics platforms, and data visualization tools", scores: { "data-scientist": 3, "automation-architect": 1 } },
      { text: "Negotiation, networking, and relationship building", scores: { "partnership-builder": 3, "community-builder": 1 } },
      { text: "Design thinking, typography, and creative direction", scores: { "creative-director": 3, "content-engine": 1 } },
    ],
  },
  {
    id: 9,
    scenario: "A customer sends detailed product feedback. Your first thought is...",
    options: [
      { text: "How to turn this into a compelling case study or testimonial", scores: { "content-engine": 3, storyteller: 1 } },
      { text: "Whether this represents a pattern I can find in the usage data", scores: { "data-scientist": 3, "product-marketer": 1 } },
      { text: "How to amplify this voice in the community and feature them", scores: { "community-builder": 3, "partnership-builder": 1 } },
      { text: "Which segment this maps to and how to adjust our messaging", scores: { "product-marketer": 3, "performance-marketer": 1 } },
    ],
  },
  {
    id: 10,
    scenario: "If you could lead any marketing project with unlimited resources, what would it be?",
    options: [
      { text: "A viral growth experiment that 10x's signups in a quarter", scores: { "growth-hacker": 3, "performance-marketer": 1 } },
      { text: "A full rebrand with a new visual identity and campaign launch", scores: { "creative-director": 3, storyteller: 1 } },
      { text: "Building the ultimate marketing tech stack from scratch", scores: { "automation-architect": 3, "data-scientist": 1 } },
      { text: "A strategic partnership program with 5 major complementary brands", scores: { "partnership-builder": 3, "product-marketer": 1 } },
    ],
  },
];
