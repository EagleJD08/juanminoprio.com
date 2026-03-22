import type { GeneratedPost, Goal, SavedPost } from "@lib/post-generator/types";
interface Props { post: GeneratedPost; topic: string; goal: Goal; angle: string; savedPosts: SavedPost[]; onSavedPostsChange: (posts: SavedPost[]) => void; onBack: () => void; onStartOver: () => void; }
export default function FullPost({ post, topic, goal, angle, savedPosts, onSavedPostsChange, onBack, onStartOver }: Props) {
  return <div>FullPost placeholder</div>;
}
