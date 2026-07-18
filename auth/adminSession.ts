export const adminSessionCookie = "aidirac_admin_session";

export type AdminJwtPayload = {
  sub: string;
  email: string;
  name: string;
  role: "admin";
  organization: string;
  jobRole: string;
  iat: number;
  exp: number;
};

const encoder = new TextEncoder();

function secret() {
  return process.env.ADMIN_JWT_SECRET ?? "aidirac-local-admin-secret-change-in-production";
}

function toBase64Url(value: Uint8Array | string) {
  const bytes = typeof value === "string" ? encoder.encode(value) : value;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function signingKey() {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createAdminJwt(input: Omit<AdminJwtPayload, "iat" | "exp">) {
  const now = Math.floor(Date.now() / 1000);
  const header = toBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = toBase64Url(JSON.stringify({ ...input, iat: now, exp: now + 60 * 60 * 8 }));
  const unsignedToken = `${header}.${payload}`;
  const signature = await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(unsignedToken));
  return `${unsignedToken}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifyAdminJwt(token: string | undefined): Promise<AdminJwtPayload | null> {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  try {
    const [header, payload, signature] = parts;
    const valid = await crypto.subtle.verify(
      "HMAC",
      await signingKey(),
      fromBase64Url(signature),
      encoder.encode(`${header}.${payload}`),
    );
    if (!valid) return null;

    const parsedHeader = JSON.parse(new TextDecoder().decode(fromBase64Url(header))) as { alg?: string };
    const parsedPayload = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as AdminJwtPayload;
    if (parsedHeader.alg !== "HS256" || parsedPayload.role !== "admin" || parsedPayload.exp <= Date.now() / 1000) return null;
    return parsedPayload;
  } catch {
    return null;
  }
}

export function isProvisionedAdmin(email: string) {
  const configured = (process.env.ADMIN_EMAILS ?? "admin@aidirac.com")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return configured.includes(email.trim().toLowerCase());
}

export function isValidAdminPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD;
  return Boolean(configured && password && configured === password.trim());
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}
