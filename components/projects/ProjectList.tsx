import { ProjectStatus } from "@/components/projects/ProjectStatus";
import { EmptyState } from "@/components/ui/EmptyState";

export type ProjectRecord = {
  name: string;
  description: string;
  assignedAgents: string[];
  workspace: string;
  owner: string;
  status: string;
  statusTone: "active" | "review" | "queued" | "complete";
  recentActivity: string;
};

type ProjectListProps = {
  projects: ProjectRecord[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div>
        <h2 className="text-base font-semibold text-white">Project List</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Mock project management records for PRISM workspaces.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title="No projects found"
            description="Project records will appear here when mock data is available."
          />
        </div>
      ) : (
      <div className="mt-5 overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <caption className="sr-only">Project list</caption>
          <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.16em] text-slate-500">
            <tr>
              {[
                "Project Name",
                "Workspace",
                "Owner",
                "Assigned Agents",
                "Status",
                "Recent Activity",
              ].map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {projects.map((project) => (
              <tr key={project.name} className="bg-[#0d1420]">
                <td className="min-w-56 px-4 py-3">
                  <p className="font-medium text-white">{project.name}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {project.description}
                  </p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                  {project.workspace}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-300">
                  {project.owner}
                </td>
                <td className="min-w-64 px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {project.assignedAgents.map((agent) => (
                      <span
                        key={agent}
                        className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-100"
                      >
                        {agent}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <ProjectStatus
                    status={project.status}
                    tone={project.statusTone}
                  />
                </td>
                <td className="min-w-64 px-4 py-3 text-slate-300">
                  {project.recentActivity}
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
