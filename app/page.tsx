import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { navigationItems } from "@/components/navigation";
import { EmptyState } from "@/components/ui/EmptyState";

export default function Home() {
  const sections = navigationItems.filter((item) => item.href !== "/");

  return (
    <PageContainer
      eyebrow="PRISM AI Workspace Platform"
      title="AIDIRAC Access Layer foundation"
      description="AIDIRAC is the entry layer for PRISM workspace access, coordinating role-based journeys for talent, clients, and administrators before deeper platform modules come online."
    >
      {sections.length === 0 ? (
        <EmptyState
          title="No sections available"
          description="Primary PRISM sections will appear here when navigation entries are configured."
        />
      ) : (
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group rounded-lg border border-white/10 bg-[#0d1420] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-[#111b2a]"
          >
            <span className="grid size-10 place-items-center rounded-md bg-cyan-300/10 text-xs font-semibold text-cyan-200 group-hover:bg-cyan-300 group-hover:text-slate-950">
              {section.marker}
            </span>
            <h2 className="mt-5 text-lg font-semibold text-white">
              {section.label}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {section.description}
            </p>
            <span className="mt-5 inline-flex text-sm font-medium text-cyan-200">
              Open section
            </span>
          </Link>
        ))}
      </section>
      )}

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          ["Workspace gateway", "Unified entry points for PRISM users and partner roles."],
          ["Role clarity", "Separate foundations for talent, client, and admin experiences."],
          ["Scalable shell", "A shared layout ready for data, auth, and workflow modules."],
        ].map(([title, description]) => (
          <div
            key={title}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
          >
            <h2 className="text-base font-semibold text-slate-100">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {description}
            </p>
          </div>
        ))}
      </section>
    </PageContainer>
  );
}
