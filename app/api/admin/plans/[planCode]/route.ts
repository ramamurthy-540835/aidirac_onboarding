import { requireAdmin } from "@/auth/requireAdmin";
import { backendUrl, jsonResponse, readBackendJson } from "@/app/api/subscription/backend";

type Context = { params: Promise<{ planCode: string }> };

export async function PUT(request: Request, context: Context) {
  try {
    await requireAdmin();
    const { planCode } = await context.params;
    const response = await fetch(backendUrl(`/api/subscription-plans/${encodeURIComponent(planCode)}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await request.json()),
    });
    return jsonResponse(await readBackendJson(response), response.status);
  } catch (error) {
    return jsonResponse({ detail: error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? "Unauthorized" : "Unable to update plan" }, error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? 401 : 502);
  }
}

export async function PATCH(request: Request, context: Context) {
  try {
    await requireAdmin();
    const { planCode } = await context.params;
    const response = await fetch(backendUrl(`/api/subscription-plans/${encodeURIComponent(planCode)}/status`), {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(await request.json()),
    });
    return jsonResponse(await readBackendJson(response), response.status);
  } catch (error) {
    return jsonResponse({ detail: error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? "Unauthorized" : "Unable to change plan status" }, error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? 401 : 502);
  }
}
