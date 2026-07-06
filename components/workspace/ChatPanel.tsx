import { Panel } from "@/components/workspace/Panel";
import { StatusBadge } from "@/components/workspace/StatusBadge";

const messages = [
  {
    author: "PRISM",
    text: "Workspace context loaded. Ready to help with code, workflow, and deployment tasks.",
  },
  {
    author: "Developer",
    text: "Summarize pending DAG tasks and flag anything blocking deployment.",
  },
  {
    author: "PRISM",
    text: "Three tasks are queued. The staging deploy is waiting on policy checks.",
  },
];

export function ChatPanel() {
  return (
    <Panel
      title="AI Chat Panel"
      description="Context-aware assistant surface for the active workspace."
      action={<StatusBadge label="Static mock" tone="info" />}
      className="lg:col-span-2"
    >
      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={`${message.author}-${message.text}`}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              {message.author}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              {message.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-white/10 bg-[#080b12] px-4 py-3 text-sm text-slate-500">
        Ask PRISM anything about this workspace...
      </div>
    </Panel>
  );
}
