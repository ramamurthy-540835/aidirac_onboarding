import { Badge, type BadgeTone } from "@/components/ui/Badge";

type RoleBadgeTone = "admin" | "developer" | "business" | "agent";

type RoleBadgeProps = {
  role: string;
  tone: RoleBadgeTone;
};

const toneMap: Record<RoleBadgeTone, BadgeTone> = {
  admin: "danger",
  developer: "info",
  business: "success",
  agent: "purple",
};

export function RoleBadge({ role, tone }: RoleBadgeProps) {
  return <Badge tone={toneMap[tone]}>{role}</Badge>;
}
