import { Bookmark, X, Copy, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SavedPost } from "@lib/post-generator/types";
import { deletePost } from "@lib/post-generator/storage";

interface Props {
  posts: SavedPost[];
  isOpen: boolean;
  onToggle: () => void;
  onPostsChange: (posts: SavedPost[]) => void;
}

export default function SavedPosts({
  posts,
  isOpen,
  onToggle,
  onPostsChange,
}: Props) {
  const handleDelete = (id: string) => {
    const updated = deletePost(id);
    onPostsChange(updated);
  };

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
  };

  return (
    <>
      {/* Toggle button — fixed position */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-navy text-cream rounded-full shadow-lg hover:bg-navy/90 transition-colors"
      >
        <Bookmark className="w-4 h-4" />
        <span className="text-sm font-medium">
          My Posts{posts.length > 0 && ` (${posts.length})`}
        </span>
      </button>

      {/* Drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="fixed inset-0 z-40 bg-navy/20 backdrop-blur-sm"
            />

            {/* Drawer — desktop: right side, mobile: bottom sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-cream border-l border-sand/40 shadow-xl overflow-y-auto
                         max-md:top-auto max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:h-[70vh] max-md:max-w-none max-md:rounded-t-2xl max-md:border-t max-md:border-l-0"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-sand/30">
                <h3 className="font-heading text-lg font-bold text-navy">
                  My Posts ({posts.length})
                </h3>
                <button
                  onClick={onToggle}
                  className="p-1 rounded-lg hover:bg-sand/20 transition-colors"
                >
                  <X className="w-5 h-5 text-slate" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                {posts.length === 0 ? (
                  <p className="text-sm text-sand text-center py-8">
                    No saved posts yet. Generate a post and click Save to keep
                    it here.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="p-4 bg-white rounded-xl border border-sand/30"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs text-terracotta font-medium">
                            {post.hookFormulaName}
                          </span>
                          <span className="text-[10px] text-sand">
                            {new Date(post.savedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-sm text-navy line-clamp-3 mb-3">
                          {post.content.slice(0, 150)}...
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(post.content)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-slate hover:text-navy transition-colors"
                          >
                            <Copy className="w-3 h-3" />
                            Copy
                          </button>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="flex items-center gap-1 px-2 py-1 text-xs text-slate hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
