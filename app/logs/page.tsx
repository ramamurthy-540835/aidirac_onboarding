import { LogDetails } from "@/components/logs/LogDetails";
import { LogFilter } from "@/components/logs/LogFilter";
import { LogStatusBadge } from "@/components/logs/LogStatusBadge";
import { LogTable } from "@/components/logs/LogTable";
import { PageHeader } from "@/components/ui/PageHeader";

const userLogs = [
  {
    Timestamp: "2026-07-06 10:12",
    User: "Maya Chen",
    Action: "Opened workspace",
    Workspace: "Developer",
    Status: { value: "Success", tone: "success" as const },
  },
  {
    Timestamp: "2026-07-06 10:18",
    User: "Arjun Mehta",
    Action: "Updated profile",
    Workspace: "Business",
    Status: { value: "Success", tone: "success" as const },
  },
  {
    Timestamp: "2026-07-06 10:26",
    User: "Nora Patel",
    Action: "Requested admin route",
    Workspace: "Admin",
    Status: { value: "Review", tone: "warning" as const },
  },
];

const agentLogs = [
  { Agent: "Planner Agent", Task: "Task #101", Duration: "42 sec", Result: "Plan created" },
  { Agent: "Coder Agent", Task: "Task #102", Duration: "03 min", Result: "Implementation complete" },
  { Agent: "Tester Agent", Task: "Task #103", Duration: "Running", Result: "Validation in progress" },
];

const projectLogs = [
  { Project: "PRISM Access", Action: "Role route reviewed", User: "Maya Chen", Time: "10:08" },
  { Project: "Workspace Control", Action: "Dashboard opened", User: "Arjun Mehta", Time: "10:19" },
  { Project: "Agent Runtime", Action: "Queue inspected", User: "Nora Patel", Time: "10:31" },
];

const workspaceLogs = [
  { Workspace: "Developer", Event: "DAG viewer rendered", Time: "10:15" },
  { Workspace: "Business", Event: "Automation panel opened", Time: "10:22" },
  { Workspace: "Admin", Event: "Model route viewed", Time: "10:35" },
];

const auditLogs = [
  {
    Severity: { value: "Info", tone: "info" as const },
    Category: "Access",
    Description: "User session continued from onboarding summary",
  },
  {
    Severity: { value: "Warning", tone: "warning" as const },
    Category: "Governance",
    Description: "Admin route used placeholder policy state",
  },
  {
    Severity: { value: "Critical", tone: "danger" as const },
    Category: "Mock Alert",
    Description: "Static critical event for UI validation only",
  },
];

export default function LogsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="PRISM Logs"
        title="Logging Center UI"
        description="Frontend-only log review surface for users, agents, projects, workspaces, and audits using mock data only."
        action={<LogStatusBadge label="No API calls" tone="neutral" />}
      />

      <LogFilter />
      <LogDetails />

      <section className="grid gap-6">
        <LogTable
          title="User Logs"
          description="Mock user actions across PRISM workspaces."
          columns={["Timestamp", "User", "Action", "Workspace", "Status"]}
          rows={userLogs}
        />
        <LogTable
          title="Agent Logs"
          description="Mock multi-agent task execution records."
          columns={["Agent", "Task", "Duration", "Result"]}
          rows={agentLogs}
        />
        <LogTable
          title="Project Logs"
          description="Mock project-level actions and operators."
          columns={["Project", "Action", "User", "Time"]}
          rows={projectLogs}
        />
        <LogTable
          title="Workspace Logs"
          description="Mock workspace events from PRISM surfaces."
          columns={["Workspace", "Event", "Time"]}
          rows={workspaceLogs}
        />
        <LogTable
          title="Audit Logs"
          description="Mock governance and audit trail entries."
          columns={["Severity", "Category", "Description"]}
          rows={auditLogs}
        />
      </section>
    </div>
  );
}
