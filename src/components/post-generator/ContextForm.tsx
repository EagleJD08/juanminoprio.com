import type { Goal } from "@lib/post-generator/types";
interface Props { topic: string; onSubmit: (goal: Goal, angle: string) => void; onBack: () => void; }
export default function ContextForm({ topic, onSubmit, onBack }: Props) {
  return <div>ContextForm placeholder</div>;
}
