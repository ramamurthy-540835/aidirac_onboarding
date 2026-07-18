import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { generateArtifact } from "@/lib/user-workspace/server";
export async function POST(request: Request) { try { const identity = await requireUserWorkspace(request); return Response.json(generateArtifact(await request.json() as { name?: string; type?: string }, identity.name)); } catch (error) { return userWorkspaceError(error); } }
