import { adapterTemplates } from "@/lib/user-workspace/data";
import type { Approval, Artifact, Notification, WorkspaceFile } from "@/lib/user-workspace/types";

type MutableStore = { files: WorkspaceFile[]; artifacts: Artifact[]; approvals: Approval[]; notifications: Notification[] };
function store(): MutableStore {
  const root = globalThis as typeof globalThis & { __prismUserWorkspace?: MutableStore };
  root.__prismUserWorkspace ??= { files: [], artifacts: [], approvals: [], notifications: [] };
  return root.__prismUserWorkspace;
}
export const adapterTodo = "TODO(PRISM-API): persist this operation in the production workspace service";
export function fileById(id: string) { return store().files.find((item) => item.id === id); }
export function deleteFile(id: string) { const index = store().files.findIndex((item) => item.id === id); if (index < 0) return false; store().files.splice(index, 1); return true; }
export function indexFile(id: string) { const item = fileById(id); if (!item) return null; item.indexingStatus = "Indexing"; return item; }
export function artifactById(id: string) { return store().artifacts.find((item) => item.id === id); }
export function reviseArtifact(id: string) { const item = artifactById(id); if (!item) return null; const major = Number(item.version.split(".")[0] || 1); item.version = `${major + 1}.0`; item.status = "Ready"; return item; }
export function shareArtifact(id: string) { const item = artifactById(id); return item ? { artifactId: id, permission: "Viewer", shared: true } : null; }
export function updateApproval(id: string, status: Approval["status"]) { const item = store().approvals.find((entry) => entry.id === id); if (!item) return null; item.status = status; item.updatedAt = new Date().toISOString(); return item; }
export function markNotificationRead(id: string) { const item = store().notifications.find((entry) => entry.id === id); if (!item) return null; item.read = true; return item; }
export function templateById(id: string) { return adapterTemplates.find((item) => item.id === id); }
