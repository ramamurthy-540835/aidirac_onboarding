import type { Metadata } from "next";
import { UserWorkspace } from "@/components/user-workspace/UserWorkspace";

export const metadata: Metadata = { title: "User Workspace | AIDIRAC", description: "Governed PRISM workspace for business users, analysis, content, knowledge, artifacts, and approvals." };

export default function UserWorkspacePage() { return <UserWorkspace />; }
