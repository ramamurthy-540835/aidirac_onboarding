import { PageContainer } from "@/components/PageContainer";

const talentAreas = [
  "Contributor onboarding readiness",
  "Workspace eligibility signals",
  "Profile and access state foundations",
];

export default function TalentPage() {
  return (
    <PageContainer
      eyebrow="Talent"
      title="Talent workspace foundation"
      description="The talent surface prepares the access layer for contributors who need guided entry into PRISM workflows and workspace capabilities."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {talentAreas.map((area) => (
          <div
            key={area}
            className="rounded-lg border border-white/10 bg-[#0d1420] p-5"
          >
            <h2 className="text-base font-semibold text-white">{area}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Placeholder foundation for future data-backed talent workflows.
            </p>
          </div>
        ))}
      </section>
    </PageContainer>
  );
}
