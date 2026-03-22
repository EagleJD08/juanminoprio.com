import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import type { GeneratedPost, Goal, SavedPost } from "@lib/post-generator/types";
import BreakdownCard from "./BreakdownCard";
import LearnMore from "./LearnMore";
import ActionBar from "./ActionBar";

interface Props {
  post: GeneratedPost;
  topic: string;
  goal: Goal;
  angle: string;
  savedPosts: SavedPost[];
  onSavedPostsChange: (posts: SavedPost[]) => void;
  onBack: () => void;
  onStartOver: () => void;
}

export default function FullPost({
  post,
  topic,
  goal,
  angle,
  savedPosts,
  onSavedPostsChange,
  onBack,
  onStartOver,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.fullContent);

  const currentContent = isEditing ? editedContent : post.fullContent;

  // Find relevant stats for each card
  const hookStat = post.relevantStats.find(
    (s) => s.relatedTo === post.hookFormula.id || s.context === "hook"
  );
  const steppsStat = post.relevantStats.find(
    (s) => s.context === "stepps"
  );

  // Build personalized teaching text
  const hookTeaching = post.hookFormula.teaching.whyItWorksTemplate
    .replace("{topic}", topic)
    .replace("{angle}", angle || "your unique perspective");
  const structureTeaching =
    post.structure.teaching.whyItFitsTemplate[goal] || "";

  return (
    <div className="py-8">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-slate hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to options
        </button>
        <button
          onClick={onStartOver}
          className="flex items-center gap-2 text-sm text-slate hover:text-navy transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          New topic
        </button>
      </div>

      {/* Post Content */}
      <div className="bg-white rounded-xl border border-sand/40 p-6 md:p-8 mb-6">
        <div className="text-xs uppercase tracking-wider text-sand mb-4">
          Generated Post
        </div>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full min-h-[250px] p-4 border-2 border-terracotta/30 rounded-lg text-navy leading-relaxed font-body focus:outline-none focus:border-terracotta resize-y"
          />
        ) : (
          <div className="text-navy leading-relaxed font-body whitespace-pre-line">
            {currentContent}
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="mb-10">
        <ActionBar
          post={post}
          topic={topic}
          goal={goal}
          content={currentContent}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
          savedPosts={savedPosts}
          onSavedPostsChange={onSavedPostsChange}
        />
      </div>

      {/* Annotated Breakdown */}
      <div className="mb-6">
        <h3 className="font-heading text-2xl font-bold text-navy mb-6">
          Why This Works
        </h3>

        <div className="space-y-4">
          {/* Hook Analysis */}
          <BreakdownCard
            label="Hook"
            sublabel={`${post.hookFormula.name} Formula`}
            borderColor="border-terracotta"
            labelColor="text-terracotta"
            stat={hookStat}
          >
            <p className="mb-2">
              <strong>What it is:</strong> {post.hookFormula.teaching.whatItIs}
            </p>
            <p>{hookTeaching}</p>
          </BreakdownCard>

          {/* Structure Breakdown */}
          <BreakdownCard
            label="Structure"
            sublabel={post.structure.displayName}
            borderColor="border-dusty-blue"
            labelColor="text-dusty-blue"
          >
            <p className="mb-2">
              <strong>How it flows:</strong>{" "}
              {post.structure.teaching.howItFlows}
            </p>
            <p>{structureTeaching}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {post.sections.map((section, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-dusty-blue/10 text-dusty-blue rounded-md"
                >
                  {i > 0 && <span className="text-dusty-blue/40">→</span>}
                  {section.name}
                </span>
              ))}
            </div>
          </BreakdownCard>

          {/* STEPPS Score */}
          <BreakdownCard
            label="Shareability Score"
            sublabel={`${post.steppsScore.total}/${post.steppsScore.max}`}
            borderColor="border-sage"
            labelColor="text-sage"
            stat={steppsStat}
          >
            <div className="space-y-2">
              {post.steppsScore.results.map((result) => (
                <div key={result.principle.id} className="flex items-start gap-2">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${
                      result.hit
                        ? "bg-sage/15 text-sage font-medium"
                        : "bg-sand/20 text-sand"
                    }`}
                  >
                    {result.principle.name}
                  </span>
                  <span className="text-xs text-slate">
                    {result.hit ? result.explanation : result.tip}
                  </span>
                </div>
              ))}
            </div>
          </BreakdownCard>
        </div>
      </div>

      {/* Learn More */}
      <LearnMore
        hookExamples={post.hookFormula.teaching.examples}
        structureNotes={post.structure.teaching.sectionNotes}
      />
    </div>
  );
}
