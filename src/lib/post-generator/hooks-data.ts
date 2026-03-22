import type { HookFormula } from "./types";

export const HOOK_FORMULAS: HookFormula[] = [
  {
    id: "curiosity-gap",
    name: "Curiosity Gap",
    description: "Opens a loop the reader needs to close.",
    templates: [
      "Most people think {topic} is straightforward. The reality is far more interesting.",
      "There's a reason the best professionals approach {topic} differently — and it's not what you'd expect.",
      "I've been studying {topic} for a while now. One thing keeps surprising me.",
      "Everyone's talking about {topic}. Almost nobody's talking about the part that actually matters.",
    ],
    goalAffinity: {
      "thought-leadership": 0.7,
      engagement: 0.9,
      "share-lesson": 0.6,
      "start-conversation": 0.8,
      "showcase-expertise": 0.5,
    },
    steppsNatural: ["social-currency", "emotion"],
    teaching: {
      whatItIs:
        "A curiosity gap opens a loop in the reader's mind that they need to close. It hints at surprising information without revealing it, making the reader feel compelled to keep reading.",
      whyItWorksTemplate:
        "Your topic — {topic} — has a natural gap between what people assume and what's actually true. By hinting at this gap, you create a 'need to know' feeling. Your angle ({angle}) is the unexpected piece that closes the loop.",
      examples: [
        "Most people think remote work is about flexibility. The data says something different.",
        "There's a reason Apple doesn't do focus groups — and it's not arrogance.",
      ],
    },
  },
  {
    id: "bold-claim",
    name: "Bold Claim",
    description: "Leads with a strong, specific opinion that demands attention.",
    templates: [
      "The conventional wisdom about {topic} is wrong. Here's what I've seen instead.",
      "{topic} is the most misunderstood concept in our industry right now.",
      "Unpopular opinion: most of what you've been told about {topic} doesn't hold up anymore.",
      "If you're still approaching {topic} the old way, you're leaving value on the table.",
    ],
    goalAffinity: {
      "thought-leadership": 0.9,
      engagement: 0.7,
      "share-lesson": 0.5,
      "start-conversation": 0.9,
      "showcase-expertise": 0.8,
    },
    steppsNatural: ["social-currency", "emotion", "public"],
    teaching: {
      whatItIs:
        "A bold claim stops the scroll by making a strong, specific statement that challenges what people believe. It positions you as someone with a distinct point of view — not just repeating what everyone else says.",
      whyItWorksTemplate:
        "Your topic — {topic} — is something many people have opinions about. By leading with a bold claim, you immediately stand out from the noise. Your unique angle ({angle}) gives you the credibility to back it up.",
      examples: [
        "The best marketing campaign of 2025 wasn't from a marketing team.",
        "AI won't replace marketers. But marketers who use AI will replace those who don't.",
      ],
    },
  },
  {
    id: "data-led",
    name: "Data-Led",
    description: "Lets a surprising number do the heavy lifting.",
    templates: [
      "Here's a number that changed how I think about {topic}: {angle}.",
      "I was looking at data on {topic} last week and noticed something most people miss.",
      "One stat about {topic} tells you everything you need to know about where things are headed.",
      "The data on {topic} doesn't lie — and it's telling a story most people aren't reading.",
    ],
    goalAffinity: {
      "thought-leadership": 0.8,
      engagement: 0.6,
      "share-lesson": 0.7,
      "start-conversation": 0.7,
      "showcase-expertise": 0.9,
    },
    steppsNatural: ["social-currency", "practical-value"],
    teaching: {
      whatItIs:
        "A data-led hook uses a specific, surprising number to anchor the reader's attention. Numbers create instant credibility and trigger curiosity when they challenge expectations.",
      whyItWorksTemplate:
        "Data about {topic} instantly signals that this post is grounded in evidence, not opinion. Your angle ({angle}) adds a specific, concrete detail. Readers share data-driven posts because it makes them look informed.",
      examples: [
        "87% of marketers say they use AI. Only 12% can explain what it actually does for them.",
        "Starbucks spends $400M on marketing every year. But their best growth channel costs $0.",
      ],
    },
  },
  {
    id: "story-led",
    name: "Story-Led",
    description: "Drops the reader into a scene or moment.",
    templates: [
      "Last week, something happened that completely changed how I think about {topic}.",
      "I was in a meeting when someone asked a question about {topic} that nobody could answer.",
      "Three months ago, I made a bet on {topic}. Here's what happened.",
      "The moment I realized everything I knew about {topic} was wrong.",
    ],
    goalAffinity: {
      "thought-leadership": 0.5,
      engagement: 0.8,
      "share-lesson": 0.9,
      "start-conversation": 0.6,
      "showcase-expertise": 0.4,
    },
    steppsNatural: ["emotion", "stories"],
    teaching: {
      whatItIs:
        "A story-led hook drops the reader into a specific moment or scene. It creates an emotional connection before any analysis begins. People are wired to follow stories — it's the oldest attention hack.",
      whyItWorksTemplate:
        "Your topic — {topic} — becomes relatable when anchored to a real experience. Starting with a story lets your angle ({angle}) feel like a discovery rather than a lecture. Readers follow stories to the end.",
      examples: [
        "In 2019, Airbnb made a bet that everyone said was crazy.",
        "I was looking at our Q3 numbers when I noticed something that didn't add up.",
      ],
    },
  },
  {
    id: "contrarian",
    name: "Contrarian",
    description: "Challenges what people assume to be true.",
    templates: [
      "Stop doing {topic} the way everyone tells you to. It hasn't worked since 2023.",
      "The 'best practice' around {topic} is actually hurting more people than it helps.",
      "Everyone's chasing {topic}. The smartest people I know are doing the opposite.",
      "Here's the uncomfortable truth about {topic} that nobody wants to say out loud.",
    ],
    goalAffinity: {
      "thought-leadership": 0.8,
      engagement: 0.9,
      "share-lesson": 0.6,
      "start-conversation": 1.0,
      "showcase-expertise": 0.7,
    },
    steppsNatural: ["social-currency", "emotion", "public"],
    teaching: {
      whatItIs:
        "A contrarian hook challenges a widely-held belief or common practice. It works because disagreement triggers high-arousal emotions — people either feel validated or provoked, both of which drive engagement.",
      whyItWorksTemplate:
        "Your topic — {topic} — has conventional wisdom around it that deserves to be challenged. Your angle ({angle}) provides the credibility to go against the grain. Contrarian posts generate the most comments because people feel compelled to weigh in.",
      examples: [
        "Stop A/B testing everything. Most of your tests are statistically meaningless.",
        "Networking events are a waste of time. Here's what actually builds your network.",
      ],
    },
  },
];
