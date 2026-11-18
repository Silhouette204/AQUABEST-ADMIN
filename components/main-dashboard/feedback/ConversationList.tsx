import { Search } from "lucide-react";
import { DataState, getViewState } from "../shared/DataState";
import { Avatar } from "./Avatar";
import { shortTime, type Conversation, type ConversationRole } from "./feedback";

const TABS: { role: ConversationRole; label: string }[] = [
  { role: "customer", label: "Customers" },
  { role: "rider", label: "Riders" },
];

interface Props {
  conversations: Conversation[];
  tab: ConversationRole;
  onTabChange: (tab: ConversationRole) => void;
  query: string;
  onQueryChange: (query: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ConversationList({
  conversations,
  tab,
  onTabChange,
  query,
  onQueryChange,
  selectedId,
  onSelect,
}: Props) {
  const q = query.trim().toLowerCase();
  const visible = conversations.filter(
    (c) =>
      c.role === tab &&
      (q === "" || c.name.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q)),
  );

  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: visible.length });

  const unreadOf = (role: ConversationRole) =>
    conversations.filter((c) => c.role === role).reduce((sum, c) => sum + c.unread, 0);

  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <label className="relative block">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search conversations"
          className="w-full rounded-lg border border-secondary/10 bg-white px-3 py-2.5 pr-9 text-sm outline-none focus:border-tertiary"
        />
        <Search
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-secondary/50"
        />
      </label>

      <div role="tablist" className="mt-5 flex gap-6 border-b border-secondary/10">
        {TABS.map(({ role, label }) => {
          const active = role === tab;
          const count = unreadOf(role);
          return (
            <button
              key={role}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onTabChange(role)}
              className={`-mb-px flex items-center gap-1.5 border-b-2 pb-3 text-sm font-medium ${
                active ? "border-tertiary text-tertiary" : "border-transparent text-secondary/60"
              }`}
            >
              {label}
              {count > 0 && <span>{count}</span>}
            </button>
          );
        })}
      </div>

      <DataState state={state} emptyTitle="No conversations found" skeletonRows={4}>
        <ul className="mt-2">
          {visible.map((c) => {
            const selected = c.id === selectedId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => onSelect(c.id)}
                  className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left ${
                    selected ? "bg-tertiary/10" : "hover:bg-primary"
                  }`}
                >
                  <Avatar name={c.name} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <span className="shrink-0 text-xs text-secondary/50">{shortTime(c.time)}</span>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-secondary/60">{c.preview}</p>
                    {c.unread > 0 && (
                      <p className="mt-1 text-xs font-medium text-tertiary">
                        {c.unread} unread {c.unread === 1 ? "message" : "messages"}
                      </p>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </DataState>
    </div>
  );
}