"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItemConfig } from "@/components/navigation";

type NavigationItemProps = NavigationItemConfig & {
  compact?: boolean;
};

export function NavigationItem({
  href,
  label,
  description,
  marker,
  compact = false,
}: NavigationItemProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={[
        "group flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition hover:-translate-y-0.5",
        isActive
          ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
          : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
      ].join(" ")}
    >
      <span
        className={[
          "grid size-8 shrink-0 place-items-center rounded-md text-[11px] font-semibold",
          isActive
            ? "bg-cyan-300 text-slate-950"
            : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200",
        ].join(" ")}
      >
        {marker}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium">{label}</span>
        {!compact && (
          <span className="block truncate text-xs text-slate-500 group-hover:text-slate-400">
            {description}
          </span>
        )}
      </span>
    </Link>
  );
}
