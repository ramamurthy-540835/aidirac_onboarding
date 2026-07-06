import { Card } from "@/components/Card";
import { ProfileForm } from "@/components/ProfileForm";
import { PageContainer } from "@/components/PageContainer";
import { Stepper } from "@/components/Stepper";

type ProfilePageProps = {
  searchParams: Promise<{
    role?: string;
  }>;
};

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const params = await searchParams;

  return (
    <PageContainer
      eyebrow="Profile"
      title="Complete your access profile"
      description="Provide the local profile details used to generate a workspace summary. This information is not sent to a backend."
    >
      <Stepper currentStep={3} />

      <Card className="mx-auto w-full max-w-3xl">
        <ProfileForm roleId={params.role} />
      </Card>
    </PageContainer>
  );
}
