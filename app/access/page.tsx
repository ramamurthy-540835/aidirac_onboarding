import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";

const accessPrinciples = [
  "Centralized entry for PRISM workspace access",
  "Role-aware routing for talent, client, and admin users",
  "Foundation ready for authentication and entitlement checks",
];

export default function AccessPage() {
  const authRoutes = [
    {
      href: "/access/login",
      title: "Login",
      description: "Email-first sign-in with local validation.",
    },
    {
      href: "/access/register",
      title: "Register",
      description: "Capture basic access profile details.",
    },
    {
      href: "/access/verify",
      title: "Verify",
      description: "Mock six-digit OTP verification flow.",
    },
  ];

  return (
    <PageContainer
      eyebrow="Access"
      title="Access foundations for controlled workspace entry"
      description="This section establishes the product surface for identity, permissions, and access pathways across the AIDIRAC layer."
    >
      <section className="grid gap-4 md:grid-cols-3">
        {authRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="rounded-lg border border-white/10 bg-[#0d1420] p-5 transition hover:border-cyan-300/40 hover:bg-[#111b2a]"
          >
            <h2 className="text-base font-semibold text-white">
              {route.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              {route.description}
            </p>
            <span className="mt-5 inline-flex text-sm font-medium text-cyan-200">
              Open
            </span>
          </Link>
        ))}
      </section>

      <section className="rounded-lg border border-white/10 bg-[#0d1420] p-6">
        <h2 className="text-lg font-semibold text-white">Phase 1 scope</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {accessPrinciples.map((principle) => (
            <div
              key={principle}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300"
            >
              {principle}
            </div>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
