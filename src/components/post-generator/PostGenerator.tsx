import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type {
  Screen,
  Goal,
  Tone,
  DisplayPost,
  SavedPost,
  GenerationInput,
  RefineAction,
} from "@lib/post-generator/types";
import { generatePosts } from "@lib/post-generator/engine";
import { generateAIPosts, refinePost } from "@lib/post-generator/gemini";
import { aiToDisplayPost, ruleBasedToDisplayPost } from "@lib/post-generator/adapters";
import { getSavedPosts } from "@lib/post-generator/storage";
import { trackEvent } from "@lib/post-generator/analytics";
import TopicInput from "./TopicInput";
import ContextForm from "./ContextForm";
import PreviewCards from "./PreviewCards";
import FullPost from "./FullPost";
import SavedPosts from "./SavedPosts";
import LoadingAnimation from "./LoadingAnimation";

const MAX_REGENERATIONS = 3;
const MAX_REFINES = 3;

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
  const [tone, setTone] = useState<Tone>("conversational");

  // Output state
  const [posts, setPosts] = useState<DisplayPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Loading & fallback state
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

  // Regeneration state (v3)
  const [regenerationCount, setRegenerationCount] = useState(0);

  // Refine state (v3)
  const [isRefining, setIsRefining] = useState(false);
  const [refineCount, setRefineCount] = useState(0);

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

  const handleGenerate = useCallback(
    async (g: Goal, a: string, t: Tone) => {
      setGoal(g);
      setAngle(a);
      setTone(t);
      setFallbackMessage(null);
      setIsLoading(true);
      setScreen("previews");
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        const aiPosts = await generateAIPosts(topic, g, a, t);
        const displayPosts = aiPosts.map(aiToDisplayPost);
        setPosts(displayPosts);
        trackEvent("Generate Posts", { goal: g, tone: t, source: "ai" });
      } catch (err) {
        console.warn("AI generation failed, falling back to rule-based engine:", err);
        const input: GenerationInput = { topic, goal: g, angle: a };
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

  const handleContextSubmit = useCallback(
    (g: Goal, a: string, t: Tone) => {
      setRegenerationCount(0);
      handleGenerate(g, a, t);
    },
    [handleGenerate]
  );

  const handleRegenerate = useCallback(() => {
    setRegenerationCount((prev) => prev + 1);
    handleGenerate(goal, angle, tone);
    trackEvent("Regenerate Posts", { attempt: regenerationCount + 1 });
  }, [goal, angle, tone, regenerationCount, handleGenerate]);

  const handleSelectPost = useCallback(
    (index: number) => {
      setSelectedIndex(index);
      setRefineCount(0);
      setScreen("fullPost");
      trackEvent("Select Preview", { hook: posts[index].hookFormulaName });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [posts]
  );

  const handleRefine = useCallback(
    async (action: RefineAction) => {
      if (selectedIndex === null) return;
      const currentPost = posts[selectedIndex];

      setIsRefining(true);
      try {
        const refined = await refinePost(currentPost.fullContent, action);
        const refinedDisplay = aiToDisplayPost(refined);
        const updatedPosts = [...posts];
        updatedPosts[selectedIndex] = refinedDisplay;
        setPosts(updatedPosts);
        setRefineCount((prev) => prev + 1);
        trackEvent("Refine Post", { action, attempt: refineCount + 1 });
      } catch (err) {
        console.error("Refinement failed:", err);
      } finally {
        setIsRefining(false);
      }
    },
    [selectedIndex, posts, refineCount]
  );

  const handleBackToPreviews = useCallback(() => {
    setSelectedIndex(null);
    setRefineCount(0);
    setScreen("previews");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleStartOver = useCallback(() => {
    setTopic("");
    setGoal("thought-leadership");
    setAngle("");
    setTone("conversational");
    setPosts([]);
    setSelectedIndex(null);
    setFallbackMessage(null);
    setRegenerationCount(0);
    setRefineCount(0);
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
                  onRegenerate={handleRegenerate}
                  regenerationCount={regenerationCount}
                  maxRegenerations={MAX_REGENERATIONS}
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
              onRefine={handleRefine}
              isRefining={isRefining}
              refineCount={refineCount}
              maxRefines={MAX_REFINES}
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
