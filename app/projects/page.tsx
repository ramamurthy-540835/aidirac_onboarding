import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectList, type ProjectRecord } from "@/components/projects/ProjectList";
import { ProjectMembers } from "@/components/projects/ProjectMembers";
import { ProjectTimeline } from "@/components/projects/ProjectTimeline";
import { PageHeader } from "@/components/ui/PageHeader";

const projects: ProjectRecord[] = [
  {
    name: "AIDIRAC Access Layer",
    description: "Controlled onboarding and access routes for PRISM users.",
    assignedAgents: ["Planner", "Coder", "Reviewer"],
    workspace: "Developer",
    owner: "Maya Chen",
    status: "Active",
    statusTone: "active",
    recentActivity: "Workspace dashboard reviewed",
  },
  {
    name: "PRISM Agent Center",
    description: "Multi-agent control panel and execution visibility.",
    assignedAgents: ["Planner", "Tester", "Deployment"],
    workspace: "Admin",
    owner: "Nora Patel",
    status: "Review",
    statusTone: "review",
    recentActivity: "Tester Agent started validation",
  },
  {
    name: "Business Automation Hub",
    description: "Workflow builder, analytics, reports, and business overview.",
    assignedAgents: ["Analytics", "Planner"],
    workspace: "Business",
    owner: "Arjun Mehta",
    status: "Queued",
    statusTone: "queued",
    recentActivity: "Analytics Agent queued summary",
  },
  {
    name: "Logging Center",
    description: "Frontend-only log review UI for user and audit records.",
    assignedAgents: ["Reviewer", "Analytics"],
    workspace: "Admin",
    owner: "Maya Chen",
    status: "Complete",
    statusTone: "complete",
    recentActivity: "Audit mock data prepared",
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="PRISM Projects"
        title="Project Management"
        description="Frontend-only project management surface for assigned agents, workspace ownership, status, and recent activity using mock data."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </section>

      <ProjectList projects={projects} />

      <section className="grid gap-6 lg:grid-cols-2">
        <ProjectTimeline />
        <ProjectMembers />
      </section>
    </div>
  );
}
