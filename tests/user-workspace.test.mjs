import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const intentSource = await readFile(new URL("../lib/user-workspace/intent.js", import.meta.url), "utf8");
const intent = await import(`data:text/javascript;base64,${Buffer.from(intentSource).toString("base64")}`);

test("routes technical requests to Coder Agent intent", () => {
  assert.equal(intent.isCoderIntent("Create a Python API and generate unit tests"), true);
  assert.equal(intent.isCoderIntent("Summarize our quarterly business results"), false);
});

test("role permissions hide technical and admin controls from standard users", () => {
  const user = intent.permissionsForRole("user");
  assert.equal(user.canChat, true);
  assert.equal(user.canUseCoderAgent, false);
  assert.equal(user.canViewAudit, false);
  const developer = intent.permissionsForRole("developer");
  assert.equal(developer.canUseCoderAgent, true);
  assert.equal(developer.canViewExecutionLogs, true);
  const administrator = intent.permissionsForRole("administrator");
  assert.equal(administrator.canManageModels, true);
  assert.equal(administrator.canViewAudit, true);
});

test("maps portal roles and validates supported uploads", () => {
  assert.equal(intent.roleFromProfile("user", "Project Manager"), "manager");
  assert.equal(intent.roleFromProfile("user", "Solution Architect"), "developer");
  assert.equal(intent.validateUpload("report.pdf", 1024), null);
  assert.equal(intent.validateUpload("script.exe", 1024), "Unsupported file type");
  assert.equal(intent.validateUpload("large.pdf", 26 * 1024 * 1024), "File exceeds the 25 MB limit");
});

test("User Workspace route and accessible navigation contract exist", async () => {
  const [page, shell, assistant] = await Promise.all([
    readFile(new URL("../app/workspace/user/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/user-workspace/UserWorkspaceShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/user-workspace/UserAssistant.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /<UserWorkspace/);
  for (const label of ["Home", "AI Assistant", "Templates", "My Work", "Knowledge", "Approvals", "Notifications", "Settings"]) assert.match(shell, new RegExp(label));
  assert.match(shell, /aria-label="User Workspace"/);
  assert.match(assistant, /aria-label={label}/);
  assert.match(assistant, /Cancel generation/);
});
