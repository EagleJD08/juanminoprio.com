import { nanoid } from "nanoid";

interface Env {
  DB: D1Database;
}

const ALLOWED_ORIGINS = [
  "https://juanminoprio.com",
  "https://www.juanminoprio.com",
];

function corsHeaders(origin: string | null): Record<string, string> {
  const isAllowed =
    origin !== null &&
    (ALLOWED_ORIGINS.includes(origin) || origin.startsWith("http://localhost"));

  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(data: unknown, status: number, headers: Record<string, string>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

// CORS preflight
export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
};

// POST — save quiz result
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, headers);
  }

  const { resultType, scores, answers } = body as Record<string, unknown>;

  // Validate
  if (typeof resultType !== "string" || !resultType) {
    return json({ error: "resultType is required" }, 400, headers);
  }
  if (!scores || typeof scores !== "object") {
    return json({ error: "scores object is required" }, 400, headers);
  }
  if (!Array.isArray(answers)) {
    return json({ error: "answers array is required" }, 400, headers);
  }

  const id = nanoid(10);
  const userAgent = request.headers.get("user-agent") || "";
  const referrer = request.headers.get("referer") || "";

  try {
    await env.DB.prepare(
      "INSERT INTO quiz_results (id, result_type, scores, answers, user_agent, referrer) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(id, resultType, JSON.stringify(scores), JSON.stringify(answers), userAgent, referrer)
      .run();

    return json({ success: true, resultId: id }, 201, headers);
  } catch (err) {
    console.error("D1 insert error:", err);
    return json({ error: "Failed to save result" }, 500, headers);
  }
};

// GET — quiz stats (total completions + type distribution)
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);

  try {
    const totalResult = await env.DB.prepare(
      "SELECT COUNT(*) as total FROM quiz_results"
    ).first<{ total: number }>();

    const distributionResult = await env.DB.prepare(
      "SELECT result_type, COUNT(*) as count FROM quiz_results GROUP BY result_type ORDER BY count DESC"
    ).all<{ result_type: string; count: number }>();

    const typeDistribution: Record<string, number> = {};
    for (const row of distributionResult.results) {
      typeDistribution[row.result_type] = row.count;
    }

    return json(
      {
        totalCompletions: totalResult?.total ?? 0,
        typeDistribution,
      },
      200,
      headers
    );
  } catch (err) {
    console.error("D1 query error:", err);
    return json({ error: "Failed to fetch stats" }, 500, headers);
  }
};
