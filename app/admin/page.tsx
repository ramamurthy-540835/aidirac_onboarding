import { PageContainer } from "@/components/PageContainer";

const adminControls = [
  "Governance overview",
  "Access operations",
  "Platform readiness checks",
];

export default function AdminPage() {
  return (
    <PageContainer
      eyebrow="Admin"
      title="Administrative control foundation"
      description="The admin surface frames the operational layer for managing access state, governance, and readiness signals in future phases."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {adminControls.map((control) => (
          <div
            key={control}
            className="rounded-lg border border-white/10 bg-[#0d1420] p-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
              Control
            </p>
            <h2 className="mt-3 text-base font-semibold text-white">
              {control}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Prepared for future administrative workflows and data wiring.
            </p>
          </div>
        ))}
      </section>
    </PageContainer>
  );
}
