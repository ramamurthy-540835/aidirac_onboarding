type LoadingBlockProps = {
  label?: string;
};

export function LoadingBlock({ label = "Loading" }: LoadingBlockProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20"
    >
      <span className="sr-only">{label}</span>
      <div className="space-y-4" aria-hidden="true">
        <div className="h-4 w-40 animate-pulse rounded bg-white/10" />
        <div className="h-24 animate-pulse rounded-lg bg-white/[0.06]" />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="h-20 animate-pulse rounded-lg bg-white/[0.06]" />
          <div className="h-20 animate-pulse rounded-lg bg-white/[0.06]" />
          <div className="h-20 animate-pulse rounded-lg bg-white/[0.06]" />
        </div>
      </div>
    </div>
  );
}
