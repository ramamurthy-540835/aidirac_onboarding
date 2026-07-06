import { Badge } from "@/components/ui/Badge";

type PermissionBadgeProps = {
  label: string;
};

export function PermissionBadge({ label }: PermissionBadgeProps) {
  return <Badge>{label}</Badge>;
}
