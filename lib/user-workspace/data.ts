import type { KnowledgeSource, Persona, PromptType, Template } from "@/lib/user-workspace/types";

const suggestions: Record<string, string[]> = {
  "business-user": ["Summarize a document", "Draft a customer email", "Extract action items"],
  "business-analyst": ["Analyse uploaded data", "Compare two documents", "Create an executive report"],
  "project-manager": ["Generate a project plan", "Create meeting notes", "Assess project risks"],
  executive: ["Create an executive summary", "Prepare a decision brief", "Summarize business risks"],
  developer: ["Analyse this repository", "Generate unit tests", "Create an API"],
};

const personaRows = [
  ["business-user", "Business User", "Clear everyday business assistance", "balanced", "clear and practical"],
  ["business-analyst", "Business Analyst", "Structured analysis and evidence", "advanced", "analytical and detailed"],
  ["project-manager", "Project Manager", "Plans, risks, actions, and status", "balanced", "organized and action-oriented"],
  ["solution-architect", "Solution Architect", "Solution options and architecture decisions", "advanced", "technical and structured"],
  ["enterprise-architect", "Enterprise Architect", "Strategy, standards, and target architecture", "advanced", "strategic and governed"],
  ["product-manager", "Product Manager", "Product discovery and delivery", "balanced", "customer-focused"],
  ["sales-consultant", "Sales Consultant", "Customer proposals and communication", "fast", "persuasive and concise"],
  ["hr-professional", "HR Professional", "People operations and communication", "private", "empathetic and compliant"],
  ["finance-analyst", "Finance Analyst", "Financial analysis and commentary", "advanced", "precise and evidence-led"],
  ["marketing-specialist", "Marketing Specialist", "Campaigns, content, and positioning", "balanced", "engaging and on-brand"],
  ["legal-reviewer", "Legal Reviewer", "Risk-aware document review", "private", "careful and qualified"],
  ["executive", "Executive", "Decision-ready summaries and options", "advanced", "concise and strategic"],
  ["developer", "Developer", "Code and engineering tasks", "advanced", "technical and implementation-ready"],
  ["administrator", "Administrator", "Governance and platform operations", "balanced", "controlled and auditable"],
] as const;

export const adapterPersonas: Persona[] = personaRows.map(([id, name, description, defaultModelMode, outputStyle]) => ({ id, name, description, defaultModelMode, outputStyle, suggestions: suggestions[id] || [], preferredTaskTypeIds: [] }));

const taskNames = ["Ask a Question", "Summarize", "Analyse", "Compare", "Draft Email", "Create Report", "Create Presentation", "Create Document", "Create Diagram", "Create Project Plan", "Extract Data", "Generate Meeting Notes", "Review Content", "Rewrite Content", "Translate", "Brainstorm", "Executive Summary", "Risk Assessment", "Proposal Generation"];
export const adapterPromptTypes: PromptType[] = taskNames.map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), name, description: `${name} with governed enterprise context`, outputFormats: ["Response", "Markdown", "Document", "Presentation", "PDF"] }));

const templateRows = [
  ["executive-brief", "Executive Decision Brief", "Executive", "Executive Summary", "Document"],
  ["customer-email", "Customer Follow-up Email", "Sales", "Draft Email", "Email draft"],
  ["project-plan", "Project Delivery Plan", "Project Management", "Create Project Plan", "Document"],
  ["risk-assessment", "Business Risk Assessment", "Business", "Risk Assessment", "PDF"],
  ["architecture-proposal", "Architecture Proposal", "Architecture", "Proposal Generation", "Presentation"],
  ["hr-policy-summary", "HR Policy Summary", "HR", "Summarize", "Document"],
  ["finance-commentary", "Financial Performance Commentary", "Finance", "Analyse", "Report"],
  ["campaign-brief", "Marketing Campaign Brief", "Marketing", "Create Document", "Document"],
] as const;
export const adapterTemplates: Template[] = templateRows.map(([id, name, category, taskType, outputFormat], index) => ({ id, name, category, taskType, outputFormat, description: `Governed ${name.toLowerCase()} workflow`, persona: category, requiredInputs: ["Objective", "Source context"], approvalStatus: "Approved", usageCount: 0, version: "1.0", favorite: index < 2 }));

const sourceRows = [
  ["drive", "Google Drive", "Google Drive", "Unavailable"], ["sharepoint", "SharePoint", "SharePoint", "Unavailable"],
  ["onedrive", "OneDrive", "OneDrive", "Unavailable"], ["confluence", "Confluence", "Confluence", "Unavailable"],
  ["github", "GitHub", "GitHub", "Unavailable"], ["bigquery", "BigQuery", "BigQuery", "Connected"],
  ["gcs", "Cloud Storage", "Cloud Storage", "Connected"], ["catalog", "Knowledge Catalog", "Knowledge Catalog", "Available"],
  ["policies", "Internal policies", "Internal", "Available"], ["projects", "Project documents", "Internal", "Available"],
  ["prompts", "Prompt Registry", "PRISM", "Connected"], ["conversations", "Previous conversations", "PRISM", "Available"],
] as const;
export const adapterKnowledgeSources: KnowledgeSource[] = sourceRows.map(([id, name, type, status]) => ({ id, name, type, status, description: `${name} enterprise knowledge source` }));
