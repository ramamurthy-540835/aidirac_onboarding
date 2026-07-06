import type { ReactNode } from "react";
import { PanelShell } from "@/components/ui/PanelShell";

type PanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Panel({
  title,
  description,
  action,
  children,
  className = "",
}: PanelProps) {
  return (
    <PanelShell
      title={title}
      description={description}
      action={action}
      className={className}
    >
      {children}
    </PanelShell>
  );
}
