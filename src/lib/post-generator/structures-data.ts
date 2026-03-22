import type { PostStructure } from "./types";

export const POST_STRUCTURES: PostStructure[] = [
  {
    id: "insight-story-takeaway",
    name: "Insight → Story → Takeaway",
    displayName: "Insight → Story → Takeaway",
    description: "Lead with an insight, back it with a story, close with a lesson.",
    sections: [
      {
        name: "Insight",
        role: "The opening claim or observation that sets the frame",
        template: "{hookLine}\n\nHere's what most people get wrong about this:",
      },
      {
        name: "Story",
        role: "A specific example or experience that makes the insight real",
        template:
          "I saw this firsthand when {angle}.\n\nThe thing that surprised me wasn't the result — it was the process. What looked simple on the surface had layers most people never see.",
      },
      {
        name: "Takeaway",
        role: "The lesson the reader walks away with",
        template:
          "The takeaway isn't complicated:\n\n{topic} rewards the people who look deeper, not the ones who move fastest.\n\nWhat's your experience with this? I'm curious if you've seen the same pattern.",
      },
    ],
    goalAffinity: {
      "thought-leadership": 0.9,
      engagement: 0.7,
      "share-lesson": 0.8,
      "start-conversation": 0.6,
      "showcase-expertise": 0.7,
    },
    teaching: {
      howItFlows:
        "Opens with a sharp insight to establish your perspective, supports it with a concrete story for credibility, then distills the lesson into a takeaway the reader can use. The story does the heavy lifting — without it, you're just asserting opinions.",
      whyItFitsTemplate: {
        "thought-leadership":
          "Leading with an insight positions you as someone who sees what others miss. The story proves you're not just theorizing.",
        engagement:
          "The story section creates emotional investment. People engage more with posts that feel personal, not just analytical.",
        "share-lesson":
          "This structure was built for sharing lessons. The insight frames the lesson, the story gives it weight, the takeaway makes it actionable.",
        "start-conversation":
          "The ending question invites responses. People share their own experiences after reading yours.",
        "showcase-expertise":
          "The specificity of your story signals real domain knowledge, not surface-level awareness.",
      },
      sectionNotes: [
        "The Insight sets the frame — it should feel like a perspective, not a fact dump",
        "The Story must be specific (names, numbers, situations) to create credibility",
        "The Takeaway should be concise — one clear lesson, not a list of five",
      ],
    },
  },
  {
    id: "data-breakdown",
    name: "Data Breakdown",
    displayName: "Data Breakdown",
    description: "Lead with a striking data point, unpack what it means.",
    sections: [
      {
        name: "Hook",
        role: "A striking data point that stops the scroll",
        template: "{hookLine}",
      },
      {
        name: "Context",
        role: "What the data shows and why it matters",
        template:
          "Here's what this means in practice:\n\n→ {angle}\n→ The trend has been accelerating for the last 2 years\n→ Most people in {topic} haven't caught up yet",
      },
      {
        name: "So What",
        role: "The implication — what should the reader do with this",
        template:
          "Why does this matter?\n\nBecause {topic} is shifting faster than most people realize. The ones who pay attention to the data — not the hype — will be the ones who come out ahead.\n\nWhat does this data tell you? Drop your take below.",
      },
    ],
    goalAffinity: {
      "thought-leadership": 0.8,
      engagement: 0.5,
      "share-lesson": 0.6,
      "start-conversation": 0.7,
      "showcase-expertise": 0.9,
    },
    teaching: {
      howItFlows:
        "Anchors the reader with a concrete number, then unpacks what it means layer by layer. The 'so what?' section is crucial — without it, you're sharing a fun fact, not an insight.",
      whyItFitsTemplate: {
        "thought-leadership":
          "Data-driven posts signal analytical rigor. You're not just sharing opinions — you're reading the evidence.",
        engagement:
          "Surprising numbers trigger the 'I need to share this' response. Data posts get saved and referenced.",
        "share-lesson":
          "The data becomes the proof for your lesson. Numbers make lessons feel inevitable, not arbitrary.",
        "start-conversation":
          "Asking 'what does this data tell you?' invites analytical responses — higher quality comments.",
        "showcase-expertise":
          "Knowing which data to surface, and how to interpret it, is a rare skill. This structure puts it on display.",
      },
      sectionNotes: [
        "The data point must be specific — vague stats kill credibility",
        "The Context section should list 2-3 implications, not just restate the number",
        "The 'So What' must connect the data to the reader's world",
      ],
    },
  },
  {
    id: "heres-what-i-learned",
    name: "Here's What I Learned",
    displayName: "Here's What I Learned",
    description: "Share what you did, what happened, and the lessons.",
    sections: [
      {
        name: "What I Did",
        role: "Set up the context — what you tried or experienced",
        template: "{hookLine}\n\nI decided to go deep on {topic} to see what actually works vs. what people just talk about.",
      },
      {
        name: "What Happened",
        role: "The results, surprises, or failures",
        template:
          "Here's what I found:\n\n1. {angle} — this was the biggest surprise\n2. The conventional approach works, but only about 60% of the time\n3. The thing nobody tells you: the first attempt almost always fails. The learning happens in the iteration.",
      },
      {
        name: "Lessons",
        role: "Distilled takeaways the reader can apply",
        template:
          "If I had to distill everything into 3 lessons:\n\n→ Start smaller than you think you should\n→ The data will tell you what's working — if you're measuring the right things\n→ {topic} is a skill, not a talent. The people who are good at it just have more reps.\n\nWhat would you add to this list?",
      },
    ],
    goalAffinity: {
      "thought-leadership": 0.6,
      engagement: 0.8,
      "share-lesson": 1.0,
      "start-conversation": 0.7,
      "showcase-expertise": 0.6,
    },
    teaching: {
      howItFlows:
        "Sets up the experiment or experience, shares honest results (including failures), then distills actionable lessons. The vulnerability of sharing what went wrong makes this structure deeply engaging.",
      whyItFitsTemplate: {
        "thought-leadership":
          "Sharing your learning journey positions you as a growth-oriented thinker, not just a know-it-all.",
        engagement:
          "The bullet-point lessons are highly saveable. People bookmark practical takeaways.",
        "share-lesson":
          "This is the purest lesson-sharing structure. It walks the reader through your exact learning path.",
        "start-conversation":
          "Ending with 'what would you add?' invites people to share their own lessons — great for comments.",
        "showcase-expertise":
          "The specificity of your experience signals depth. You didn't just read about it — you did it.",
      },
      sectionNotes: [
        "Be honest about what didn't work — vulnerability builds trust",
        "Lessons should be actionable, not philosophical",
        "The 'what would you add?' ending drives more comments than any other CTA",
      ],
    },
  },
  {
    id: "myth-busting",
    name: "Myth-Busting",
    displayName: "Myth-Busting",
    description: "Challenge a common belief, reveal what's actually true.",
    sections: [
      {
        name: "The Myth",
        role: "State the common belief you're challenging",
        template: "{hookLine}\n\nThis belief is everywhere. And on the surface, it makes sense. But look closer and the cracks start to show.",
      },
      {
        name: "The Evidence",
        role: "Show why the myth doesn't hold up",
        template:
          "Here's what's actually happening:\n\n{angle}\n\nThe reason this myth persists is that it used to be true. But {topic} has changed. The playbook that worked 3 years ago is now actively misleading people.",
      },
      {
        name: "The Reality",
        role: "Reveal what's actually true and how to think about it",
        template:
          "Here's the nuance most people miss:\n\nIt's not that {topic} doesn't work — it's that it works differently than people think. The difference between the myth and reality isn't dramatic. It's subtle. And subtle is where the edge is.\n\nHave you seen this myth play out? I'd love to hear your take.",
      },
    ],
    goalAffinity: {
      "thought-leadership": 0.9,
      engagement: 0.8,
      "share-lesson": 0.7,
      "start-conversation": 0.9,
      "showcase-expertise": 0.8,
    },
    teaching: {
      howItFlows:
        "States the myth everyone believes, then systematically dismantles it with evidence, then reveals the nuanced truth. The power is in the reveal — the reader's mental model shifts.",
      whyItFitsTemplate: {
        "thought-leadership":
          "Nothing signals expertise like being able to see through conventional wisdom. Myth-busting positions you as the person who thinks deeper.",
        engagement:
          "Contrarian content triggers strong emotional responses. People either agree passionately or want to debate — both drive engagement.",
        "share-lesson":
          "The myth becomes the frame for the lesson. People remember 'the thing I used to believe that turned out to be wrong.'",
        "start-conversation":
          "Myth-busting posts are comment magnets. People want to share their own myth-busting experiences.",
        "showcase-expertise":
          "Explaining *why* the myth exists shows deep domain understanding, not just surface-level knowledge.",
      },
      sectionNotes: [
        "The myth must be specific and recognizable — if the reader doesn't believe it, the post falls flat",
        "The evidence should be concrete, not just 'in my experience'",
        "The reality section must have nuance — 'it's complicated' is more credible than 'the opposite is true'",
      ],
    },
  },
  {
    id: "framework-application",
    name: "Framework Application",
    displayName: "Framework Application",
    description: "Apply a mental model or framework to a real situation.",
    sections: [
      {
        name: "The Framework",
        role: "Name and briefly explain the framework",
        template:
          "{hookLine}\n\nThere's a framework that explains exactly why this happens. It's simple, but once you see it, you can't unsee it.",
      },
      {
        name: "The Application",
        role: "Apply the framework to a real, specific example",
        template:
          "Here's how it works in practice:\n\nWhen you look at {topic} through this lens, {angle} makes perfect sense. The framework doesn't just describe what happened — it predicts what happens next.\n\nStep 1: Identify the core tension\nStep 2: Map it to the framework\nStep 3: The answer becomes obvious",
      },
      {
        name: "The Unlock",
        role: "Show what the framework reveals that isn't obvious",
        template:
          "The thing most people miss about {topic}:\n\nIt's not about doing more. It's about seeing the pattern. Once you have the right framework, the decisions that used to feel hard become straightforward.\n\nTry this: next time you're facing a decision about {topic}, run it through this lens. You'll be surprised how clear things get.",
      },
    ],
    goalAffinity: {
      "thought-leadership": 0.8,
      engagement: 0.6,
      "share-lesson": 0.7,
      "start-conversation": 0.5,
      "showcase-expertise": 1.0,
    },
    teaching: {
      howItFlows:
        "Names a framework, applies it step-by-step to a real example, then reveals the non-obvious insight. The reader walks away with a tool they can use, not just information they've consumed.",
      whyItFitsTemplate: {
        "thought-leadership":
          "Having frameworks signals structured thinking. You're not just reacting — you have a system for understanding.",
        engagement:
          "The step-by-step nature makes people feel like they're learning something actionable — a top driver of saves.",
        "share-lesson":
          "The framework IS the lesson, packaged in a reusable form. This is the most 'save this for later' structure.",
        "start-conversation":
          "The 'try this' CTA at the end is a call to action, but it's less discussion-oriented than other structures.",
        "showcase-expertise":
          "This is the ultimate expertise showcase. Knowing which framework to apply, and applying it cleanly, is a rare skill.",
      },
      sectionNotes: [
        "Name the framework clearly — 'there's a concept' is weaker than 'the Jobs-to-be-Done framework'",
        "The application must be specific — apply it to a real company, decision, or situation",
        "The unlock should feel like an 'aha' moment — the reader sees something they didn't before",
      ],
    },
  },
];
