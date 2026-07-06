const graphNodes = ["Planner", "Coder", "Reviewer", "Tester", "Deployment"];

export function AgentGraph() {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div>
        <h2 className="text-base font-semibold text-white">Agent Graph</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Static execution chain placeholder for coordinated PRISM agents.
        </p>
      </div>

      <div className="mt-5 flex flex-col items-center gap-2">
        {graphNodes.map((node, index) => (
          <div key={node} className="flex w-full flex-col items-center gap-2">
            <div className="w-full max-w-sm rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-center">
              <p className="text-sm font-semibold text-cyan-100">{node}</p>
            </div>
            {index < graphNodes.length - 1 ? (
              <div className="text-xl leading-none text-cyan-300">↓</div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
