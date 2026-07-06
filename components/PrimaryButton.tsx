import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function PrimaryButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: PrimaryButtonProps) {
  const styles =
    variant === "primary"
      ? "border-cyan-200/70 bg-cyan-300 text-slate-950 hover:bg-cyan-200"
      : "border-white/10 bg-white/[0.04] text-slate-100 hover:border-cyan-300/40 hover:bg-white/[0.07]";

  return (
    <button
      {...props}
      className={[
        "inline-flex h-12 w-full items-center justify-center rounded-lg border px-4 text-sm font-semibold transition hover:-translate-y-0.5 focus-visible:outline-cyan-300 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50",
        styles,
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
