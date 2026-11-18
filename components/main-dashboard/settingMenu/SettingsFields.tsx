import { ChevronDown, type LucideIcon } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-secondary/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-tertiary";

const labelClass = "mb-1.5 block text-xs font-semibold";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel";
  Icon?: LucideIcon;
}

export function TextField({ label, value, onChange, type = "text", Icon }: TextFieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputClass} ${Icon ? "pr-9" : ""}`}
        />
        {Icon && (
          <Icon
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50"
          />
        )}
      </div>
    </label>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export function NumberField({ label, value, onChange, step = 1, prefix, suffix }: NumberFieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-secondary/50">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={0}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className={`${inputClass} ${prefix ? "pl-7" : ""} ${suffix ? "pr-10" : ""}`}
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
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
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

interface ToggleRowProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleRow({ label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-secondary/60">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-tertiary" : "bg-secondary/20"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </div>
  );
}