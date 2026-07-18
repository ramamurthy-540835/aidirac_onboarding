import { requireAdmin } from "@/auth/requireAdmin";
import { backendUrl, jsonResponse, readBackendJson } from "@/app/api/subscription/backend";

export async function GET() {
  try {
    await requireAdmin();
    const response = await fetch(backendUrl("/api/subscription-plans"), { cache: "no-store" });
    return jsonResponse(await readBackendJson(response), response.status);
  } catch (error) {
    return jsonResponse({ detail: error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? "Unauthorized" : "Unable to load plans" }, error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? 401 : 502);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const response = await fetch(backendUrl("/api/subscription-plans"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return jsonResponse(await readBackendJson(response), response.status);
  } catch (error) {
    return jsonResponse({ detail: error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? "Unauthorized" : "Unable to create plan" }, error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? 401 : 502);
  }
}
