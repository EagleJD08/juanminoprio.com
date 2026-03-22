import type { AIResponsePost } from "./types";

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
 * Returns parsed AIResponsePost[] on success, or throws with error info.
 */
export async function generateAIPosts(
  topic: string,
  goal: string,
  angle: string
): Promise<AIResponsePost[]> {
  const response = await fetch("/.netlify/functions/generate-post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic, goal, angle }),
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
