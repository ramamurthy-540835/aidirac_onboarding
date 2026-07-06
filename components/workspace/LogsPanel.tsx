import { Panel } from "@/components/workspace/Panel";

const logs = [
  "[10:42:11] context resolved for workspace/developer",
  "[10:42:14] policy check started",
  "[10:42:18] model route selected: prism-code-fast",
  "[10:42:23] deployment waiting for approval",
];

export function LogsPanel() {
  return (
    <Panel title="Logs Panel" description="Frontend-only activity stream.">
      <div className="rounded-lg border border-white/10 bg-[#080b12] p-4 font-mono text-xs leading-6 text-slate-400">
        {logs.map((log) => (
          <p key={log}>{log}</p>
        ))}
      </div>
    </Panel>
  );
}
