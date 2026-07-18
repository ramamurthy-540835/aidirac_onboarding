import { cookies } from "next/headers";
import { adminCookieOptions, adminSessionCookie, createAdminJwt, isProvisionedAdmin, isValidAdminPassword } from "@/auth/adminSession";

type SessionRequest = {
  id?: string;
  email?: string;
  fullName?: string;
  organization?: string;
  role?: string;
  jobRole?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as SessionRequest;
  const email = body.email?.trim().toLowerCase() ?? "";

  if (!email || !isProvisionedAdmin(email) || !isValidAdminPassword(body.password ?? "")) {
    return Response.json({ detail: "This account is not provisioned for admin access." }, { status: 403 });
  }

  const token = await createAdminJwt({
    sub: body.id ?? email,
    email,
    name: body.fullName?.trim() || "AIDIRAC Administrator",
    role: "admin",
    organization: body.organization?.trim() || "AIDIRAC",
    jobRole: body.jobRole?.trim() || "Admin",
  });
  (await cookies()).set(adminSessionCookie, token, adminCookieOptions());
  return Response.json({
    ok: true,
    user: {
      id: body.id ?? email,
      email,
      fullName: body.fullName?.trim() || "AIDIRAC Administrator",
      organization: body.organization?.trim() || "AIDIRAC",
      role: "admin",
      jobRole: body.jobRole?.trim() || "Admin",
    },
  });
}

export async function DELETE() {
  (await cookies()).delete(adminSessionCookie);
  return Response.json({ ok: true });
}
