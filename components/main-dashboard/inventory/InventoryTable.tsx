import { peso } from "../orders/orders";
import { STOCK_BADGE, formatStock, getStockStatus, type Product } from "./inventory";

interface Props {
  products: Product[];
  onEdit: (productId: string) => void;
  onAdjust: (productId: string) => void;
}

export function InventoryTable({ products, onEdit, onAdjust }: Props) {
  return (
    <table className="w-full text-left text-sm">
      <thead className="bg-primary text-xs text-secondary/60">
        <tr>
          {["Product / SKU", "Price", "Full stock", "Empty stock", "Minimum", "Status", "Actions"].map((h) => (
            <th key={h} className="px-4 py-3 font-medium">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map((p) => {
          const status = getStockStatus(p);
          const badge = STOCK_BADGE[status];
          return (
            <tr
              key={p.id}
              className={`border-t border-secondary/10 ${status === "low" ? "bg-amber-50" : ""}`}
            >
              <td className="px-4 py-3 font-medium text-tertiary">
                {p.name}
                <br />
                {p.sku}
              </td>
              <td className="px-4 py-3">{peso(p.price)}</td>
              <td className="px-4 py-3">{formatStock(p.fullStock, p.unit)}</td>
              <td className="px-4 py-3">
                {p.emptyStock === null ? "—" : formatStock(p.emptyStock, p.unit)}
              </td>
              <td className="px-4 py-3">{formatStock(p.minimum, p.unit)}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs ${badge.className}`}>
                  ● {badge.label}
                </span>
              </td>
              <td className="px-4 py-3 text-secondary/70">
                <button onClick={() => onEdit(p.id)}>Edit</button>
                <span className="mx-1.5 text-secondary/40">·</span>
                <button onClick={() => onAdjust(p.id)}>Adjust</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}