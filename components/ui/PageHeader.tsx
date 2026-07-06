import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-normal text-white sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            {description}
          </p>
        </div>
        {action}
      </div>
    </section>
  );
}
