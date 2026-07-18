import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { usageEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(usageEnvelope()); } catch (error) { return userWorkspaceError(error); } }
