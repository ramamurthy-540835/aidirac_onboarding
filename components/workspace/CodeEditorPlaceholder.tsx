import { Panel } from "@/components/workspace/Panel";
import { StatusBadge } from "@/components/workspace/StatusBadge";

const files = ["agent.ts", "workflow.prism", "deploy.yml"];
const codeLines = [
  "export async function runPrismTask(context) {",
  "  const plan = await prism.plan(context);",
  "  return prism.execute(plan);",
  "}",
];

export function CodeEditorPlaceholder() {
  return (
    <Panel
      title="Code Editor"
      description="VSCode-style placeholder for future source editing."
      action={<StatusBadge label="Readonly" tone="neutral" />}
      className="lg:col-span-2"
    >
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#080b12]">
        <div className="flex flex-wrap gap-1 border-b border-white/10 bg-white/[0.03] px-3 pt-3">
          {files.map((file, index) => (
            <span
              key={file}
              className={[
                "rounded-t-md border border-b-0 px-3 py-2 text-xs font-medium",
                index === 0
                  ? "border-cyan-300/20 bg-[#080b12] text-cyan-100"
                  : "border-white/10 bg-white/[0.03] text-slate-400",
              ].join(" ")}
            >
              {file}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-[3rem_1fr] font-mono text-sm">
          <div className="border-r border-white/10 bg-white/[0.02] py-4 text-right text-slate-600">
            {codeLines.map((line, index) => (
              <div key={`${line}-${index}`} className="px-3 leading-7">
                {index + 1}
              </div>
            ))}
          </div>
          <div className="overflow-x-auto py-4 text-slate-300">
            {codeLines.map((line) => (
              <pre key={line} className="px-4 leading-7">
                {line}
              </pre>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
