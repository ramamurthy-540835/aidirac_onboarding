import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const cache = new Map<string, { input: number; output: number; expires: number }>();

export async function estimateModelCost(model: string, inputTokens: number, outputTokens: number) {
  let pricing = cache.get(model);
  if (!pricing || pricing.expires < Date.now()) {
    try {
      const sql = "SELECT cost_per_1k_input,cost_per_1k_output FROM `ctoteam.prism_model_catalog.model_pricing` WHERE model_id=@model_id ORDER BY effective_date DESC,created_at DESC LIMIT 1";
      const { stdout } = await execFileAsync("bq", ["query", "--location=us-central1", "--use_legacy_sql=false", "--format=json", `--parameter=model_id::${model}`, sql], { timeout: 30_000, maxBuffer: 1_000_000 });
      const row = (JSON.parse(stdout) as Array<Record<string, string>>)[0];
      if (row) {
        pricing = { input: Number(row.cost_per_1k_input || 0), output: Number(row.cost_per_1k_output || 0), expires: Date.now() + 300_000 };
        cache.set(model, pricing);
      }
    } catch {
      return 0;
    }
  }
  if (!pricing) return 0;
  return Number(((inputTokens / 1000) * pricing.input + (outputTokens / 1000) * pricing.output).toFixed(6));
}
