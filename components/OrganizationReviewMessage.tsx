import { Card } from "@/components/Card";
import { PrimaryButton } from "@/components/PrimaryButton";

type OrganizationReviewMessageProps = {
  domain: string;
  onBackToLogin: () => void;
  onContactSupport: () => void;
  supportMessage?: string;
};

export function OrganizationReviewMessage({
  domain,
  onBackToLogin,
  onContactSupport,
  supportMessage = "",
}: OrganizationReviewMessageProps) {
  return (
    <Card className="mx-auto w-full max-w-xl">
      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyan-200/30 bg-cyan-200/10 text-sm font-semibold text-cyan-100">
            CE
          </span>
          <div>
            <h2 className="text-base font-semibold text-white">
              Organization review requested
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              AIDIRAC ClientEdge access review
            </p>
          </div>
        </div>

        <p className="mt-5 whitespace-pre-line text-sm leading-6 text-slate-200">
          {`Thanks for your interest in AIDIRAC ClientEdge.
We detected a company email domain: ${domain}.
Our team will review your organization request and get back to you shortly.`}
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <PrimaryButton type="button" variant="secondary" onClick={onBackToLogin}>
          Back to login
        </PrimaryButton>
        <PrimaryButton type="button" onClick={onContactSupport}>
          Contact support
        </PrimaryButton>
      </div>

      {supportMessage ? (
        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
          {supportMessage}
        </div>
      ) : null}
    </Card>
  );
}
