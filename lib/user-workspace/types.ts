export type UserRole = "user" | "manager" | "developer" | "administrator";
export type GovernanceStatus = "Approved" | "Warning" | "Blocked" | "Needs review" | "Sensitive content detected";
export type ModelMode = "automatic" | "fast" | "balanced" | "advanced" | "lowest-cost" | "private";

export type Permissions = {
  canChat: boolean;
  canUpload: boolean;
  canGenerateArtifacts: boolean;
  canShare: boolean;
  canApprove: boolean;
  canViewTeamUsage: boolean;
  canUseCoderAgent: boolean;
  canViewExecutionLogs: boolean;
  canConnectRepositories: boolean;
  canManageModels: boolean;
  canViewAudit: boolean;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  organization: string;
  department: string;
  role: UserRole;
  jobRole: string;
  activePersonaId: string;
  subscriptionPlan: string;
  permissions: Permissions;
  source: "backend" | "adapter";
};

export type Persona = {
  id: string;
  name: string;
  description: string;
  defaultModelMode: ModelMode;
  outputStyle: string;
  suggestions: string[];
  preferredTaskTypeIds: string[];
};

export type PromptType = { id: string; name: string; description: string; outputFormats: string[] };
export type SourceReference = { id: string; title: string; uri?: string; excerpt?: string };

export type ChatRequest = {
  userId: string;
  organizationId: string;
  workspaceId: string;
  persona: string;
  taskType: string;
  prompt: string;
  attachments: string[];
  conversationId: string;
  outputFormat: string;
  modelPreference: ModelMode;
  knowledgeSourceIds: string[];
  sensitivity: string;
};

export type ChatResponse = {
  id: string;
  conversationId: string;
  prompt: string;
  response: string;
  persona: string;
  taskType: string;
  model: string;
  modelMode: ModelMode;
  routingReason?: string;
  agent: "PRISM" | "PRISM Coder Agent";
  technicalExecutionRequired: boolean;
  sources: SourceReference[];
  confidence: number;
  durationMs: number;
  inputTokens: number;
  outputTokens: number;
  estimatedCostUsd: number;
  governanceStatus: GovernanceStatus;
  timestamp: string;
  executionBackend: "prism-v2-kernel" | "vertex-ai";
  executionStatus: "completed" | "routed" | "fallback";
  kernelRequestId?: string;
  kernelGraph?: Array<Record<string, unknown>>;
};

export type PrismRuntimeStatus = {
  connected: boolean;
  service: string;
  bridgeStatus: string;
  bridgeMode: string;
  coderAgentStatus: string;
  coderModel: string | null;
  error?: string;
};

export type UserTask = {
  id: string;
  title: string;
  taskType: string;
  persona: string;
  status: "draft" | "running" | "awaiting-review" | "completed" | "failed" | "archived";
  model: string;
  outputFormat: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};

export type UsageSummary = {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  monthlyBudgetUsd: number;
  remainingBudgetUsd: number;
  mostUsedModel: string | null;
  mostUsedTaskType: string | null;
  tasksToday: { created: number; completed: number; awaitingReview: number; failed: number; drafts: number };
};

export type Template = {
  id: string;
  name: string;
  description: string;
  category: string;
  persona: string;
  taskType: string;
  requiredInputs: string[];
  outputFormat: string;
  approvalStatus: string;
  usageCount: number;
  version: string;
  favorite: boolean;
};

export type WorkspaceFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  owner: string;
  uploadedAt: string;
  processingStatus: string;
  indexingStatus: string;
  sensitivity: string;
  source: string;
};

export type KnowledgeSource = { id: string; name: string; type: string; status: "Connected" | "Indexing" | "Available" | "Permission denied" | "Unavailable"; description: string };
export type Artifact = { id: string; name: string; type: string; status: string; createdAt: string; version: string; owner: string; approvalStatus: string };
export type Approval = { id: string; title: string; status: "Draft" | "Ready for review" | "Under review" | "Changes requested" | "Approved" | "Rejected" | "Published"; owner: string; reviewer?: string; updatedAt: string };
export type Notification = { id: string; type: string; title: string; message: string; read: boolean; createdAt: string };
export type ModelInfo = { id: string; label: string; provider?: string; tier: string; contextWindow?: string; recommended: boolean; dataPolicy?: string };

export type DashboardData = {
  usage: UsageSummary;
  recentTasks: UserTask[];
  recentArtifacts: Artifact[];
};

export type ApiEnvelope<T> = { data: T; source: "backend" | "adapter"; todo?: string };
