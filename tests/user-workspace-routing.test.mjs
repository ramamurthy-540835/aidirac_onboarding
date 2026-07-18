import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("global workspace entry sends non-admin portal users to User Workspace", async () => {
  const navbar = await readFile(new URL("../components/Navbar.tsx", import.meta.url), "utf8");
  assert.match(navbar, /return "\/workspace\/user"/);
});
