import { backendUrl, jsonResponse, readBackendJson } from "../backend";

type SubscribePayload = {
  userId?: string;
  planCode?: string;
  billingCycle?: "monthly" | "yearly";
};

async function sendJson(path: string, method: "POST" | "PATCH", body?: unknown) {
  const response = await fetch(backendUrl(path), {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return { payload: await readBackendJson(response), status: response.status };
}

export async function POST(request: Request) {
  const body = (await request.json()) as SubscribePayload;
  const userId = body.userId?.trim();
  const planCode = body.planCode?.trim().toLowerCase();
  const billingCycle = body.billingCycle ?? "monthly";

  if (!userId || !planCode) {
    return jsonResponse({ detail: "userId and planCode are required." }, 400);
  }

  try {
    const createResult = await sendJson("/api/user-subscriptions", "POST", {
      user_id: userId,
      plan_code: planCode,
      billing_cycle: billingCycle,
    });

    if (createResult.status !== 409) {
      return jsonResponse(createResult.payload, createResult.status);
    }

    const changeResult = await sendJson(
      `/api/user-subscriptions/${encodeURIComponent(userId)}/change-plan`,
      "PATCH",
      { plan_code: planCode, billing_cycle: billingCycle },
    );
    return jsonResponse(changeResult.payload, changeResult.status);
  } catch {
    return jsonResponse({ detail: "Unable to update subscription." }, 502);
  }
}
