import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const platformSections = [
  {
    title: "AI Platform overview",
    description:
      "Unify enterprise teams around a governed AI intelligence layer for analysis, automation, and decision workflows.",
  },
  {
    title: "Multi-model AI access",
    description:
      "Route work across approved model providers while tracking token usage, subscription limits, and workspace-level access.",
  },
  {
    title: "Agentic AI capabilities",
    description:
      "Coordinate planning, coding, review, testing, and operational agents from a single business-ready platform surface.",
  },
  {
    title: "Enterprise governance",
    description:
      "Support role-aware access, audit-ready controls, subscription state, and repeatable administrative workflows.",
  },
  {
    title: "Security",
    description:
      "Designed for controlled access patterns, organization review paths, quota management, and future identity integration.",
  },
  {
    title: "Pricing CTA",
    description:
      "Start with a transparent token allowance plan or contact sales for custom enterprise terms and capacity.",
  },
];

const metrics = [
  ["4", "Subscription tiers"],
  ["15M", "Tokens on Pro"],
  ["24/7", "Governed access layer"],
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-white">
      <Navbar />
      <main>
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid min-h-[560px] w-full max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                Enterprise AI Intelligence
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
                AIDIRAC - Enterprise AI Intelligence Platform
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                AIDIRAC gives organizations a clean subscription-managed entry point for multi-model AI, agentic workflows, governance, and secure enterprise adoption.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/pricing" className="inline-flex h-12 items-center justify-center rounded-sm bg-blue-700 px-5 text-sm font-semibold text-white hover:bg-blue-800">
                  View pricing
                </Link>
                <Link href="/signup" className="inline-flex h-12 items-center justify-center rounded-sm border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-900 hover:border-blue-700 hover:text-blue-700">
                  Create account
                </Link>
              </div>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
              <div className="border-b border-slate-200 pb-5">
                <p className="text-sm font-semibold text-slate-950">Platform control plane</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Subscription-aware AI operations for governed usage, model access, and role-based workspaces.
                </p>
              </div>
              <div className="mt-6 grid gap-4">
                {metrics.map(([value, label]) => (
                  <div key={label} className="flex items-center justify-between rounded-sm bg-slate-50 p-4">
                    <span className="text-sm text-slate-600">{label}</span>
                    <span className="text-2xl font-semibold text-blue-700">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Platform</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950">Built for serious enterprise AI adoption</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Public subscription access stays simple, while administration, governance, and operational workspaces remain separated behind dedicated platform routes.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {platformSections.map((section) => (
              <article key={section.title} className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-950">{section.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{section.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-blue-700">
          <div className="mx-auto flex w-full max-w-7xl flex-col justify-between gap-6 px-4 py-12 text-white sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-normal">Choose the right AI subscription for your team.</h2>
              <p className="mt-2 text-sm text-blue-100">Start with transparent monthly token limits or contact sales for custom enterprise terms.</p>
            </div>
            <Link href="/pricing" className="inline-flex h-11 shrink-0 items-center justify-center rounded-sm bg-white px-5 text-sm font-semibold text-blue-700 hover:bg-blue-50">
              Compare plans
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
