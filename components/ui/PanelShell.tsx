import type { ReactNode } from "react";

type PanelShellProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  as?: "section" | "article" | "aside";
};

export function PanelShell({
  title,
  description,
  action,
  children,
  className = "",
  contentClassName = "mt-5",
  as: Component = "section",
}: PanelShellProps) {
  const hasHeader = title || description || action;

  return (
    <Component
      className={[
        "rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20",
        className,
      ].join(" ")}
    >
      {hasHeader ? (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {title ? (
              <h2 className="text-base font-semibold text-white">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      <div className={hasHeader ? contentClassName : ""}>{children}</div>
    </Component>
  );
}
