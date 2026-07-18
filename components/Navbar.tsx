import Link from "next/link";

const links = [
  { href: "/pricing", label: "Pricing" },
  { href: "/subscription", label: "Subscription" },
  { href: "/account", label: "Account" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="AIDIRAC home">
          <span className="grid size-9 place-items-center rounded-sm bg-blue-700 text-sm font-semibold text-white">
            AI
          </span>
          <span className="text-base font-semibold text-slate-950">AIDIRAC</span>
        </Link>
        <nav aria-label="Public navigation" className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 hover:text-blue-700">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 sm:inline-flex">
            Log in
          </Link>
          <Link href="/signup" className="inline-flex h-10 items-center justify-center rounded-sm bg-blue-700 px-4 text-sm font-semibold text-white hover:bg-blue-800">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
