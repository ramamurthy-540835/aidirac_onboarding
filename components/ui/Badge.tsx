import type { ReactNode } from "react";

export type BadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "purple";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "border-white/10 bg-white/[0.04] text-slate-300",
  info: "border-cyan-300/25 bg-cyan-300/10 text-cyan-200",
  success: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  warning: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  danger: "border-rose-300/25 bg-rose-300/10 text-rose-200",
  purple: "border-violet-300/25 bg-violet-300/10 text-violet-200",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
