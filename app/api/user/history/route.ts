import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { historyEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(historyEnvelope()); } catch (error) { return userWorkspaceError(error); } }
