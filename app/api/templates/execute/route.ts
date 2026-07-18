import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { profileFor, runChat } from "@/lib/user-workspace/server";
import type { ChatRequest } from "@/lib/user-workspace/types";
export const runtime = "nodejs";
export async function POST(request: Request) { try { const identity = await requireUserWorkspace(request); return Response.json(await runChat(await request.json() as ChatRequest, profileFor(identity).data)); } catch (error) { return userWorkspaceError(error); } }
