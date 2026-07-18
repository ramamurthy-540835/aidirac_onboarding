import type { ReactNode } from "react";

export function WorkspacePanel({ title, description, action, children, className = "" }: { title: string; description?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`border border-slate-200 bg-white text-slate-950 shadow-sm ${className}`}>
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
      <div><h2 className="font-semibold text-slate-950">{title}</h2>{description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}</div>{action}
    </div><div className="p-5">{children}</div>
  </section>;
}

export function StatusPill({ children, tone = "cyan" }: { children: ReactNode; tone?: "cyan" | "green" | "amber" | "red" | "slate" }) {
  const tones = { cyan: "bg-blue-50 text-blue-700 ring-blue-200", green: "bg-emerald-50 text-emerald-700 ring-emerald-200", amber: "bg-amber-50 text-amber-700 ring-amber-200", red: "bg-red-50 text-red-700 ring-red-200", slate: "bg-slate-100 text-slate-700 ring-slate-200" };
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}>{children}</span>;
}

export function EmptyState({ title = "No recent work.", description = "Start by asking PRISM a question, uploading a document, or selecting a template." }: { title?: string; description?: string }) {
  return <div className="rounded-none border border-dashed border-slate-300 bg-slate-50 px-5 py-9 text-center"><p className="font-medium text-slate-800">{title}</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p></div>;
}

export function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div role="alert" className="flex flex-col gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between"><span>{message}</span><button type="button" onClick={onRetry} className="rounded-md border border-red-300 bg-white px-3 py-2 font-semibold hover:bg-red-100">Retry</button></div>;
}

export function WorkspaceSkeleton() {
  return <div aria-label="Loading User Workspace" className="grid animate-pulse gap-4 md:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-36 rounded-xl bg-slate-200" />)}</div>;
}

export function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="border border-slate-200 border-t-4 border-t-blue-600 bg-white p-5 shadow-sm"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p><p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p><p className="mt-2 text-sm text-slate-600">{detail}</p></div>;
}
