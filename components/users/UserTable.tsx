import { PermissionBadge } from "@/components/users/PermissionBadge";
import { RoleBadge } from "@/components/users/RoleBadge";
import { EmptyState } from "@/components/ui/EmptyState";

export type UserRecord = {
  name: string;
  avatar: string;
  role: string;
  roleTone: "admin" | "developer" | "business" | "agent";
  organization: string;
  status: string;
  permissions: string[];
  lastLogin: string;
};

type UserTableProps = {
  users: UserRecord[];
};

export function UserTable({ users }: UserTableProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div>
        <h2 className="text-base font-semibold text-white">User Directory</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Mock user management table for PRISM roles and permissions.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title="No users found"
            description="User records will appear here when mock data is available."
          />
        </div>
      ) : (
      <div className="mt-5 overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <caption className="sr-only">User directory</caption>
          <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.16em] text-slate-500">
            <tr>
              {[
                "Avatar",
                "User",
                "Role",
                "Organization",
                "Status",
                "Permissions",
                "Last Login",
              ].map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.name} className="bg-[#0d1420]">
                <td className="px-4 py-3">
                  <span className="grid size-9 place-items-center rounded-md border border-cyan-300/20 bg-cyan-300/10 text-xs font-semibold text-cyan-100">
                    {user.avatar}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-white">
                  {user.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <RoleBadge role={user.role} tone={user.roleTone} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                  {user.organization}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                  {user.status}
                </td>
                <td className="min-w-64 px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {user.permissions.map((permission) => (
                      <PermissionBadge key={permission} label={permission} />
                    ))}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                  {user.lastLogin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </section>
  );
}
