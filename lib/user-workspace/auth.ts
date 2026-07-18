import { cookies } from "next/headers";
import { adminSessionCookie, verifyAdminJwt } from "@/auth/adminSession";

export type RequestIdentity = { id: string; email: string; name: string; role: string; organization: string; jobRole: string; department: string };

function decodePortalToken(token: string) {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    const normalized = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "="))) as { sub?: string; email?: string; name?: string; role?: string };
  } catch {
    return null;
  }
}

export async function requireUserWorkspace(request: Request): Promise<RequestIdentity> {
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const portal = bearer ? decodePortalToken(bearer) : null;
  if (portal?.sub && portal.email && portal.name) {
    return {
      id: portal.sub,
      email: portal.email,
      name: portal.name,
      role: portal.role || "user",
      organization: request.headers.get("x-aidirac-organization") || "AIDIRAC",
      jobRole: request.headers.get("x-aidirac-job-role") || "Business User",
      department: request.headers.get("x-aidirac-department") || "General",
    };
  }
  const admin = await verifyAdminJwt((await cookies()).get(adminSessionCookie)?.value);
  if (admin) return { id: admin.sub, email: admin.email, name: admin.name, role: "admin", organization: admin.organization, jobRole: admin.jobRole, department: "Administration" };
  throw new Error("USER_WORKSPACE_UNAUTHORIZED");
}

export function userWorkspaceError(error: unknown) {
  const message = error instanceof Error ? error.message : "The workspace request failed";
  if (message === "USER_WORKSPACE_UNAUTHORIZED") return Response.json({ error: "Sign in to access the User Workspace" }, { status: 401 });
  return Response.json({ error: message }, { status: 500 });
}
