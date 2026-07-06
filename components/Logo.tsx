import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
        AI
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold tracking-[0.18em] text-slate-50">
          AIDIRAC
        </span>
        <span className="block text-xs text-slate-400 group-hover:text-slate-300">
          PRISM Access Layer
        </span>
      </span>
    </Link>
  );
}
