import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { adapterTodo, updateApproval } from "@/lib/user-workspace/mutations";
export async function POST(request: Request, context: { params: Promise<{ approvalId: string }> }) { try { await requireUserWorkspace(request); const item = updateApproval((await context.params).approvalId, "Approved"); return item ? Response.json({ data: item, source: "adapter", todo: adapterTodo }) : Response.json({ error: "Approval not found" }, { status: 404 }); } catch (error) { return userWorkspaceError(error); } }
