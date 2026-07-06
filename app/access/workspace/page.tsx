import { Card } from "@/components/Card";
import { PageContainer } from "@/components/PageContainer";
import { Stepper } from "@/components/Stepper";
import { WorkspaceSummary } from "@/components/WorkspaceSummary";

type WorkspacePageProps = {
  searchParams: Promise<{
    role?: string;
    name?: string;
    organization?: string;
    title?: string;
    country?: string;
    skills?: string;
    github?: string;
  }>;
};

export default async function WorkspacePage({ searchParams }: WorkspacePageProps) {
  const params = await searchParams;

  return (
    <PageContainer
      eyebrow="Workspace Summary"
      title="Your PRISM workspace is ready"
      description="AIDIRAC has generated a frontend-only workspace assignment based on the role and profile details from this session."
    >
      <Stepper currentStep={4} />

      <Card>
        <WorkspaceSummary
          roleId={params.role}
          fullName={params.name}
          organization={params.organization}
          jobTitle={params.title}
          country={params.country}
          skills={params.skills}
          githubUrl={params.github}
        />
      </Card>
    </PageContainer>
  );
}
