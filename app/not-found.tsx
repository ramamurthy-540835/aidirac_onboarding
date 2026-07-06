import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="404"
        title="Page not found"
        description="The requested PRISM page does not exist or is not available in this frontend build."
      />
      <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
        <EmptyState
          title="No matching route"
          description="Use the primary navigation or return to the overview to continue."
        />
        <Link
          href="/"
          className="mt-5 inline-flex rounded-md border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/20"
        >
          Return to overview
        </Link>
      </section>
    </div>
  );
}
