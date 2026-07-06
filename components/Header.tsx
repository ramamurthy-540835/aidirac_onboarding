import { Logo } from "@/components/Logo";
import { NavigationItem } from "@/components/NavigationItem";
import { navigationItems } from "@/components/navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#080b12]/90 backdrop-blur">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="hidden lg:block">
          <p className="text-sm font-medium text-slate-200">
            AIDIRAC Access Layer
          </p>
          <p className="text-xs text-slate-500">
            PRISM AI Workspace Platform foundation
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-md border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-medium text-emerald-200 sm:inline-flex">
            Foundation
          </span>
          <span className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300">
            Phase 1
          </span>
        </div>
      </div>
      <nav
        aria-label="Mobile primary navigation"
        className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-2 lg:hidden"
      >
        {navigationItems.map((item) => (
          <div key={item.href} className="w-40 shrink-0">
            <NavigationItem {...item} compact />
          </div>
        ))}
      </nav>
    </header>
  );
}
