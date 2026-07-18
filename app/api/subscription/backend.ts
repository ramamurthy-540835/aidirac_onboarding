export const subscriptionApiBaseUrl =
  process.env.SUBSCRIPTION_API_URL ??
  process.env.NEXT_PUBLIC_SUBSCRIPTION_API_URL ??
  "https://aidirac-subscription-backend-1035117862188.us-central1.run.app";

export function backendUrl(path: string) {
  return new URL(path, subscriptionApiBaseUrl);
}

export async function readBackendJson(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return { detail: text };
  }
}

export function jsonResponse(payload: unknown, status = 200) {
  return Response.json(payload, { status });
}
