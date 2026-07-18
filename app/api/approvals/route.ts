import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { approvalsEnvelope, createApproval } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(approvalsEnvelope()); } catch (error) { return userWorkspaceError(error); } }
export async function POST(request: Request) { try { const identity = await requireUserWorkspace(request); return Response.json(createApproval(await request.json() as { title?: string }, identity.name)); } catch (error) { return userWorkspaceError(error); } }
