import { PermissionBadge } from "@/components/users/PermissionBadge";
import { RoleBadge } from "@/components/users/RoleBadge";
import type { UserRecord } from "@/components/users/UserTable";

type UserCardProps = {
  user: UserRecord;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
          {user.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-white">{user.name}</h2>
            <RoleBadge role={user.role} tone={user.roleTone} />
          </div>
          <p className="mt-2 text-sm text-slate-400">{user.organization}</p>
        </div>
      </div>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <dt className="text-slate-500">Status</dt>
          <dd className="font-medium text-slate-200">{user.status}</dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
          <dt className="text-slate-500">Last Login</dt>
          <dd className="font-medium text-slate-200">{user.lastLogin}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {user.permissions.map((permission) => (
          <PermissionBadge key={permission} label={permission} />
        ))}
      </div>
    </article>
  );
}
