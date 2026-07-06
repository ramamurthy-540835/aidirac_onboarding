import { AgentActivity } from "@/components/agents/AgentActivity";
import { AgentCard, type AgentCardData } from "@/components/agents/AgentCard";
import { AgentExecutionPanel } from "@/components/agents/AgentExecutionPanel";
import { AgentGraph } from "@/components/agents/AgentGraph";
import { AgentStatus } from "@/components/agents/AgentStatus";
import { AgentTaskQueue } from "@/components/agents/AgentTaskQueue";
import { PageHeader } from "@/components/ui/PageHeader";

const agents: AgentCardData[] = [
  {
    name: "Planner Agent",
    description: "Breaks workspace goals into execution plans and task steps.",
    status: "Complete",
    statusTone: "complete",
    lastRun: "Today 10:12",
    assignedTasks: "4",
    modelUsed: "prism-plan-01",
  },
  {
    name: "Coder Agent",
    description: "Transforms approved plans into frontend implementation work.",
    status: "Complete",
    statusTone: "complete",
    lastRun: "Today 10:21",
    assignedTasks: "6",
    modelUsed: "prism-code-01",
  },
  {
    name: "Reviewer Agent",
    description: "Reviews implementation output for risk, quality, and scope.",
    status: "Complete",
    statusTone: "complete",
    lastRun: "Today 10:34",
    assignedTasks: "3",
    modelUsed: "prism-review-01",
  },
  {
    name: "Tester Agent",
    description: "Runs validation plans and records frontend build status.",
    status: "Running",
    statusTone: "running",
    lastRun: "In progress",
    assignedTasks: "5",
    modelUsed: "prism-test-01",
  },
  {
    name: "Deployment Agent",
    description: "Queues release steps after validation and approval gates.",
    status: "Waiting",
    statusTone: "waiting",
    lastRun: "Yesterday 18:05",
    assignedTasks: "2",
    modelUsed: "prism-deploy-01",
  },
  {
    name: "Analytics Agent",
    description: "Summarizes run history, throughput, and workspace signals.",
    status: "Idle",
    statusTone: "idle",
    lastRun: "Today 09:48",
    assignedTasks: "2",
    modelUsed: "prism-analytics-01",
  },
];

export default function AgentsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="PRISM Agents"
        title="Multi-Agent Control Center"
        description="Frontend-only control panel for coordinating planner, coder, reviewer, tester, deployment, and analytics agents."
        action={<AgentStatus status="Mock runtime" tone="running" />}
      />

      <section className="grid gap-4 lg:grid-cols-3">
        <AgentGraph />
        <AgentExecutionPanel />
        <AgentTaskQueue />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.name} agent={agent} />
        ))}
      </section>

      <AgentActivity />
    </div>
  );
}
