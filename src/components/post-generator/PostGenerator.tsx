import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type {
  Screen,
  Goal,
  GeneratedPost,
  SavedPost,
  GenerationInput,
} from "@lib/post-generator/types";
import { generatePosts } from "@lib/post-generator/engine";
import { getSavedPosts } from "@lib/post-generator/storage";
import TopicInput from "./TopicInput";
import ContextForm from "./ContextForm";
import PreviewCards from "./PreviewCards";
import FullPost from "./FullPost";
import SavedPosts from "./SavedPosts";

const pageVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PostGenerator() {
  // Navigation
  const [screen, setScreen] = useState<Screen>("topic");

  // Input state
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState<Goal>("thought-leadership");
  const [angle, setAngle] = useState("");

  // Output state
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Saved posts drawer
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>(() =>
    getSavedPosts()
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Handlers
  const handleTopicSubmit = useCallback((t: string) => {
    setTopic(t);
    setScreen("context");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleContextSubmit = useCallback(
    (g: Goal, a: string) => {
      setGoal(g);
      setAngle(a);
      const input: GenerationInput = { topic, goal: g, angle: a };
      const generated = generatePosts(input);
      setPosts(generated);
      setScreen("previews");
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [topic]
  );

  const handleSelectPost = useCallback((index: number) => {
    setSelectedIndex(index);
    setScreen("fullPost");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBackToPreviews = useCallback(() => {
    setSelectedIndex(null);
    setScreen("previews");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStartOver = useCallback(() => {
    setTopic("");
    setGoal("thought-leadership");
    setAngle("");
    setPosts([]);
    setSelectedIndex(null);
    setScreen("topic");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectedPost =
    selectedIndex !== null ? posts[selectedIndex] : null;

  return (
    <div className="max-w-4xl mx-auto px-6">
      <AnimatePresence mode="wait">
        {screen === "topic" && (
          <motion.div
            key="topic"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <TopicInput onSubmit={handleTopicSubmit} />
          </motion.div>
        )}

        {screen === "context" && (
          <motion.div
            key="context"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ContextForm
              topic={topic}
              onSubmit={handleContextSubmit}
              onBack={() => setScreen("topic")}
            />
          </motion.div>
        )}

        {screen === "previews" && (
          <motion.div
            key="previews"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <PreviewCards
              posts={posts}
              onSelect={handleSelectPost}
              onStartOver={handleStartOver}
            />
          </motion.div>
        )}

        {screen === "fullPost" && selectedPost && (
          <motion.div
            key="fullPost"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <FullPost
              post={selectedPost}
              topic={topic}
              goal={goal}
              angle={angle}
              savedPosts={savedPosts}
              onSavedPostsChange={setSavedPosts}
              onBack={handleBackToPreviews}
              onStartOver={handleStartOver}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Posts Drawer Toggle */}
      <SavedPosts
        posts={savedPosts}
        isOpen={isDrawerOpen}
        onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
        onPostsChange={setSavedPosts}
      />
    </div>
  );
}
