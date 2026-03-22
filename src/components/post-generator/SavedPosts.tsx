import type { SavedPost } from "@lib/post-generator/types";
interface Props { posts: SavedPost[]; isOpen: boolean; onToggle: () => void; onPostsChange: (posts: SavedPost[]) => void; }
export default function SavedPosts({ posts, isOpen, onToggle, onPostsChange }: Props) {
  return <div>SavedPosts placeholder</div>;
}
