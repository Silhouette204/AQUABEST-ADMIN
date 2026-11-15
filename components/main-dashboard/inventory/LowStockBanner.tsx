import { TriangleAlert } from "lucide-react";

interface Props {
  lowCount: number;
  outCount: number;
}

export function LowStockBanner({ lowCount, outCount }: Props) {
  if (lowCount === 0 && outCount === 0) return null;

  const noun = (n: number) => (n === 1 ? "product is" : "products are");
  const parts: string[] = [];
  if (lowCount > 0) parts.push(`${lowCount} ${noun(lowCount)} running low`);
  if (outCount > 0) {
    const verb = lowCount > 0 ? (outCount === 1 ? "is" : "are") : noun(outCount);
    parts.push(`${outCount} ${verb} out of stock`);
  }

  return (
    <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">
      <TriangleAlert size={16} />
      {parts.join(" and ")}. Refill or adjust stock to avoid order delays.
    </div>
  );
}