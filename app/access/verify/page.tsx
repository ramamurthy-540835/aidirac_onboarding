"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "@/components/Card";
import { FormField } from "@/components/FormField";
import { OTPInput } from "@/components/OTPInput";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";

const MOCK_OTP = "123456";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (otp.length !== 6) {
      setError("Enter the 6-digit verification code.");
      setStatus("");
      return;
    }

    if (otp !== MOCK_OTP) {
      setError("The verification code is incorrect.");
      setStatus("");
      return;
    }

    setError("");
    setStatus("Verification successful. Redirecting to onboarding...");
    window.setTimeout(() => router.push("/access/onboarding"), 650);
  }

  function handleResend() {
    setError("");
    setStatus("A new mock code was sent. Use 123456 for this prototype.");
  }

  return (
    <PageContainer
      eyebrow="Access Verification"
      title="Verify your access code"
      description="Enter the six-digit mock code to complete the frontend-only verification flow."
    >
      <Card className="mx-auto w-full max-w-xl">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <FormField label="Verification Code" htmlFor="otp" error={error}>
            <OTPInput
              value={otp}
              hasError={Boolean(error)}
              onChange={(value) => {
                setOtp(value);
                if (error) {
                  setError("");
                }
              }}
            />
          </FormField>

          <PrimaryButton type="submit">Verify and Continue</PrimaryButton>
          <PrimaryButton type="button" variant="secondary" onClick={handleResend}>
            Resend OTP
          </PrimaryButton>
        </form>

        {status && (
          <div className="mt-5 rounded-lg border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
            {status}
          </div>
        )}
      </Card>
    </PageContainer>
  );
}
