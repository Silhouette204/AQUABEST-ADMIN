import { TYPE_BADGE, type Customer } from "./customers";

interface Props {
  customers: Customer[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function CustomersTable({ customers, selectedId, onSelect }: Props) {
  return (
    <div>
      <table className="w-full text-left text-sm">
        <thead className="bg-primary text-xs text-secondary/60">
          <tr>
            {["Customer", "Address", "Orders", "Points", "Type", "Gallons"].map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => {
            const badge = TYPE_BADGE[c.type];
            return (
              <tr
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`cursor-pointer border-t border-secondary/10 ${
                  c.id === selectedId ? "bg-tertiary/10" : "hover:bg-primary"
                }`}
              >
                <td className="px-4 py-3 font-medium text-tertiary">
                  {c.name}
                  <br />
                  {c.phone}
                </td>
                <td className="px-4 py-3">{c.areaLabel}</td>
                <td className="px-4 py-3">{c.totalOrders}</td>
                <td className="px-4 py-3">{c.points}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
                    ● {badge.label}
                  </span>
                </td>
                <td className="px-4 py-3">{c.gallons.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-secondary/10 px-4 py-3 text-xs text-secondary/60">
        <span>Showing 1-{customers.length} of {customers.length} results</span>
        <div className="flex items-center gap-2 text-sm">
          <button className="rounded-lg border border-secondary/10 px-3 py-1.5 font-medium">Previous</button>
          <span className="rounded-lg bg-tertiary/10 px-3 py-1.5 text-tertiary">1</span>
          <button className="rounded-lg border border-secondary/10 px-3 py-1.5 font-medium">Next</button>
        </div>
      </div>
    </div>
  );
}