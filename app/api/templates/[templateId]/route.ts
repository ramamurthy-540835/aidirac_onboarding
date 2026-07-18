import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { adapterTodo, templateById } from "@/lib/user-workspace/mutations";
export async function GET(request: Request, context: { params: Promise<{ templateId: string }> }) { try { await requireUserWorkspace(request); const item = templateById((await context.params).templateId); return item ? Response.json({ data: item, source: "adapter", todo: adapterTodo }) : Response.json({ error: "Template not found" }, { status: 404 }); } catch (error) { return userWorkspaceError(error); } }
