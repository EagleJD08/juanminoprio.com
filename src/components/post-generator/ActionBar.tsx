import { useState } from "react";
import { Copy, Pencil, BookmarkPlus, Download, Check } from "lucide-react";
import type { GeneratedPost, Goal, SavedPost } from "@lib/post-generator/types";
import { savePost, generateId } from "@lib/post-generator/storage";

interface Props {
  post: GeneratedPost;
  topic: string;
  goal: Goal;
  content: string; // current content (may be edited)
  isEditing: boolean;
  onToggleEdit: () => void;
  savedPosts: SavedPost[];
  onSavedPostsChange: (posts: SavedPost[]) => void;
}

export default function ActionBar({
  post,
  topic,
  goal,
  content,
  isEditing,
  onToggleEdit,
  savedPosts,
  onSavedPostsChange,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    const newPost: SavedPost = {
      id: generateId(),
      topic,
      goal,
      content,
      hookFormulaName: post.hookFormula.name,
      structureName: post.structure.name,
      steppsTotal: post.steppsScore.total,
      savedAt: new Date().toISOString(),
    };
    const updated = savePost(newPost);
    onSavedPostsChange(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `linkedin-post-${topic.slice(0, 30).replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-terracotta text-cream rounded-lg hover:bg-terracotta/90 transition-colors"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        {copied ? "Copied!" : "Copy"}
      </button>

      <button
        onClick={onToggleEdit}
        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
          isEditing
            ? "bg-navy text-cream"
            : "bg-white border border-sand text-navy hover:bg-cream"
        }`}
      >
        <Pencil className="w-4 h-4" />
        {isEditing ? "Done Editing" : "Edit"}
      </button>

      <button
        onClick={handleSave}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-sand text-navy rounded-lg hover:bg-cream transition-colors"
      >
        {saved ? (
          <Check className="w-4 h-4" />
        ) : (
          <BookmarkPlus className="w-4 h-4" />
        )}
        {saved ? "Saved!" : "Save"}
      </button>

      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-sand text-navy rounded-lg hover:bg-cream transition-colors"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
}
