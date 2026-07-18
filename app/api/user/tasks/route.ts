import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { tasksEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(tasksEnvelope()); } catch (error) { return userWorkspaceError(error); } }
