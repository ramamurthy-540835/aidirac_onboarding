import { Badge, type BadgeTone } from "@/components/ui/Badge";

type LogStatusTone = "success" | "warning" | "danger" | "info" | "neutral";

type LogStatusBadgeProps = {
  label: string;
  tone?: LogStatusTone;
};

const toneMap: Record<LogStatusTone, BadgeTone> = {
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  neutral: "neutral",
};

export function LogStatusBadge({
  label,
  tone = "neutral",
}: LogStatusBadgeProps) {
  return <Badge tone={toneMap[tone]}>{label}</Badge>;
}
