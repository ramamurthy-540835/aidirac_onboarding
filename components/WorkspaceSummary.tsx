import { generateWorkspaceId, getRoleOption } from "@/components/onboarding";

type WorkspaceSummaryProps = {
  roleId?: string;
  fullName?: string;
  organization?: string;
  jobTitle?: string;
  country?: string;
  skills?: string;
  githubUrl?: string;
};

export function WorkspaceSummary({
  roleId,
  fullName,
  organization,
  jobTitle,
  country,
  skills,
  githubUrl,
}: WorkspaceSummaryProps) {
  const role = getRoleOption(roleId);
  const workspaceId = generateWorkspaceId(role.id, fullName);
  const skillList = skills
    ? skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const summaryRows = [
    ["Workspace Name", role.workspaceName],
    ["Generated Workspace ID", workspaceId],
    ["Assigned Role", role.title],
    ["Status", "Ready"],
  ];

  const profileRows = [
    ["Full Name", fullName || "Not provided"],
    ["Organization", organization || "Not provided"],
    ["Job Title", jobTitle || "Not provided"],
    ["Country", country || "Not provided"],
    ["GitHub URL", githubUrl || "Not provided"],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-lg font-semibold text-white">Workspace Assignment</h2>
        <dl className="mt-5 space-y-4">
          {summaryRows.map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-1 border-b border-white/10 pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <dt className="text-sm text-slate-400">{label}</dt>
              <dd className="text-sm font-semibold text-slate-100">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
        <h2 className="text-lg font-semibold text-white">Profile Snapshot</h2>
        <dl className="mt-5 space-y-3">
          {profileRows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                {label}
              </dt>
              <dd className="mt-1 break-words text-sm text-slate-200">{value}</dd>
            </div>
          ))}
        </dl>
        {skillList.length > 0 && (
          <div className="mt-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Skills
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {skillList.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs font-medium text-cyan-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
