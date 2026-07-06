import { Badge, type BadgeTone } from "@/components/ui/Badge";

type StatusBadgeTone = "success" | "warning" | "info" | "neutral";

type StatusBadgeProps = {
  label: string;
  tone?: StatusBadgeTone;
};

const toneMap: Record<StatusBadgeTone, BadgeTone> = {
  success: "success",
  warning: "warning",
  info: "info",
  neutral: "neutral",
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return <Badge tone={toneMap[tone]}>{label}</Badge>;
}
