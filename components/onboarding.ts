export type OnboardingRole = "developer" | "business-analyst" | "client" | "admin";

export type RoleOption = {
  id: OnboardingRole;
  icon: string;
  title: string;
  description: string;
  workspaceName: string;
};

export const roleOptions: RoleOption[] = [
  {
    id: "developer",
    icon: "</>",
    title: "Developer",
    description: "Build, integrate, and ship PRISM workspace capabilities.",
    workspaceName: "Developer Workspace",
  },
  {
    id: "business-analyst",
    icon: "BA",
    title: "Business Analyst",
    description: "Map requirements, evaluate workflows, and support delivery.",
    workspaceName: "Business Workspace",
  },
  {
    id: "client",
    icon: "CL",
    title: "Client",
    description: "Review project access, workspace status, and collaboration points.",
    workspaceName: "Client Workspace",
  },
  {
    id: "admin",
    icon: "AD",
    title: "Admin",
    description: "Manage access readiness, governance, and workspace operations.",
    workspaceName: "Admin Workspace",
  },
];

export const onboardingSteps = [
  { label: "Welcome", href: "/access/onboarding" },
  { label: "Role", href: "/access/onboarding/role" },
  { label: "Profile", href: "/access/onboarding/profile" },
  { label: "Workspace", href: "/access/workspace" },
];

export function getRoleOption(roleId?: string | null) {
  return roleOptions.find((role) => role.id === roleId) ?? roleOptions[0];
}

export function generateWorkspaceId(roleId: string, fullName?: string) {
  const seed = `${roleId}-${fullName || "access"}`.toUpperCase();
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1000000;
  }

  return `PRISM-${roleId.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4)}-${hash
    .toString()
    .padStart(6, "0")}`;
}
