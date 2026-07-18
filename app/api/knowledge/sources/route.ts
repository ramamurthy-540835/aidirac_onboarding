import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { knowledgeEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(knowledgeEnvelope()); } catch (error) { return userWorkspaceError(error); } }
