import Link from "next/link";
import { onboardingSteps } from "@/components/onboarding";

type StepperProps = {
  currentStep: number;
};

export function Stepper({ currentStep }: StepperProps) {
  return (
    <nav
      aria-label="Onboarding progress"
      className="grid gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-4"
    >
      {onboardingSteps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isComplete = stepNumber < currentStep;

        return (
          <Link
            key={step.label}
            href={step.href}
            className={[
              "flex items-center gap-3 rounded-lg border px-3 py-3 text-sm transition",
              isActive
                ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-slate-200",
            ].join(" ")}
          >
            <span
              className={[
                "grid size-7 shrink-0 place-items-center rounded-md text-xs font-semibold",
                isActive || isComplete
                  ? "bg-cyan-300 text-slate-950"
                  : "bg-slate-800 text-slate-400",
              ].join(" ")}
            >
              {stepNumber}
            </span>
            <span className="truncate font-medium">{step.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
