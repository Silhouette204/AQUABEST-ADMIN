import { CalendarDays, ChevronDown, SlidersHorizontal } from "lucide-react";
import { COMPARE_OPTIONS, REPORT_TABS, type ReportFilters, type ReportTab } from "./reports";

const fieldClass =
  "w-full rounded-lg border border-secondary/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-tertiary";

interface FilterSelectProps<T extends string> {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}

function FilterSelect<T extends string>({ label, value, options, onChange }: FilterSelectProps<T>) {
  return (
    <label className="block w-52">
      <span className="mb-1.5 block text-xs font-semibold">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          className={`${fieldClass} appearance-none pr-9`}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50"
        />
      </div>
    </label>
  );
}

interface Props {
  filters: ReportFilters;
  onChange: (patch: Partial<ReportFilters>) => void;
  onApply: () => void;
  canApply: boolean;
  onPickDate: () => void;
  tab: ReportTab;
  onTabChange: (tab: ReportTab) => void;
  updatedLabel: string;
}

export function ReportsFilters({
  filters,
  onChange,
  onApply,
  canApply,
  onPickDate,
  tab,
  onTabChange,
  updatedLabel,
}: Props) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-end gap-4">
        <div className="w-56">
          <span className="mb-1.5 block text-xs font-semibold">Date range</span>
          <button
            type="button"
            onClick={onPickDate}
            className={`${fieldClass} flex items-center justify-between text-left`}
          >
            {filters.dateRange}
            <CalendarDays size={16} className="text-secondary/50" />
          </button>
        </div>

        <FilterSelect
          label="Compare with"
          value={filters.compareWith}
          options={COMPARE_OPTIONS}
          onChange={(v) => onChange({ compareWith: v })}
        />
        <FilterSelect
          label="Report type"
          value={filters.reportType}
          options={REPORT_TABS}
          onChange={(v) => onChange({ reportType: v })}
        />

        <button
          type="button"
          onClick={onApply}
          disabled={!canApply}
          className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
        >
          <SlidersHorizontal size={16} /> Apply filters
        </button>

        <span className="pb-3 text-xs text-secondary/50">{updatedLabel}</span>
      </div>

      <div role="tablist" className="mt-5 flex gap-6 border-b border-secondary/10">
        {REPORT_TABS.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onTabChange(t)}
              className={`-mb-px border-b-2 pb-3 text-sm font-medium ${
                active ? "border-tertiary text-tertiary" : "border-transparent text-secondary/60"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>
    </div>
  );
}