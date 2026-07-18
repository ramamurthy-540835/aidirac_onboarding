import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { addFile } from "@/lib/user-workspace/server";
export const runtime = "nodejs";
export async function POST(request: Request) { try { const identity = await requireUserWorkspace(request); const form = await request.formData(); const file = form.get("file"); if (!(file instanceof File)) return Response.json({ error: "A file is required" }, { status: 400 }); return Response.json(addFile(file, identity.name, String(form.get("sensitivity") || "internal"))); } catch (error) { return userWorkspaceError(error); } }
