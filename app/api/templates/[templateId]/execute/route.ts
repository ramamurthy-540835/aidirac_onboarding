import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { profileFor, runChat } from "@/lib/user-workspace/server";
import { templateById } from "@/lib/user-workspace/mutations";
import type { ChatRequest } from "@/lib/user-workspace/types";
export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ templateId: string }> }) { try { const identity = await requireUserWorkspace(request); const template = templateById((await context.params).templateId); if (!template) return Response.json({ error: "Template not found" }, { status: 404 }); const input = await request.json() as ChatRequest; return Response.json(await runChat({ ...input, taskType: template.taskType, outputFormat: template.outputFormat }, profileFor(identity).data)); } catch (error) { return userWorkspaceError(error); } }
