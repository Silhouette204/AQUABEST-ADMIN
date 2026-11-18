import { DataState, getViewState } from "../shared/DataState";
import {
  ACCOUNT_STATUS_LABEL,
  SEAT_LIMIT,
  SECTION_IDS,
  type AccountStatus,
  type AdminAccount,
} from "./settings";

const HEADERS = ["User", "Role", "Last active", "Status", "Actions"];

const STATUS_STYLE: Record<AccountStatus, string> = {
  active: "bg-emerald-50 text-emerald-600",
  inactive: "bg-secondary/10 text-secondary/60",
};

interface Props {
  accounts: AdminAccount[];
  onAdd: () => void;
  onEdit: (accountId: string) => void;
}

export function AdminAccountsCard({ accounts, onAdd, onEdit }: Props) {
  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: accounts.length });

  return (
    <div id={SECTION_IDS.users} className="scroll-mt-4 rounded-xl border border-secondary/10 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-bold">Admin accounts</h2>
        <button type="button" onClick={onAdd} className="text-sm font-medium text-tertiary">
          + Add user
        </button>
      </div>

      <DataState state={state} emptyTitle="No admin accounts yet" skeletonRows={3}>
        <table className="w-full text-left text-sm">
          <thead className="bg-primary text-xs text-secondary/60">
            <tr>
              {HEADERS.map((h) => (
                <th key={h} className="px-5 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accounts.map((a) => (
              <tr key={a.id} className="border-t border-secondary/10">
                <td className="px-5 py-3">
                  <p className="font-semibold text-tertiary">{a.name}</p>
                  <p className="text-xs text-secondary/60">{a.username}</p>
                </td>
                <td className="px-5 py-3">{a.role}</td>
                <td className="px-5 py-3">{a.lastActive}</td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[a.status]}`}>
                    ● {ACCOUNT_STATUS_LABEL[a.status]}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <button type="button" onClick={() => onEdit(a.id)} className="text-sm font-medium">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataState>

      <p className="border-t border-secondary/10 px-5 py-4 text-xs text-secondary/60">
        {accounts.length} of {SEAT_LIMIT} user seats in use · Rider accounts are managed in Riders.
      </p>
    </div>
  );
}