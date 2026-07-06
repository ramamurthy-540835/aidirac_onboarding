type OTPInputProps = {
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

export function OTPInput({ value, onChange, hasError = false }: OTPInputProps) {
  const normalizedValue = value.padEnd(6, " ").slice(0, 6).split("");

  return (
    <div>
      <label htmlFor="otp" className="sr-only">
        Six-digit verification code
      </label>
      <input
        id="otp"
        name="otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={value}
        onChange={(event) =>
          onChange(event.target.value.replace(/\D/g, "").slice(0, 6))
        }
        className="sr-only"
        aria-invalid={hasError}
      />
      <div
        className={[
          "grid grid-cols-6 gap-2",
          hasError ? "text-red-200" : "text-white",
        ].join(" ")}
        onClick={() => document.getElementById("otp")?.focus()}
      >
        {normalizedValue.map((digit, index) => (
          <div
            key={index}
            className={[
              "grid aspect-square place-items-center rounded-lg border bg-slate-950/70 text-xl font-semibold transition",
              hasError
                ? "border-red-300/70"
                : "border-white/10 focus-within:border-cyan-300/70",
            ].join(" ")}
          >
            {digit.trim()}
          </div>
        ))}
      </div>
    </div>
  );
}
