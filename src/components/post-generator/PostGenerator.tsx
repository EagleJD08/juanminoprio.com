import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type {
  Screen,
  Goal,
  DisplayPost,
  SavedPost,
  GenerationInput,
} from "@lib/post-generator/types";
import { generatePosts } from "@lib/post-generator/engine";
import { generateAIPosts } from "@lib/post-generator/gemini";
import { aiToDisplayPost, ruleBasedToDisplayPost } from "@lib/post-generator/adapters";
import { getSavedPosts } from "@lib/post-generator/storage";
import { trackEvent } from "@lib/post-generator/analytics";
import TopicInput from "./TopicInput";
import ContextForm from "./ContextForm";
import PreviewCards from "./PreviewCards";
import FullPost from "./FullPost";
import SavedPosts from "./SavedPosts";
import LoadingAnimation from "./LoadingAnimation";

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
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Loading & fallback state
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

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
    async (g: Goal, a: string) => {
      setGoal(g);
      setAngle(a);
      setFallbackMessage(null);
      setIsLoading(true);
      setScreen("previews"); // show loading animation in the previews screen area
      window.scrollTo({ top: 0, behavior: "smooth" });

      const input: GenerationInput = { topic, goal: g, angle: a };

      try {
        // Try AI generation first
        const aiPosts = await generateAIPosts(topic, g, a);
        const displayPosts = aiPosts.map(aiToDisplayPost);
        setPosts(displayPosts);
        trackEvent("Generate Posts", { goal: g, source: "ai" });
      } catch (err) {
        // Fall back to rule-based engine
        console.warn("AI generation failed, falling back to rule-based engine:", err);
        const generated = generatePosts(input);
        const displayPosts = generated.map(ruleBasedToDisplayPost);
        setPosts(displayPosts);
        setFallbackMessage(
          "AI generation temporarily unavailable. Using our built-in framework engine instead."
        );
        trackEvent("Generate Posts", { goal: g, source: "rule-based-fallback" });
      } finally {
        setIsLoading(false);
      }
    },
    [topic]
  );

  const handleSelectPost = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setScreen("fullPost");
      trackEvent("Select Preview", { hook: posts[index].hookFormulaName });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [posts]
  );

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
    setFallbackMessage(null);
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
            {isLoading ? (
              <LoadingAnimation />
            ) : (
              <>
                {fallbackMessage && (
                  <div className="mb-6 p-4 bg-sand/10 border border-sand/30 rounded-xl text-sm text-slate text-center">
                    {fallbackMessage}
                  </div>
                )}
                <PreviewCards
                  posts={posts}
                  onSelect={handleSelectPost}
                  onStartOver={handleStartOver}
                />
              </>
            )}
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
