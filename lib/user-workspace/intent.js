const technicalPatterns = [
  /\b(code|coding|repository|pull request|unit tests?|pytest|npm|dockerfile|kubernetes|terraform)\b/i,
  /\b(create|build|fix|debug|refactor|deploy)\b.{0,32}\b(api|application|code|bug|pipeline|configuration)\b/i,
  /\b(python|typescript|javascript|java|golang|sql)\b/i,
];

export function isCoderIntent(prompt) {
  return technicalPatterns.some((pattern) => pattern.test(prompt));
}

export function roleFromProfile(role, jobRole) {
  const normalized = `${role} ${jobRole}`.toLowerCase();
  if (normalized.includes("admin")) return "administrator";
  if (normalized.includes("developer") || normalized.includes("architect")) return "developer";
  if (normalized.includes("manager") || normalized.includes("lead")) return "manager";
  return "user";
}

export function permissionsForRole(role) {
  const manager = role === "manager" || role === "administrator";
  const developer = role === "developer" || role === "administrator";
  const administrator = role === "administrator";
  return {
    canChat: true,
    canUpload: true,
    canGenerateArtifacts: true,
    canShare: true,
    canApprove: manager,
    canViewTeamUsage: manager,
    canUseCoderAgent: developer,
    canViewExecutionLogs: developer,
    canConnectRepositories: developer,
    canManageModels: administrator,
    canViewAudit: administrator,
  };
}

export const allowedFileExtensions = ["pdf", "docx", "pptx", "xlsx", "csv", "txt", "png", "jpg", "jpeg", "webp", "json", "md"];

export function validateUpload(name, size) {
  const extension = name.toLowerCase().split(".").pop() || "";
  if (!allowedFileExtensions.includes(extension)) return "Unsupported file type";
  if (size > 25 * 1024 * 1024) return "File exceeds the 25 MB limit";
  return null;
}
