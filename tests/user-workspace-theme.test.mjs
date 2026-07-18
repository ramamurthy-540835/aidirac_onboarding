import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("User Workspace uses the Admin Console blue, white, and slate palette", async () => {
  const [shell, ui, assistant, resources] = await Promise.all([
    readFile(new URL("../components/user-workspace/UserWorkspaceShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/user-workspace/WorkspaceUI.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/user-workspace/UserAssistant.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/user-workspace/UserResources.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(shell, /bg-blue-700/);
  assert.match(shell, /bg-white text-blue-800/);
  assert.match(ui, /border-slate-200 bg-white text-slate-950/);
  assert.match(ui, /bg-blue-50 text-blue-700 ring-blue-200/);
  for (const source of [ui, assistant, resources]) {
    assert.doesNotMatch(source, /bg-\[#(?:07101e|0b1526)\]/);
    assert.doesNotMatch(source, /text-cyan-/);
  }
});
