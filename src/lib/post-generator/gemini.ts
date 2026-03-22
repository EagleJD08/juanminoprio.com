import type { AIResponsePost, Tone, RefineAction } from "./types";

export interface GenerateAIPostsResult {
  success: true;
  posts: AIResponsePost[];
}

export interface GenerateAIPostsError {
  success: false;
  error: string;
  message: string;
  fallback: boolean;
}

export type GenerateAIPostsResponse = GenerateAIPostsResult | GenerateAIPostsError;

/**
 * Call the Netlify function to generate AI-powered posts.
 */
export async function generateAIPosts(
  topic: string,
  goal: string,
  angle: string,
  tone: Tone = "conversational"
): Promise<AIResponsePost[]> {
  const response = await fetch("/.netlify/functions/generate-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, goal, angle, tone }),
  });

  const data: GenerateAIPostsResponse = await response.json();

  if (!data.success) {
    const error = new Error(data.message || "AI generation failed");
    (error as any).fallback = data.fallback ?? true;
    (error as any).errorCode = data.error;
    throw error;
  }

  return data.posts;
}

// === Refine API ===

export interface RefinePostResult {
  success: true;
  post: AIResponsePost;
}

export interface RefinePostError {
  success: false;
  error: string;
  message: string;
  fallback: boolean;
}

export type RefinePostResponse = RefinePostResult | RefinePostError;

/**
 * Call the Netlify function to refine an existing post.
 */
export async function refinePost(
  postContent: string,
  action: RefineAction
): Promise<AIResponsePost> {
  const response = await fetch("/.netlify/functions/generate-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mode: "refine", post: postContent, action }),
  });

  const data: RefinePostResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Refinement failed");
  }

  return data.post;
}
