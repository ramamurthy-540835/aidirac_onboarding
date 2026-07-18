import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { adapterTodo, shareArtifact } from "@/lib/user-workspace/mutations";
export async function POST(request: Request, context: { params: Promise<{ artifactId: string }> }) { try { await requireUserWorkspace(request); const item = shareArtifact((await context.params).artifactId); return item ? Response.json({ data: item, source: "adapter", todo: adapterTodo }) : Response.json({ error: "Artifact not found" }, { status: 404 }); } catch (error) { return userWorkspaceError(error); } }
