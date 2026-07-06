import type { ReactNode } from "react";
import { PanelShell } from "@/components/ui/PanelShell";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return <PanelShell className={["p-6", className].join(" ")}>{children}</PanelShell>;
}
