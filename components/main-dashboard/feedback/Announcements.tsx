import { ChevronDown, Megaphone } from "lucide-react";
import { ANNOUNCEMENT_PLACEHOLDER, AUDIENCES, formatNumber } from "./feedback";

const fieldClass =
  "w-full rounded-lg border border-secondary/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-tertiary";

interface Props {
  audience: string;
  message: string;
  onAudienceChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onSend: () => void;
}

export function Announcements({ audience, message, onAudienceChange, onMessageChange, onSend }: Props) {
  const recipients = AUDIENCES.find((a) => a.value === audience)?.recipients ?? 0;
  const canSend = message.trim() !== "";

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">Announcements</h2>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-semibold">Send to</span>
        <div className="relative">
          <select
            value={audience}
            onChange={(e) => onAudienceChange(e.target.value)}
            className={`${fieldClass} appearance-none pr-9`}
          >
            {AUDIENCES.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50"
          />
        </div>
      </label>

      <textarea
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        rows={5}
        placeholder={ANNOUNCEMENT_PLACEHOLDER}
        className={`${fieldClass} mt-3 resize-none`}
      />

      <p className="mt-3 text-xs text-secondary/60">
        {formatNumber(recipients)} {recipients === 1 ? "customer" : "customers"} will receive this message.
      </p>

      <button
        type="button"
        onClick={onSend}
        disabled={!canSend}
        className="mt-4 flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50"
      >
        <Megaphone size={16} /> Send announcement
      </button>
    </div>
  );
}