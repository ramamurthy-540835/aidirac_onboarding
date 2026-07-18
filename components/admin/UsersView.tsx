"use client";

import { useState } from "react";
import { AdminPageHeader, AdminPanel, LoadingBlock, StatusBadge, tableClass, tdClass, thClass } from "./AdminUI";
import { useAdminData } from "./useAdminData";

export function UsersView() {
  const { users, loading, error } = useAdminData();
  const [notice, setNotice] = useState("");

  return (
    <>
      <AdminPageHeader title="User Management" description="Review identities known to this portal, their organizations, current plans, and account state." />
      {notice ? <div className="mb-4 border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">{notice}</div> : null}
      {loading ? <LoadingBlock label="Loading users and subscriptions…" /> : error ? <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div> : (
        <AdminPanel title="Users" description="Identity profiles are browser-local until a central users service is connected; subscription fields are backend-backed.">
          <div className="overflow-x-auto">
            <table className={tableClass}>
              <thead><tr>{["User ID", "Name", "Email", "Organization", "Current Plan", "Status", "Created Date", "Actions"].map((label) => <th key={label} className={thClass}>{label}</th>)}</tr></thead>
              <tbody>{users.map((user) => (
                <tr key={user.id}>
                  <td className={`${tdClass} max-w-36 truncate font-mono text-xs`}>{user.id}</td>
                  <td className={`${tdClass} font-medium text-slate-950`}>{user.fullName}</td>
                  <td className={tdClass}>{user.email}</td>
                  <td className={tdClass}>{user.organization}</td>
                  <td className={`${tdClass} uppercase`}>{user.subscription?.plan_code ?? "—"}</td>
                  <td className={tdClass}><StatusBadge status={user.subscription?.status ?? "registered"} /></td>
                  <td className={tdClass}>{user.subscription ? new Date(user.subscription.current_period_start).toLocaleDateString() : "Browser local"}</td>
                  <td className={tdClass}><div className="flex gap-2"><button onClick={() => setNotice(`Viewing ${user.fullName}. Full profile is available from Account.`)} className="text-xs font-semibold text-blue-700">View</button><button onClick={() => setNotice("Suspend requires a central identity API; no account state was changed.")} className="text-xs font-semibold text-amber-700">Suspend</button><button onClick={() => setNotice("Use Subscriptions to change this customer plan.")} className="text-xs font-semibold text-violet-700">Change Plan</button></div></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </AdminPanel>
      )}
    </>
  );
}
