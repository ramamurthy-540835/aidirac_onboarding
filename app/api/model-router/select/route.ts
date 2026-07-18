import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { modelsEnvelope } from "@/lib/user-workspace/server";
export const runtime = "nodejs";
export async function POST(request: Request) { try { await requireUserWorkspace(request); const { mode = "automatic" } = await request.json() as { mode?: string }; const models = (await modelsEnvelope()).data; const selected = models.find((model) => model.recommended) || models[0]; return Response.json({ data: { mode, selected, reason: "Selected using the active PRISM catalog and organization policy" }, source: "backend" }); } catch (error) { return userWorkspaceError(error); } }
