import { Badge, type BadgeTone } from "@/components/ui/Badge";

type ProjectStatusTone = "active" | "review" | "queued" | "complete";

type ProjectStatusProps = {
  status: string;
  tone: ProjectStatusTone;
};

const toneMap: Record<ProjectStatusTone, BadgeTone> = {
  active: "info",
  review: "warning",
  queued: "neutral",
  complete: "success",
};

export function ProjectStatus({ status, tone }: ProjectStatusProps) {
  return <Badge tone={toneMap[tone]}>{status}</Badge>;
}
