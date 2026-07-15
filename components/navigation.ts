export type NavigationItemConfig = {
  href: string;
  label: string;
  description: string;
  marker: string;
};

export const navigationItems: NavigationItemConfig[] = [
  {
    href: "/",
    label: "Overview",
    description: "AIDIRAC and PRISM foundation",
    marker: "OV",
  },
  {
    href: "/access",
    label: "Access",
    description: "Identity, roles, and entry points",
    marker: "AC",
  },
  {
    href: "/workspace",
    label: "Workspace",
    description: "PRISM workspace dashboards",
    marker: "WS",
  },
  {
    href: "/pricing",
    label: "Pricing",
    description: "Plans, tokens, and subscription tiers",
    marker: "PX",
  },
  {
    href: "/agents",
    label: "Agents",
    description: "Multi-agent control center",
    marker: "AG",
  },
  {
    href: "/logs",
    label: "Logs",
    description: "User, agent, and audit logs",
    marker: "LG",
  },
  {
    href: "/users",
    label: "Users",
    description: "User roles and permissions",
    marker: "US",
  },
  {
    href: "/projects",
    label: "Projects",
    description: "Project ownership and activity",
    marker: "PR",
  },
  {
    href: "/talent",
    label: "Talent",
    description: "Contributor workspace readiness",
    marker: "TL",
  },
  {
    href: "/client",
    label: "Client",
    description: "Client-facing access surfaces",
    marker: "CL",
  },
  {
    href: "/admin",
    label: "Admin",
    description: "Operational controls and governance",
    marker: "AD",
  },
];
