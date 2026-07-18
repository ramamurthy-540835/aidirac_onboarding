import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { profileFor } from "@/lib/user-workspace/server";
export const runtime = "nodejs";
export async function GET(request: Request) { try { return Response.json(profileFor(await requireUserWorkspace(request))); } catch (error) { return userWorkspaceError(error); } }
