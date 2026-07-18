import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminSessionCookie, verifyAdminJwt } from "@/auth/adminSession";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(adminSessionCookie)?.value;
  const session = await verifyAdminJwt(token);

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    loginUrl.searchParams.set("reason", "admin");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
