import type { GeneratedPost } from "@lib/post-generator/types";
interface Props { posts: GeneratedPost[]; onSelect: (index: number) => void; onStartOver: () => void; }
export default function PreviewCards({ posts, onSelect, onStartOver }: Props) {
  return <div>PreviewCards placeholder</div>;
}
