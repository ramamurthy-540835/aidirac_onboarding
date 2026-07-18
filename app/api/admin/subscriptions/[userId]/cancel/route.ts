import { requireAdmin } from "@/auth/requireAdmin";
import { backendUrl, jsonResponse, readBackendJson } from "@/app/api/subscription/backend";

export async function PATCH(_request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    await requireAdmin();
    const { userId } = await params;
    const response = await fetch(backendUrl(`/api/user-subscriptions/${encodeURIComponent(userId)}/cancel`), {
      method: "PATCH",
      headers: { Accept: "application/json" },
    });
    return jsonResponse(await readBackendJson(response), response.status);
  } catch (error) {
    return jsonResponse({ detail: error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? "Unauthorized" : "Unable to cancel subscription" }, error instanceof Error && error.message === "UNAUTHORIZED_ADMIN" ? 401 : 502);
  }
}
