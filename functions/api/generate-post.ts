import { buildSystemPrompt, buildUserPrompt, buildRefinePrompt } from "../../src/lib/post-generator/prompt.js";

// === Env type ===

interface Env {
  GOOGLE_GEMINI_KEY: string;
}

// === CORS ===

const ALLOWED_ORIGIN = "https://juanminoprio.com";

function corsHeaders(origin: string | null): Record<string, string> {
  const isAllowed =
    origin === ALLOWED_ORIGIN ||
    origin === "https://www.juanminoprio.com" ||
    (origin !== null && origin.startsWith("http://localhost"));

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// === Input Validation ===

interface GenerateRequestBody {
  mode?: "generate";
  topic: string;
  goal: string;
  angle: string;
  tone?: string;
}

interface RefineRequestBody {
  mode: "refine";
  post: string;
  action: string;
}

type RequestBody = GenerateRequestBody | RefineRequestBody;

const VALID_GOALS = [
  "thought-leadership",
  "engagement",
  "share-lesson",
  "start-conversation",
  "showcase-expertise",
];

const VALID_TONES = ["conversational", "bold", "analytical", "personal"];
const VALID_REFINE_ACTIONS = ["shorter", "hook", "personal"];

function validateInput(body: unknown): { valid: true; data: RequestBody } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object." };
  }

  const obj = body as Record<string, unknown>;

  if (obj.mode === "refine") {
    if (typeof obj.post !== "string" || obj.post.trim().length === 0) {
      return { valid: false, error: "Post content is required for refinement." };
    }
    if (typeof obj.action !== "string" || !VALID_REFINE_ACTIONS.includes(obj.action)) {
      return { valid: false, error: `Action must be one of: ${VALID_REFINE_ACTIONS.join(", ")}` };
    }
    return {
      valid: true,
      data: { mode: "refine", post: obj.post.trim(), action: obj.action } as RefineRequestBody,
    };
  }

  const { topic, goal, angle, tone } = obj;

  if (typeof topic !== "string" || topic.trim().length === 0) {
    return { valid: false, error: "Topic is required." };
  }
  if (topic.length > 500) {
    return { valid: false, error: "Topic must be 500 characters or less." };
  }
  if (typeof goal !== "string" || !VALID_GOALS.includes(goal)) {
    return { valid: false, error: `Goal must be one of: ${VALID_GOALS.join(", ")}` };
  }
  if (typeof angle !== "string") {
    return { valid: false, error: "Angle must be a string." };
  }
  if (angle.length > 200) {
    return { valid: false, error: "Angle must be 200 characters or less." };
  }
  if (tone !== undefined && (typeof tone !== "string" || !VALID_TONES.includes(tone))) {
    return { valid: false, error: `Tone must be one of: ${VALID_TONES.join(", ")}` };
  }

  return {
    valid: true,
    data: {
      topic: topic.trim(),
      goal,
      angle: angle.trim(),
      tone: (tone as string) || "conversational",
    } as GenerateRequestBody,
  };
}

// === Gemini API Call ===

const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
    finishReason?: string;
  }>;
  error?: { message?: string; code?: number };
}

async function callGemini(
  systemPrompt: string,
  userPrompt: string,
  temperature: number,
  apiKey: string
): Promise<{ success: true; data: unknown } | { success: false; error: string }> {
  const requestBody = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    generationConfig: {
      temperature,
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
      return { success: false, error: `Gemini API returned ${response.status}` };
    }

    const geminiResponse: GeminiResponse = await response.json();

    if (geminiResponse.error) {
      console.error("Gemini error:", geminiResponse.error.message);
      return { success: false, error: geminiResponse.error.message || "Gemini returned an error" };
    }

    const text = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return { success: false, error: "No content in Gemini response" };
    }

    return { success: true, data: JSON.parse(text) };
  } catch (err) {
    console.error("Gemini call failed:", err);
    return {
      success: false,
      error: err instanceof SyntaxError ? "Failed to parse Gemini response as JSON" : "Network error calling Gemini",
    };
  }
}

// === Response helpers ===

function jsonResponse(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

// === CORS Preflight ===

export const onRequestOptions: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get("origin");
  return new Response(null, { status: 204, headers: corsHeaders(origin) });
};

// === POST Handler ===

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const origin = context.request.headers.get("origin");
  const headers = corsHeaders(origin);

  // Parse body
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return jsonResponse({ success: false, error: "invalid_json", message: "Invalid JSON body." }, 400, headers);
  }

  // Validate
  const validation = validateInput(body);
  if (!validation.valid) {
    return jsonResponse({ success: false, error: "validation_error", message: validation.error }, 400, headers);
  }

  // API key
  const apiKey = context.env.GOOGLE_GEMINI_KEY;
  if (!apiKey) {
    console.error("GOOGLE_GEMINI_KEY not set in environment");
    return jsonResponse({
      success: false,
      error: "server_error",
      message: "AI generation is not configured. Using fallback.",
      fallback: true,
    }, 503, headers);
  }

  const inputData = validation.data;

  // === Refine Mode ===
  if (inputData.mode === "refine") {
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildRefinePrompt(inputData.post, inputData.action as any);
    const result = await callGemini(systemPrompt, userPrompt, 0.5, apiKey);

    if (!result.success) {
      return jsonResponse({
        success: false, error: "ai_error", message: "Refinement failed. Please try again.", fallback: false,
      }, 502, headers);
    }

    return jsonResponse({ success: true, post: result.data }, 200, headers);
  }

  // === Generate Mode ===
  const systemPrompt = buildSystemPrompt();
  const userPrompt = buildUserPrompt(
    inputData.topic,
    inputData.goal as any,
    inputData.angle,
    (inputData.tone as any) || "conversational"
  );

  const result = await callGemini(systemPrompt, userPrompt, 0.7, apiKey);

  if (!result.success) {
    return jsonResponse({
      success: false, error: "ai_error", message: "AI generation failed. Using fallback.", fallback: true,
    }, 502, headers);
  }

  const data = result.data as any;
  if (!data.posts || !Array.isArray(data.posts) || data.posts.length !== 3) {
    return jsonResponse({
      success: false, error: "ai_error", message: "AI returned an invalid response. Using fallback.", fallback: true,
    }, 502, headers);
  }

  return jsonResponse({ success: true, posts: data.posts }, 200, headers);
};
