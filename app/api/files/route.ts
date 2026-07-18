import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { filesEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(filesEnvelope()); } catch (error) { return userWorkspaceError(error); } }
