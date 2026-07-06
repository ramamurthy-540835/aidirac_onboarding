type EmailInputProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
  placeholder?: string;
};

export function EmailInput({
  id = "email",
  value,
  onChange,
  hasError = false,
  placeholder = "name@company.com",
}: EmailInputProps) {
  return (
    <input
      id={id}
      name="email"
      type="email"
      value={value}
      placeholder={placeholder}
      autoComplete="email"
      aria-invalid={hasError}
      onChange={(event) => onChange(event.target.value)}
      className={[
        "h-12 w-full rounded-lg border bg-slate-950/70 px-4 text-sm text-white outline-none transition placeholder:text-slate-600",
        hasError
          ? "border-red-300/70 focus:border-red-200 focus:ring-2 focus:ring-red-300/20"
          : "border-white/10 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20",
      ].join(" ")}
    />
  );
}
