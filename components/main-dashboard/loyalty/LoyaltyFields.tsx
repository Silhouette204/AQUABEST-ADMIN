import { ChevronDown } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-secondary/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-tertiary";

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  suffix?: string;
}

export function NumberField({ label, value, onChange, step = 1, suffix }: NumberFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-secondary/70">{label}</span>
      <div className="relative">
        <input
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={`${inputClass} ${suffix ? "pr-16" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-secondary/50">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  value: number;
  options: { value: number; label: string }[];
  onChange: (value: number) => void;
}

export function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-secondary/70">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`${inputClass} appearance-none pr-9`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
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