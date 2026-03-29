import type { MarketerTypeId, Resource } from "./types";

export const RESOURCES: Record<MarketerTypeId, Resource[]> = {
  "growth-hacker": [
    { title: "Hacking Growth", author: "Sean Ellis & Morgan Brown", type: "book", url: "https://www.amazon.com/Hacking-Growth-Fastest-Growing-Companies-Breakout/dp/045149721X", description: "The playbook that coined the term — systematic approach to rapid experimentation across the customer journey." },
    { title: "Reforge Growth Series", type: "course", url: "https://www.reforge.com/growth-series", description: "The gold standard in growth education — taught by practitioners from Hubspot, Dropbox, and Eventbrite." },
    { title: "Amplitude", type: "tool", url: "https://amplitude.com", description: "Product analytics platform for tracking user behavior, funnels, and experiment results." },
    { title: "Pipeline Visionaries", type: "podcast", url: "https://www.demandgenvisionaries.com/", description: "Weekly interviews with B2B CMOs spilling the exact plays they use to build pipeline machines at scale." },
    { title: "Demand Curve Growth Newsletter", author: "Neal O'Grady & Julian Shapiro", type: "newsletter", url: "https://www.demandcurve.com/newsletter", description: "Twice-weekly growth tactics sent to 100K+ operators — no fluff, just systematic experiments and playbooks that compound." },
  ],
  storyteller: [
    { title: "Building a StoryBrand", author: "Donald Miller", type: "book", url: "https://www.amazon.com/Building-StoryBrand-Clarify-Message-Customers/dp/0718033329", description: "Framework for making your customer the hero of the story — the most practical brand storytelling book." },
    { title: "Contagious: Why Things Catch On", author: "Jonah Berger", type: "book", url: "https://www.amazon.com/Contagious-Things-Catch-Jonah-Berger/dp/1451686587", description: "The STEPPS framework for understanding why ideas spread — backed by research, not guesswork." },
    { title: "Hemingway Editor", type: "tool", url: "https://hemingwayapp.com", description: "Makes your writing bold and clear — highlights complex sentences and suggests simpler alternatives." },
    { title: "Pixar in a Box: The Art of Storytelling", author: "Pixar x Khan Academy", type: "course", url: "https://www.khanacademy.org/computing/pixar/storytelling", description: "Free six-module course taught by actual Pixar directors — character, structure, and visual language from the masters." },
    { title: "The StoryBrand Podcast", author: "Donald Miller", type: "podcast", url: "https://podcasts.apple.com/us/podcast/the-storybrand-podcast/id1092751338", description: "Donald Miller's weekly breakdown of how to use narrative frameworks to make your marketing message impossibly clear." },
  ],
  "data-scientist": [
    { title: "Lean Analytics", author: "Alistair Croll & Benjamin Yoskovitz", type: "book", url: "https://www.amazon.com/Lean-Analytics-Better-Startup-Faster/dp/1449335675", description: "How to pick the right metric for your stage and use data to make decisions, not just dashboards." },
    { title: "Google Data Analytics Certificate", type: "course", url: "https://www.coursera.org/professional-certificates/google-data-analytics", description: "Foundational data skills — spreadsheets, SQL, Tableau, and R — from Google on Coursera." },
    { title: "Looker Studio", type: "tool", url: "https://lookerstudio.google.com", description: "Free dashboarding tool that connects to everything — turn your data into visual stories." },
    { title: "The Analytics Power Hour", author: "Michael Helbling, Moe Kiss & Tim Wilson", type: "podcast", url: "https://analyticshour.io/", description: "Biweekly deep-dives from analytics veterans who debate everything from Bayesian stats to semantic layers — practical for practitioners, strategic for leaders." },
    { title: "StatQuest with Josh Starmer", author: "Josh Starmer, PhD", type: "youtube", url: "https://www.youtube.com/@statquest", description: "1.5M+ subscribers learning statistics through absurdly catchy jingles and whiteboard breakdowns — makes regression and neural networks feel like common sense." },
  ],
  "community-builder": [
    { title: "The Business of Belonging", author: "David Spinks", type: "book", url: "https://www.amazon.com/Business-Belonging-Community-Competitive-Advantage/dp/1119766125", description: "The definitive guide to building community as a business strategy, not just a nice-to-have." },
    { title: "CMX Community Strategy", type: "course", url: "https://cmxhub.com/academy", description: "Industry-standard community management certification — strategy, metrics, and engagement tactics." },
    { title: "Circle", type: "tool", url: "https://circle.so", description: "Modern community platform built for creators and brands — discussions, events, courses in one place." },
    { title: "Community Pulse", author: "Mary Thengvall & PJ Hagerty", type: "podcast", url: "https://www.communitypulse.io/", description: "Ten years and 100+ episodes of community leadership strategy from DevRel veterans — the only community-building podcast still publishing consistently." },
    { title: "Rosieland", author: "Rosie Sherry", type: "newsletter", url: "https://rosie.land/", description: "300+ roundups of curated community-building wisdom from the founder of Ministry of Testing — part newsletter, part living encyclopedia." },
  ],
  "content-engine": [
    { title: "They Ask, You Answer", author: "Marcus Sheridan", type: "book", url: "https://www.amazon.com/They-Ask-You-Answer-Revolutionary/dp/1119610141", description: "Answer your customers' real questions and watch organic traffic compound — the content strategy that actually works." },
    { title: "HubSpot Content Marketing Certification", type: "course", url: "https://academy.hubspot.com/courses/content-marketing", description: "Free certification covering content strategy, creation, promotion, and analytics." },
    { title: "Ahrefs", type: "tool", url: "https://ahrefs.com", description: "SEO and content research powerhouse — keyword research, competitor analysis, and content gap identification." },
    { title: "Ahrefs YouTube Channel", author: "Sam Oh", type: "youtube", url: "https://www.youtube.com/@ahrefs", description: "600K+ subscribers watching the most methodical SEO and content marketing tutorials on YouTube — keyword research and link building turned into repeatable systems." },
    { title: "Content Marketing Institute Newsletter", type: "newsletter", url: "https://contentmarketinginstitute.com/newsletter-subscribe", description: "The institution that named the discipline — research, case studies, and frameworks for building content programs that actually drive pipeline." },
  ],
  "performance-marketer": [
    { title: "Ultimate Guide to Google Ads", author: "Perry Marshall", type: "book", url: "https://www.amazon.com/Ultimate-Guide-Google-Ads-Perry/dp/1599186349", description: "The bible of paid search — covers strategy, bidding, ad copy, and scaling profitably." },
    { title: "Meta Blueprint Certification", type: "course", url: "https://www.facebook.com/business/learn/certification", description: "Official Meta advertising certification — master Facebook and Instagram ad platforms." },
    { title: "Triple Whale", type: "tool", url: "https://triplewhale.com", description: "Attribution and analytics for paid marketers — finally understand true ROAS across channels." },
    { title: "Solutions 8", author: "Kasim Aslam", type: "youtube", url: "https://www.youtube.com/@solutions8", description: "Live account audits and advanced Google Ads strategy from the agency managing millions in ad spend — the free resource that replaced most paid PPC courses." },
    { title: "Perpetual Traffic", author: "Ralph Burns & Lauren Petrullo", type: "podcast", url: "https://perpetualtraffic.com/", description: "600+ episodes deep — the longest-running paid media podcast covers everything from Meta creative diversification to scaling profitably." },
  ],
  "product-marketer": [
    { title: "Obviously Awesome", author: "April Dunford", type: "book", url: "https://www.amazon.com/Obviously-Awesome-Product-Positioning-Customers/dp/1999023005", description: "The positioning playbook — step-by-step framework for making your product's value obvious." },
    { title: "Lenny's Newsletter", type: "newsletter", url: "https://www.lennysnewsletter.com", description: "The #1 product and growth newsletter — practical frameworks from top PMs and PMMs." },
    { title: "Klue", type: "tool", url: "https://klue.com", description: "Competitive intelligence platform — track competitors, enable sales, and stay ahead of the market." },
    { title: "Lenny's Podcast", author: "Lenny Rachitsky", type: "podcast", url: "https://www.lennysnewsletter.com/podcast", description: "The #1 product podcast — candid conversations with PMs from Airbnb, Stripe, and Figma covering positioning, growth, and go-to-market." },
    { title: "Product Marketing Certified: Core", author: "Product Marketing Alliance", type: "course", url: "https://www.productmarketingalliance.com/learning/on-demand/product-marketing-certified-core/", description: "The gold-standard PMM certification — 12+ hours built with PMMs at Google, Adobe, and LinkedIn." },
  ],
  "creative-director": [
    { title: "Steal Like an Artist", author: "Austin Kleon", type: "book", url: "https://www.amazon.com/Steal-Like-Artist-Things-Creative/dp/0761169253", description: "A manifesto for creative work — how to find inspiration, develop your voice, and ship creative work." },
    { title: "Figma for Beginners", type: "course", url: "https://help.figma.com/hc/en-us/categories/360002051613", description: "Official Figma tutorials — learn the design tool that's become the industry standard." },
    { title: "Figma", type: "tool", url: "https://figma.com", description: "Collaborative design platform — mockups, prototypes, and design systems in one place." },
    { title: "The Futur", author: "Chris Do", type: "youtube", url: "https://www.youtube.com/@thefutur", description: "2.6M subscribers watching an Emmy-winning creative director teach the business of design — pricing, negotiations, and branding strategy most design schools skip." },
    { title: "ADPList", type: "community", url: "https://adplist.org/", description: "38,000+ verified mentors across 140 countries offering free 1:1 sessions — democratized access to senior creative directors and design leaders." },
  ],
  "partnership-builder": [
    { title: "Never Eat Alone", author: "Keith Ferrazzi", type: "book", url: "https://www.amazon.com/Never-Eat-Alone-Expanded-Updated/dp/0385346654", description: "The networking bible — how to build genuine relationships that create mutual value." },
    { title: "Partnership Leaders Community", type: "community", url: "https://partnershipleaders.com", description: "The largest community for partnership professionals — resources, events, and certification." },
    { title: "PartnerStack", type: "tool", url: "https://partnerstack.com", description: "Partnership management platform — recruit, manage, and scale partner programs." },
    { title: "The Partnership Economy", author: "David A. Yovanno & Todd Crawford", type: "podcast", url: "https://impact.com/podcasts/the-partnership-economy-podcast/", description: "impact.com's CEO and co-founder unpack affiliate, creator, and B2B partnerships with guests from Pinterest, TikTok, and Hello Sunshine." },
    { title: "ELG Insider by Crossbeam", type: "newsletter", url: "https://insider.crossbeam.com/", description: "The weekly briefing for ecosystem-led growth — tactics, data, and case studies on turning partner signals into bigger deals." },
  ],
  "automation-architect": [
    { title: "Marketing Automation for Dummies", author: "Mathew Sweezey", type: "book", url: "https://www.amazon.com/Marketing-Automation-Dummies-Mathew-Sweezey/dp/1118772229", description: "Practical guide to building automated marketing systems — strategy before tools." },
    { title: "HubSpot Marketing Software Certification", type: "course", url: "https://academy.hubspot.com/courses/marketing-software", description: "Free certification on the most popular marketing automation platform — hands-on and practical." },
    { title: "Make (formerly Integromat)", type: "tool", url: "https://www.make.com", description: "Visual automation platform — connect any tools and build workflows without code." },
    { title: "Kevin Stratvert", author: "Kevin Stratvert", type: "youtube", url: "https://www.youtube.com/@KevinStratvert", description: "5.8M subscribers trust this ex-Microsoft PM for no-nonsense automation tutorials — Make.com, Zapier, Power Automate, and every productivity tool worth knowing." },
    { title: "MarTech", type: "newsletter", url: "https://martech.org/newsletters/", description: "The daily brief that 200K+ marketers open every morning — platform updates, martech stack analysis, and the signal to cut through automation tool noise." },
  ],
};
