import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-base font-semibold text-slate-950">AIDIRAC</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Enterprise AI intelligence platform for governed multi-model access, agentic automation, and usage-aware subscriptions.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">Platform</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <Link href="/pricing" className="hover:text-blue-700">Pricing</Link>
            <Link href="/subscription" className="hover:text-blue-700">Subscription</Link>
            <Link href="/account" className="hover:text-blue-700">Account</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950">Access</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <Link href="/login" className="hover:text-blue-700">Login</Link>
            <Link href="/signup" className="hover:text-blue-700">Signup</Link>
            <Link href="/admin" className="hover:text-blue-700">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
