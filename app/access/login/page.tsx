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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [organizationDomain, setOrganizationDomain] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailFlow = getEmailFlow(email);

    if (emailFlow === "invalid") {
      setEmailError(email.trim() ? "Enter a valid email address." : "Email is required.");
      setOrganizationDomain("");
      setSupportMessage("");
      return;
    }

    setEmailError("");
    setSupportMessage("");

    if (emailFlow === "organization") {
      setOrganizationDomain(getEmailDomain(email));
      return;
    }

    router.push("/access/verify");
  }

  if (organizationDomain) {
    return (
      <PageContainer
        eyebrow="Access Authentication"
        title="Sign in to AIDIRAC"
        description="Use your email to continue into the PRISM access layer. Company domains are routed to ClientEdge review."
      >
        <OrganizationReviewMessage
          domain={organizationDomain}
          supportMessage={supportMessage}
          onBackToLogin={() => {
            setOrganizationDomain("");
            setSupportMessage("");
          }}
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
      eyebrow="Access Authentication"
      title="Sign in to AIDIRAC"
      description="Use your email to continue into the PRISM access layer. Public email providers continue to mock OTP verification."
    >
      <Card className="mx-auto w-full max-w-xl">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FormField label="Email" htmlFor="login-email" error={emailError}>
            <EmailInput
              id="login-email"
              value={email}
              hasError={Boolean(emailError)}
              onChange={(value) => {
                setEmail(value);
                if (emailError) {
                  setEmailError("");
                }
                if (supportMessage) {
                  setSupportMessage("");
                }
              }}
            />
          </FormField>

          <PrimaryButton type="submit">Continue</PrimaryButton>

          <PrimaryButton type="button" variant="secondary">
            <span className="mr-2 grid size-5 place-items-center rounded-full bg-white text-xs font-bold text-slate-950">
              G
            </span>
            Continue with Google
          </PrimaryButton>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          New to AIDIRAC?{" "}
          <Link
            href="/access/register"
            className="font-medium text-cyan-200 hover:text-cyan-100"
          >
            Register
          </Link>
        </p>
      </Card>
    </PageContainer>
  );
}
