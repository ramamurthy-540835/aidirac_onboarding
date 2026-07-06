"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/Card";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Stepper } from "@/components/Stepper";

export default function AccessOnboardingPage() {
  const router = useRouter();

  return (
    <PageContainer
      eyebrow="Access Onboarding"
      title="Welcome to the AIDIRAC Access Layer"
      description="AIDIRAC is the controlled entry layer for PRISM, guiding each user into the right workspace based on role, profile, and access readiness."
    >
      <Stepper currentStep={1} />

      <Card className="mx-auto w-full max-w-3xl">
        <div className="space-y-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Set up your workspace foundation
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              This onboarding wizard collects only frontend state for now. It
              will help preview how PRISM routes developers, analysts, clients,
              and administrators into dedicated workspace experiences.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["Choose role", "Complete profile", "Review workspace"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm font-medium text-slate-200"
                >
                  {item}
                </div>
              ),
            )}
          </div>

          <PrimaryButton
            type="button"
            onClick={() => router.push("/access/onboarding/role")}
          >
            Continue
          </PrimaryButton>
        </div>
      </Card>
    </PageContainer>
  );
}
