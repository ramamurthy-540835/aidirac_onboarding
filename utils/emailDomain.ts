export type EmailFlow = "public" | "organization" | "invalid";

const PUBLIC_EMAIL_PROVIDERS = new Set([
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "zoho.com",
]);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getEmailDomain(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return "";
  }

  return normalizedEmail.split("@").at(-1) ?? "";
}

export function isPublicEmailProvider(email: string) {
  const domain = getEmailDomain(email);

  return Boolean(domain && PUBLIC_EMAIL_PROVIDERS.has(domain));
}

export function getEmailFlow(email: string): EmailFlow {
  const domain = getEmailDomain(email);

  if (!domain) {
    return "invalid";
  }

  return PUBLIC_EMAIL_PROVIDERS.has(domain) ? "public" : "organization";
}
