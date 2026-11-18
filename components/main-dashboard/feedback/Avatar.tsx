import { initials } from "./feedback";

const SIZES = {
  sm: "h-8 w-8 text-[11px]",
  md: "h-10 w-10 text-xs",
} as const;

export function Avatar({ name, size = "sm" }: { name: string; size?: keyof typeof SIZES }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-tertiary/10 font-semibold text-tertiary ${SIZES[size]}`}
    >
      {initials(name)}
    </span>
  );
}