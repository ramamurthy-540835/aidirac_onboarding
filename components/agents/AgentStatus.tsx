import { Badge, type BadgeTone } from "@/components/ui/Badge";

type AgentStatusTone = "idle" | "running" | "complete" | "waiting" | "stopped";

type AgentStatusProps = {
  status: string;
  tone?: AgentStatusTone;
};

const toneMap: Record<AgentStatusTone, BadgeTone> = {
  idle: "neutral",
  running: "info",
  complete: "success",
  waiting: "warning",
  stopped: "danger",
};

export function AgentStatus({ status, tone = "idle" }: AgentStatusProps) {
  return <Badge tone={toneMap[tone]}>{status}</Badge>;
}
