import { Panel } from "@/components/workspace/Panel";

const nodes = ["Input", "Plan", "Review", "Deploy"];

export function DagViewerPlaceholder() {
  return (
    <Panel
      title="PRISM DAG Viewer"
      description="Static graph preview for workflow dependencies."
      className="lg:col-span-2"
    >
      <div className="grid gap-3 sm:grid-cols-4">
        {nodes.map((node, index) => (
          <div key={node} className="relative">
            <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-center">
              <p className="text-sm font-semibold text-cyan-100">{node}</p>
              <p className="mt-2 text-xs text-slate-400">Node {index + 1}</p>
            </div>
            {index < nodes.length - 1 ? (
              <div className="hidden sm:block absolute left-[calc(100%+0.15rem)] top-1/2 h-px w-3 bg-cyan-300/40" />
            ) : null}
          </div>
        ))}
      </div>
    </Panel>
  );
}
