"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/Card";
import { getRoleOption, roleOptions } from "@/components/onboarding";
import type { OnboardingRole } from "@/components/onboarding";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { RoleCard } from "@/components/RoleCard";
import { Stepper } from "@/components/Stepper";

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<OnboardingRole>("developer");
  const role = getRoleOption(selectedRole);

  return (
    <PageContainer
      eyebrow="Role Selection"
      title="Choose your PRISM access role"
      description="Your role determines the workspace type AIDIRAC prepares for this frontend-only onboarding flow."
    >
      <Stepper currentStep={2} />

      <Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {roleOptions.map((option) => (
            <RoleCard
              key={option.id}
              role={option}
              selected={selectedRole === option.id}
              onSelect={setSelectedRole}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">{role.title}</p>
            <p className="mt-1 text-sm text-slate-400">{role.workspaceName}</p>
          </div>
          <div className="w-full sm:w-56">
            <PrimaryButton
              type="button"
              onClick={() =>
                router.push(`/access/onboarding/profile?role=${selectedRole}`)
              }
            >
              Continue
            </PrimaryButton>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
}
