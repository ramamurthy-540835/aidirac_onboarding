import { backendUrl, jsonResponse, readBackendJson } from "../backend";

export async function GET() {
  try {
    const response = await fetch(backendUrl("/api/subscription-plans"), {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    const payload = await readBackendJson(response);
    return jsonResponse(payload, response.status);
  } catch {
    return jsonResponse({ detail: "Unable to reach subscription service." }, 502);
  }
}
