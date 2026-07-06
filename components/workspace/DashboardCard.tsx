import type { ReactNode } from "react";
import Link from "next/link";
import { StatusBadge } from "@/components/workspace/StatusBadge";

type DashboardCardProps = {
  title: string;
  description: string;
  href?: string;
  marker: string;
  status?: string;
  children?: ReactNode;
};

export function DashboardCard({
  title,
  description,
  href,
  marker,
  status,
  children,
}: DashboardCardProps) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="grid size-10 place-items-center rounded-md bg-cyan-300/10 text-xs font-semibold text-cyan-200">
          {marker}
        </span>
        {status ? <StatusBadge label={status} tone="success" /> : null}
      </div>
      <h2 className="mt-5 text-lg font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      {children ? <div className="mt-5">{children}</div> : null}
    </>
  );

  const className =
    "rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-[#111b2a]";

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return <section className={className}>{content}</section>;
}
