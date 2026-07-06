import { ProjectStatus } from "@/components/projects/ProjectStatus";
import type { ProjectRecord } from "@/components/projects/ProjectList";

type ProjectCardProps = {
  project: ProjectRecord;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">
            {project.name}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {project.description}
          </p>
        </div>
        <ProjectStatus status={project.status} tone={project.statusTone} />
      </div>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Workspace
          </dt>
          <dd className="mt-2 font-medium text-slate-200">
            {project.workspace}
          </dd>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Owner
          </dt>
          <dd className="mt-2 font-medium text-slate-200">{project.owner}</dd>
        </div>
      </dl>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Assigned Agents
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.assignedAgents.map((agent) => (
            <span
              key={agent}
              className="rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-medium text-cyan-100"
            >
              {agent}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
