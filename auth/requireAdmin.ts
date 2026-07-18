import { cookies } from "next/headers";
import { adminSessionCookie, verifyAdminJwt } from "@/auth/adminSession";

export async function getAdminSession() {
  return verifyAdminJwt((await cookies()).get(adminSessionCookie)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED_ADMIN");
  }
  return session;
}
