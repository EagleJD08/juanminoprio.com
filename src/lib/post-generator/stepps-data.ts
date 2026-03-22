import type { STEPPSPrinciple } from "./types";

export const STEPPS_PRINCIPLES: STEPPSPrinciple[] = [
  {
    id: "social-currency",
    name: "Social Currency",
    description: "Sharing this makes the reader look smart, informed, or ahead of the curve.",
    teaching:
      "People share things that make them look good. If your post gives readers an insight they can drop in their next meeting, they'll share it — because it makes THEM look like the smart one.",
    tipTemplate:
      "Add a surprising stat or insider insight about {topic} that the reader can reference in conversation. The 'I just learned...' feeling is sharing fuel.",
  },
  {
    id: "triggers",
    name: "Triggers",
    description: "Linked to something the reader encounters daily.",
    teaching:
      "Triggers are environmental reminders. If your post connects to something the reader does every day (checking email, sitting in a meeting, opening an app), they'll think of your post every time they do that thing.",
    tipTemplate:
      "Connect {topic} to a daily activity your audience already does. For example: 'Every time you open LinkedIn...' or 'Next time you're in a strategy meeting...'",
  },
  {
    id: "emotion",
    name: "Emotion",
    description: "Evokes awe, surprise, amusement, or productive anxiety.",
    teaching:
      "High-arousal emotions drive sharing. Awe ('I can't believe I didn't know this'), surprise ('wait, really?'), and even productive anxiety ('am I behind on this?') all trigger the share impulse. Low-arousal emotions (contentment, sadness) don't.",
    tipTemplate:
      "Make the reader feel something about {topic}. A surprising contradiction, an 'am I doing this wrong?' moment, or a genuine 'wow' reaction. Neutral = no shares.",
  },
  {
    id: "public",
    name: "Public",
    description: "Sparks visible engagement others can see.",
    teaching:
      "When people can see others engaging with your content (likes, comments, shares), it creates social proof. Content that generates visible discussion attracts more discussion.",
    tipTemplate:
      "End with a direct question about {topic} that invites opinions. Comments create visible engagement, which attracts more readers. Open-ended questions outperform yes/no questions.",
  },
  {
    id: "practical-value",
    name: "Practical Value",
    description: "The reader can do something with this information.",
    teaching:
      "People share useful things. If your post includes a framework, a step-by-step process, or a specific takeaway the reader can apply today, it passes the 'would I send this to a friend?' test.",
    tipTemplate:
      "Add one concrete action the reader can take about {topic} this week. Specific beats vague: 'try X tool for Y task' is more shareable than 'be more strategic about Y.'",
  },
  {
    id: "stories",
    name: "Stories",
    description: "Wrapped in a narrative people will retell.",
    teaching:
      "People don't share information — they share stories. The story is the delivery vehicle for your insight. 'Here's what happened when...' is always more shareable than 'Here's a principle about...'",
    tipTemplate:
      "Anchor your point about {topic} in a specific story — when it happened, who was involved, what surprised you. Even one sentence of narrative transforms a generic post into a shareable moment.",
  },
];
