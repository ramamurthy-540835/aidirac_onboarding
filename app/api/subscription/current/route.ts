import { backendUrl, jsonResponse, readBackendJson } from "../backend";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId")?.trim();

  if (!userId) {
    return jsonResponse({ detail: "userId is required." }, 400);
  }

  try {
    const subscriptionResponse = await fetch(
      backendUrl(`/api/user-subscriptions/${encodeURIComponent(userId)}`),
      { headers: { Accept: "application/json" }, cache: "no-store" },
    );
    const subscription = await readBackendJson(subscriptionResponse);

    let summary = null;
    const summaryResponse = await fetch(
      backendUrl(`/api/token-usage/${encodeURIComponent(userId)}/summary`),
      { headers: { Accept: "application/json" }, cache: "no-store" },
    );

    if (summaryResponse.ok) {
      summary = await readBackendJson(summaryResponse);
    }

    return jsonResponse(
      { subscription: subscriptionResponse.ok ? subscription : null, summary },
      subscriptionResponse.ok || subscriptionResponse.status === 404 ? 200 : subscriptionResponse.status,
    );
  } catch {
    return jsonResponse({ detail: "Unable to read subscription state." }, 502);
  }
}
