export type PortalRole = "user" | "admin";

export type PortalUser = {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  role: PortalRole;
  jobRole: string;
};

type StoredUser = PortalUser & { password: string };

const usersKey = "aidirac_portal_users";
const sessionKey = "aidirac_portal_session";

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(usersKey) ?? "[]") as StoredUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(usersKey, JSON.stringify(users));
}

function base64Url(value: unknown) {
  return window.btoa(JSON.stringify(value)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function createJwt(user: PortalUser) {
  const header = { alg: "none", typ: "JWT" };
  const payload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.fullName,
    iat: Math.floor(Date.now() / 1000),
  };
  return `${base64Url(header)}.${base64Url(payload)}.`;
}

function toPortalUser(user: StoredUser): PortalUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    organization: user.organization,
    role: user.role,
    jobRole: user.jobRole,
  };
}

function saveSession(user: PortalUser) {
  const token = createJwt(user);
  window.localStorage.setItem(sessionKey, JSON.stringify({ token, user }));
  return { token, user };
}

export function registerPortalUser(input: {
  fullName: string;
  email: string;
  password: string;
  organization: string;
  role: string;
}) {
  const users = readUsers();
  const email = input.email.trim().toLowerCase();
  const existingIndex = users.findIndex((user) => user.email === email);
  const portalRole: PortalRole = email.includes("admin") || input.role.toLowerCase() === "admin" ? "admin" : "user";
  const user: StoredUser = {
    id: email,
    fullName: input.fullName.trim(),
    email,
    password: input.password,
    organization: input.organization.trim(),
    role: portalRole,
    jobRole: input.role.trim(),
  };

  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  writeUsers(users);
  return saveSession(toPortalUser(user));
}

export function loginPortalUser(emailInput: string, password: string) {
  const email = emailInput.trim().toLowerCase();
  const user = readUsers().find((item) => item.email === email && item.password === password);

  if (!user) {
    return null;
  }

  return saveSession(toPortalUser(user));
}

export function getCurrentUser(): PortalUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const session = JSON.parse(window.localStorage.getItem(sessionKey) ?? "null") as { user: PortalUser } | null;
    return session?.user ?? null;
  } catch {
    return null;
  }
}

export function getCurrentToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const session = JSON.parse(window.localStorage.getItem(sessionKey) ?? "null") as { token: string } | null;
    return session?.token ?? null;
  } catch {
    return null;
  }
}

export function logoutPortalUser() {
  window.localStorage.removeItem(sessionKey);
}
