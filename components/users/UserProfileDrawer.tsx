import { PermissionBadge } from "@/components/users/PermissionBadge";
import { RoleBadge } from "@/components/users/RoleBadge";
import type { UserRecord } from "@/components/users/UserTable";

type UserProfileDrawerProps = {
  user: UserRecord;
};

export function UserProfileDrawer({ user }: UserProfileDrawerProps) {
  return (
    <aside className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div className="flex items-start gap-4">
        <div className="grid size-14 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-base font-semibold text-cyan-100">
          {user.avatar}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
            Profile Preview
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white">{user.name}</h2>
          <div className="mt-3">
            <RoleBadge role={user.role} tone={user.roleTone} />
          </div>
        </div>
      </div>

      <dl className="mt-5 grid gap-3">
        {[
          ["Organization", user.organization],
          ["Status", user.status],
          ["Last Login", user.lastLogin],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
          >
            <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              {label}
            </dt>
            <dd className="mt-2 text-sm font-medium text-slate-200">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Permissions
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {user.permissions.map((permission) => (
            <PermissionBadge key={permission} label={permission} />
          ))}
        </div>
      </div>
    </aside>
  );
}
