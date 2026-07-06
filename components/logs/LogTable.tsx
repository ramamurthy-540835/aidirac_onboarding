import { LogStatusBadge } from "@/components/logs/LogStatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

type LogCell = {
  value: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral";
};

type LogRow = Record<string, string | LogCell>;

type LogTableProps = {
  title: string;
  description: string;
  columns: string[];
  rows: LogRow[];
};

function renderCell(cell: string | LogCell) {
  if (typeof cell === "string") {
    return cell;
  }

  return <LogStatusBadge label={cell.value} tone={cell.tone} />;
}

export function LogTable({ title, description, columns, rows }: LogTableProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-[#0d1420] p-5 shadow-2xl shadow-black/20">
      <div>
        <h2 className="text-base font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
      </div>

      {rows.length === 0 ? (
        <div className="mt-5">
          <EmptyState
            title={`No ${title.toLowerCase()} found`}
            description="Adjust filters or search terms to review matching log entries."
          />
        </div>
      ) : (
      <div className="mt-5 overflow-x-auto rounded-lg border border-white/10">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <caption className="sr-only">{title}</caption>
          <thead className="bg-white/[0.03] text-xs uppercase tracking-[0.16em] text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column} scope="col" className="px-4 py-3 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row, index) => (
              <tr key={`${title}-${index}`} className="bg-[#0d1420]">
                {columns.map((column) => (
                  <td key={column} className="whitespace-nowrap px-4 py-3 text-slate-300">
                    {renderCell(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </section>
  );
}
