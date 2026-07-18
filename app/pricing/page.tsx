import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PricingPortal } from "@/components/PricingPortal";

export const metadata: Metadata = {
  title: "Pricing | AIDIRAC",
  description: "AIDIRAC subscription plans for enterprise AI token access.",
};

export default function PricingPage() {
  return (
    <div className="min-h-dvh bg-white">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Pricing</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-slate-950">Plans for every AI workload</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Choose an AIDIRAC subscription based on monthly token needs. Plans are loaded directly from the subscription backend.
          </p>
        </div>
        <div className="mt-10">
          <PricingPortal />
        </div>
      </main>
      <Footer />
    </div>
  );
}
