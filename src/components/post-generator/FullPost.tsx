import { useState } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import type { DisplayPost, Goal, SavedPost } from "@lib/post-generator/types";
import { HOOK_FORMULAS } from "@lib/post-generator/hooks-data";
import { POST_STRUCTURES } from "@lib/post-generator/structures-data";
import BreakdownCard from "./BreakdownCard";
import LearnMore from "./LearnMore";
import ActionBar from "./ActionBar";
import HighlightedPost from "./HighlightedPost";

interface Props {
  post: DisplayPost;
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

  // Look up teaching data from data files using IDs
  const hookFormula = HOOK_FORMULAS.find((h) => h.id === post.hookFormulaId);
  const structure = POST_STRUCTURES.find((s) => s.id === post.structureId);

  // Build personalized teaching text
  const hookTeaching = hookFormula
    ? hookFormula.teaching.whyItWorksTemplate
        .replace("{topic}", topic)
        .replace("{angle}", angle || "your unique perspective")
    : "";
  const structureTeaching = structure
    ? structure.teaching.whyItFitsTemplate[goal] || ""
    : "";

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
          {post.source === "ai" && (
            <span className="ml-2 px-2 py-0.5 bg-terracotta/10 text-terracotta rounded-full text-[10px] font-medium">
              AI
            </span>
          )}
        </div>
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full min-h-[250px] p-4 border-2 border-terracotta/30 rounded-lg text-navy leading-relaxed font-body focus:outline-none focus:border-terracotta resize-y"
          />
        ) : post.source === "ai" && post.highlights.length > 0 ? (
          <HighlightedPost
            fullContent={currentContent}
            highlights={post.highlights}
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

      {/* Teaching Section — branches on source */}
      {post.source === "ai" ? (
        /* AI posts: STEPPS summary bar */
        <div className="mb-6">
          <h3 className="font-heading text-2xl font-bold text-navy mb-6">
            Shareability Score
          </h3>
          <div className="p-5 bg-white rounded-xl border-l-4 border-sage">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sage">
                STEPPS Score
              </span>
              <span className="px-3 py-1 text-sm font-medium bg-sage/10 text-sage rounded-full">
                {post.stepps.total}/{post.stepps.max}
              </span>
            </div>
            <div className="space-y-2">
              {post.stepps.hit.map((h) => (
                <div key={h.id} className="flex items-start gap-2">
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full whitespace-nowrap bg-sage/15 text-sage font-medium">
                    {h.name}
                  </span>
                  <span className="text-xs text-slate">{h.explanation}</span>
                </div>
              ))}
              {post.stepps.missed.map((m) => (
                <div key={m.id} className="flex items-start gap-2">
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full whitespace-nowrap bg-sand/20 text-sand">
                    {m.name}
                  </span>
                  <span className="text-xs text-slate">{m.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Rule-based posts: existing breakdown cards */
        <div className="mb-6">
          <h3 className="font-heading text-2xl font-bold text-navy mb-6">
            Why This Works
          </h3>

          <div className="space-y-4">
            {/* Hook Analysis */}
            {hookFormula && (
              <BreakdownCard
                label="Hook"
                sublabel={`${post.hookFormulaName} Formula`}
                borderColor="border-terracotta"
                labelColor="text-terracotta"
              >
                <p className="mb-2">
                  <strong>What it is:</strong> {hookFormula.teaching.whatItIs}
                </p>
                <p>{hookTeaching}</p>
              </BreakdownCard>
            )}

            {/* Structure Breakdown */}
            {structure && (
              <BreakdownCard
                label="Structure"
                sublabel={post.structureDisplayName}
                borderColor="border-dusty-blue"
                labelColor="text-dusty-blue"
              >
                <p className="mb-2">
                  <strong>How it flows:</strong>{" "}
                  {structure.teaching.howItFlows}
                </p>
                <p>{structureTeaching}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {structure.sections.map((section, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-dusty-blue/10 text-dusty-blue rounded-md"
                    >
                      {i > 0 && (
                        <span className="text-dusty-blue/40">→</span>
                      )}
                      {section.name}
                    </span>
                  ))}
                </div>
              </BreakdownCard>
            )}

            {/* STEPPS Score */}
            <BreakdownCard
              label="Shareability Score"
              sublabel={`${post.stepps.total}/${post.stepps.max}`}
              borderColor="border-sage"
              labelColor="text-sage"
            >
              <div className="space-y-2">
                {post.stepps.hit.map((h) => (
                  <div key={h.id} className="flex items-start gap-2">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full whitespace-nowrap bg-sage/15 text-sage font-medium">
                      {h.name}
                    </span>
                    <span className="text-xs text-slate">{h.explanation}</span>
                  </div>
                ))}
                {post.stepps.missed.map((m) => (
                  <div key={m.id} className="flex items-start gap-2">
                    <span className="inline-block px-2 py-0.5 text-xs rounded-full whitespace-nowrap bg-sand/20 text-sand">
                      {m.name}
                    </span>
                    <span className="text-xs text-slate">{m.tip}</span>
                  </div>
                ))}
              </div>
            </BreakdownCard>
          </div>
        </div>
      )}

      {/* Learn More — works for both sources, looks up data from data files */}
      {hookFormula && structure && (
        <LearnMore
          hookExamples={hookFormula.teaching.examples}
          structureNotes={structure.teaching.sectionNotes}
        />
      )}
    </div>
  );
}
