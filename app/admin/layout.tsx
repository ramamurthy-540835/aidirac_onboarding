import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { getAdminSession } from "@/auth/requireAdmin";

export const metadata: Metadata = {
  title: "Admin Console | AIDIRAC",
  description: "Protected AIDIRAC administration console",
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/login?next=/admin&reason=admin");

  return (
    <AdminChrome
      admin={{ name: session.name, email: session.email, organization: session.organization }}
    >
      {children}
    </AdminChrome>
  );
}
