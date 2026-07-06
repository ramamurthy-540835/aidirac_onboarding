import { PageContainer } from "@/components/PageContainer";

const clientCapabilities = [
  "Client entry context",
  "Project access readiness",
  "Workspace relationship visibility",
];

export default function ClientPage() {
  return (
    <PageContainer
      eyebrow="Client"
      title="Client access surface"
      description="The client route defines the early structure for organizations and stakeholders entering PRISM through AIDIRAC."
    >
      <section className="rounded-lg border border-white/10 bg-[#0d1420] p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {clientCapabilities.map((capability) => (
            <div
              key={capability}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
            >
              <h2 className="text-base font-semibold text-white">
                {capability}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                A foundation block for client-facing access journeys.
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
