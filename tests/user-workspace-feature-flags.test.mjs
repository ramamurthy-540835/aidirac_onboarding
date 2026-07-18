import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("static Developer Workspace entry is disabled unless explicitly enabled", async () => {
  const [shell, environment] = await Promise.all([
    readFile(new URL("../components/user-workspace/UserWorkspaceShell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../.env.example", import.meta.url), "utf8"),
  ]);
  assert.match(shell, /NEXT_PUBLIC_DEVELOPER_WORKSPACE_ENABLED === "true"/);
  assert.match(shell, /developerWorkspaceEnabled && profile\.permissions\.canUseCoderAgent/);
  assert.match(environment, /NEXT_PUBLIC_DEVELOPER_WORKSPACE_ENABLED=false/);
});
