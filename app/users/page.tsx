import { UserCard } from "@/components/users/UserCard";
import { UserProfileDrawer } from "@/components/users/UserProfileDrawer";
import { UserTable, type UserRecord } from "@/components/users/UserTable";
import { PageHeader } from "@/components/ui/PageHeader";

const users: UserRecord[] = [
  {
    name: "Admin",
    avatar: "AD",
    role: "Admin",
    roleTone: "admin",
    organization: "AIDIRAC Operations",
    status: "Active",
    permissions: ["Manage Users", "Roles", "Billing", "Audit"],
    lastLogin: "Today 10:45",
  },
  {
    name: "Developer",
    avatar: "DV",
    role: "Developer",
    roleTone: "developer",
    organization: "PRISM Engineering",
    status: "Active",
    permissions: ["Code", "Run Tasks", "Deploy Preview"],
    lastLogin: "Today 10:32",
  },
  {
    name: "Business User",
    avatar: "BU",
    role: "Business User",
    roleTone: "business",
    organization: "Client Strategy",
    status: "Active",
    permissions: ["Workflows", "Reports", "Analytics"],
    lastLogin: "Yesterday 17:20",
  },
  {
    name: "AI Agent",
    avatar: "AI",
    role: "AI Agent",
    roleTone: "agent",
    organization: "PRISM Runtime",
    status: "System",
    permissions: ["Plan", "Execute", "Review", "Log"],
    lastLogin: "Continuous",
  },
];

export default function UsersPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <PageHeader
        eyebrow="PRISM Users"
        title="User Management"
        description="Frontend-only user management surface for roles, organizations, status, permissions, and last login activity using mock data."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {users.map((user) => (
          <UserCard key={user.name} user={user} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <UserTable users={users} />
        <UserProfileDrawer user={users[0]} />
      </section>
    </div>
  );
}
