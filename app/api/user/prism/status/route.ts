import { requireUserWorkspace, userWorkspaceError } from "@/lib/user-workspace/auth";
import { prismStatusEnvelope } from "@/lib/user-workspace/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    await requireUserWorkspace(request);
    return Response.json(await prismStatusEnvelope());
  } catch (error) {
    return userWorkspaceError(error);
  }
}
