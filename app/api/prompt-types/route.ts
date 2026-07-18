import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { promptTypeEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(promptTypeEnvelope()); } catch (error) { return userWorkspaceError(error); } }
