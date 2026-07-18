import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("User dashboard follows the concise Admin Dashboard composition", async () => {
  const [workspace, dashboard] = await Promise.all([
    readFile(new URL("../components/user-workspace/UserWorkspace.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/user-workspace/UserDashboardClean.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(workspace, /<UserDashboardClean/);
  assert.doesNotMatch(workspace, /ActivityPanel/);
  for (const label of ["Tasks Today", "Completed", "Awaiting Review", "Token Consumption", "Budget Remaining", "Recent work", "Quick actions"]) assert.match(dashboard, new RegExp(label));
});

test("AI Assistant surfaces both PRISM business and Coder Agent modes", async () => {
  const assistant = await readFile(new URL("../components/user-workspace/UserAssistant.tsx", import.meta.url), "utf8");
  assert.match(assistant, /PRISM AI Assistant/);
  assert.match(assistant, /PRISM Coder Agent/);
  assert.match(assistant, /technical requests automatically route to Coder Agent/);
});

test("User Workspace integrates the live PRISM kernel and existing Coder dashboard", async () => {
  const [kernel, consoleView, shell, apiClient] = await Promise.all([
    readFile(new URL("../lib/user-workspace/prism-kernel.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/user-workspace/CoderConsole.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/user-workspace/UserWorkspaceShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/user-workspace/api-client.ts", import.meta.url), "utf8"),
  ]);
  for (const endpoint of ["/status", "/agents", "/intent", "/route", "/agents/run"]) assert.match(kernel, new RegExp(endpoint.replace("/", "\\/")));
  assert.match(consoleView, /PRISM Coding Agent Dashboard/);
  assert.match(consoleView, /codingAgentDashboardUrl/);
  assert.match(shell, /canUseCoderAgent.*Coder Agent/);
  assert.match(apiClient, /prismStatus/);
});
