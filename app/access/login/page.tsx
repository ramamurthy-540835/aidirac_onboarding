"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/Card";
import { EmailInput } from "@/components/EmailInput";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";

function validateEmail(value: string) {
  if (!value.trim()) {
    return "Email is required.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Enter a valid email address.";
  }

  return "";
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validateEmail(email);
    setEmailError(nextError);

    if (!nextError) {
      setSubmittedEmail(email.trim());
    }
  }

  return (
    <PageContainer
      eyebrow="Access Authentication"
      title="Sign in to AIDIRAC"
      description="Use your work email to continue into the PRISM access layer. This phase validates the frontend flow only."
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

        {submittedEmail && (
          <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
            Frontend validation passed for {submittedEmail}. Backend handoff is
            not connected yet.
          </div>
        )}

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
