import { Logo } from "@/components/Logo";
import { NavigationItem } from "@/components/NavigationItem";
import { navigationItems } from "@/components/navigation";

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#0b1019]/95 px-4 py-5 lg:flex lg:flex-col">
      <Logo />
      <nav
        aria-label="Primary navigation"
        className="mt-8 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto pr-1"
      >
        {navigationItems.map((item) => (
          <NavigationItem key={item.href} {...item} />
        ))}
      </nav>
      <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">
          Phase 1
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Foundation shell for access, talent, client, and admin surfaces.
        </p>
      </div>
    </aside>
  );
}
