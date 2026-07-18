import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { notificationsEnvelope } from "@/lib/user-workspace/server";
export async function GET(request: Request) { try { await requireUserWorkspace(request); return Response.json(notificationsEnvelope()); } catch (error) { return userWorkspaceError(error); } }
