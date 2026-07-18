import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { artifactsEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(artifactsEnvelope()); } catch (error) { return userWorkspaceError(error); } }
