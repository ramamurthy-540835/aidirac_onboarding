import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { adapterTodo, indexFile } from "@/lib/user-workspace/mutations";
export async function POST(request: Request, context: { params: Promise<{ fileId: string }> }) { try { await requireUserWorkspace(request); const item = indexFile((await context.params).fileId); return item ? Response.json({ data: item, source: "adapter", todo: adapterTodo }) : Response.json({ error: "File not found" }, { status: 404 }); } catch (error) { return userWorkspaceError(error); } }
