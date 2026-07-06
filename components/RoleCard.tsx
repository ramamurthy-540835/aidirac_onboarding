import type { RoleOption } from "@/components/onboarding";

type RoleCardProps = {
  role: RoleOption;
  selected: boolean;
  onSelect: (roleId: RoleOption["id"]) => void;
};

export function RoleCard({ role, selected, onSelect }: RoleCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(role.id)}
      aria-pressed={selected}
      className={[
        "min-h-48 rounded-lg border p-5 text-left transition",
        selected
          ? "border-cyan-300/60 bg-cyan-300/10 shadow-2xl shadow-cyan-950/20"
          : "border-white/10 bg-white/[0.03] hover:border-cyan-300/35 hover:bg-white/[0.05]",
      ].join(" ")}
    >
      <span
        className={[
          "grid size-11 place-items-center rounded-lg text-sm font-semibold",
          selected ? "bg-cyan-300 text-slate-950" : "bg-slate-900 text-cyan-200",
        ].join(" ")}
      >
        {role.icon}
      </span>
      <span className="mt-5 block text-lg font-semibold text-white">
        {role.title}
      </span>
      <span className="mt-3 block text-sm leading-6 text-slate-400">
        {role.description}
      </span>
    </button>
  );
}
