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
    "Access-Control-Allow-Methods": "GET, OPTIONS",
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

export const onRequestOptions: PagesFunction<Env> = async ({ request }) => {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request.headers.get("origin")),
  });
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const origin = request.headers.get("origin");
  const headers = corsHeaders(origin);
  const id = params.id as string;

  if (!id || typeof id !== "string") {
    return json({ error: "Result ID is required" }, 400, headers);
  }

  try {
    const result = await env.DB.prepare(
      "SELECT id, result_type, scores, answers, created_at FROM quiz_results WHERE id = ?"
    )
      .bind(id)
      .first<{ id: string; result_type: string; scores: string; answers: string; created_at: string }>();

    if (!result) {
      return json({ error: "Result not found" }, 404, headers);
    }

    return json(
      {
        id: result.id,
        resultType: result.result_type,
        scores: JSON.parse(result.scores),
        answers: JSON.parse(result.answers),
        createdAt: result.created_at,
      },
      200,
      headers
    );
  } catch (err) {
    console.error("D1 query error:", err);
    return json({ error: "Failed to fetch result" }, 500, headers);
  }
};
