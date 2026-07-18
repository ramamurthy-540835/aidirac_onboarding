import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { templateEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(templateEnvelope()); } catch (error) { return userWorkspaceError(error); } }
