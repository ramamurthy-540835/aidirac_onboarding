"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/Card";
import { EmailInput } from "@/components/EmailInput";
import { FormField } from "@/components/FormField";
import { OrganizationReviewMessage } from "@/components/OrganizationReviewMessage";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { getEmailDomain, getEmailFlow } from "@/utils/emailDomain";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [errors, setErrors] = useState({ fullName: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [organizationDomain, setOrganizationDomain] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailFlow = getEmailFlow(email);

    const nextErrors = {
      fullName: fullName.trim() ? "" : "Full name is required.",
      email:
        emailFlow === "invalid"
          ? email.trim()
            ? "Enter a valid email address."
            : "Email is required."
          : "",
    };

    setErrors(nextErrors);

    if (nextErrors.fullName || nextErrors.email) {
      setSubmitted(false);
      setOrganizationDomain("");
      setSupportMessage("");
      return;
    }

    setSupportMessage("");

    if (emailFlow === "organization") {
      setSubmitted(false);
      setOrganizationDomain(getEmailDomain(email));
      return;
    }

    setOrganizationDomain("");
    setSubmitted(true);
  }

  if (organizationDomain) {
    return (
      <PageContainer
        eyebrow="Access Registration"
        title="Create an access profile"
        description="Public email registration stays in the frontend flow. Company domains are routed to ClientEdge review."
      >
        <OrganizationReviewMessage
          domain={organizationDomain}
          supportMessage={supportMessage}
          onBackToLogin={() => router.push("/access/login")}
          onContactSupport={() =>
            setSupportMessage(
              "Support contact is mocked in this frontend phase. No email was sent."
            )
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      eyebrow="Access Registration"
      title="Create an access profile"
      description="Collect the initial user details needed for a future PRISM access request. No account is created in Phase 2."
    >
      <Card className="mx-auto w-full max-w-xl">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FormField
            label="Full Name"
            htmlFor="full-name"
            error={errors.fullName}
          >
            <input
              id="full-name"
              name="fullName"
              type="text"
              value={fullName}
              autoComplete="name"
              placeholder="Stephen Raj"
              aria-invalid={Boolean(errors.fullName)}
              onChange={(event) => {
                setFullName(event.target.value);
                if (errors.fullName) {
                  setErrors((current) => ({ ...current, fullName: "" }));
                }
              }}
              className={[
                "h-12 w-full rounded-lg border bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-600",
                errors.fullName
                  ? "border-red-300/70 focus:border-red-200 focus:ring-2 focus:ring-red-300/20"
                  : "border-white/10 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20",
              ].join(" ")}
            />
          </FormField>

          <FormField label="Email" htmlFor="register-email" error={errors.email}>
            <EmailInput
              id="register-email"
              value={email}
              hasError={Boolean(errors.email)}
              onChange={(value) => {
                setEmail(value);
                if (errors.email) {
                  setErrors((current) => ({ ...current, email: "" }));
                }
              }}
            />
          </FormField>

          <FormField
            label="Organization"
            htmlFor="organization"
            hint="Optional"
          >
            <input
              id="organization"
              name="organization"
              type="text"
              value={organization}
              autoComplete="organization"
              placeholder="AIDIRAC Labs"
              onChange={(event) => setOrganization(event.target.value)}
              className="h-12 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20"
            />
          </FormField>

          <PrimaryButton type="submit">Continue</PrimaryButton>
        </form>

        {submitted && (
          <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
            Registration details captured locally. Verification can be wired to
            this flow in a backend phase.
          </div>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have access?{" "}
          <Link
            href="/access/login"
            className="font-medium text-cyan-200 hover:text-cyan-100"
          >
            Sign in
          </Link>
        </p>
      </Card>
    </PageContainer>
  );
}
