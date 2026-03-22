import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { buildSystemPrompt, buildUserPrompt } from "../../src/lib/post-generator/prompt.js";

// === Rate Limiter (in-memory, resets on cold start) ===

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

// === CORS ===

const ALLOWED_ORIGIN = "https://juanminoprio.com";

function corsHeaders(origin: string | undefined): Record<string, string> {
  const isAllowed =
    origin === ALLOWED_ORIGIN ||
    origin === "https://www.juanminoprio.com" ||
    (origin !== undefined && origin.startsWith("http://localhost"));

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// === Input Validation ===

interface RequestBody {
  topic: string;
  goal: string;
  angle: string;
}

function validateInput(body: unknown): { valid: true; data: RequestBody } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object." };
  }

  const { topic, goal, angle } = body as Record<string, unknown>;

  if (typeof topic !== "string" || topic.trim().length === 0) {
    return { valid: false, error: "Topic is required." };
  }
  if (topic.length > 500) {
    return { valid: false, error: "Topic must be 500 characters or less." };
  }

  const validGoals = [
    "thought-leadership",
    "engagement",
    "share-lesson",
    "start-conversation",
    "showcase-expertise",
  ];
  if (typeof goal !== "string" || !validGoals.includes(goal)) {
    return { valid: false, error: `Goal must be one of: ${validGoals.join(", ")}` };
  }

  if (typeof angle !== "string") {
    return { valid: false, error: "Angle must be a string." };
  }
  if (angle.length > 200) {
    return { valid: false, error: "Angle must be 200 characters or less." };
  }

  return {
    valid: true,
    data: { topic: topic.trim(), goal, angle: angle.trim() },
  };
}

// === Gemini API Call ===

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  error?: {
    message?: string;
    code?: number;
  };
}

async function callGemini(
  topic: string,
  goal: string,
  angle: string,
  apiKey: string
): Promise<{ success: true; data: unknown } | { success: false; error: string }> {
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(topic, goal as any, angle);

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }],
      },
    ],
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  };

  try {
    const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Gemini API error (${response.status}):`, errorText);
      return {
        success: false,
        error: `Gemini API returned ${response.status}`,
      };
    }

    const geminiResponse: GeminiResponse = await response.json();

    if (geminiResponse.error) {
      console.error("Gemini error:", geminiResponse.error.message);
      return {
        success: false,
        error: geminiResponse.error.message || "Gemini returned an error",
      };
    }

    const text = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return { success: false, error: "No content in Gemini response" };
    }

    const parsed = JSON.parse(text);

    if (!parsed.posts || !Array.isArray(parsed.posts) || parsed.posts.length !== 3) {
      return { success: false, error: "Invalid response structure from Gemini" };
    }

    return { success: true, data: parsed };
  } catch (err) {
    console.error("Gemini call failed:", err);
    return {
      success: false,
      error: err instanceof SyntaxError ? "Failed to parse Gemini response as JSON" : "Network error calling Gemini",
    };
  }
}

// === Handler (v1 format for netlify dev compatibility) ===

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const origin = event.headers["origin"] || event.headers["Origin"];
  const headers = { ...corsHeaders(origin), "Content-Type": "application/json" };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // Only accept POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: "method_not_allowed", message: "Use POST." }),
    };
  }

  // Rate limiting
  const clientIp = event.headers["x-forwarded-for"] || event.headers["client-ip"] || "unknown";
  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    return {
      statusCode: 429,
      headers: { ...headers, "Retry-After": "3600" },
      body: JSON.stringify({
        success: false,
        error: "rate_limit",
        message: "You've used your free generations for now — try again in an hour.",
        fallback: true,
      }),
    };
  }

  // Parse and validate input
  let body: unknown;
  try {
    body = JSON.parse(event.body || "");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: "invalid_json", message: "Invalid JSON body." }),
    };
  }

  const validation = validateInput(body);
  if (!validation.valid) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: "validation_error", message: validation.error }),
    };
  }

  // Check for API key
  const apiKey = process.env.GOOGLE_GEMINI_KEY;
  // Debug logging removed
  if (!apiKey) {
    console.error("GEMINI_API_KEY not set in environment");
    return {
      statusCode: 503,
      headers,
      body: JSON.stringify({
        success: false,
        error: "server_error",
        message: "AI generation is not configured. Using fallback.",
        fallback: true,
      }),
    };
  }

  // Call Gemini
  const { data: inputData } = validation;
  const result = await callGemini(inputData.topic, inputData.goal, inputData.angle, apiKey);

  if (!result.success) {
    return {
      statusCode: 502,
      headers,
      body: JSON.stringify({
        success: false,
        error: "ai_error",
        message: "AI generation failed. Using fallback.",
        fallback: true,
      }),
    };
  }

  return {
    statusCode: 200,
    headers: { ...headers, "X-RateLimit-Remaining": String(rateCheck.remaining) },
    body: JSON.stringify({ success: true, posts: (result.data as any).posts }),
  };
};
