import { Info } from "lucide-react";
import type { PermissionRow } from "./settings";

const HEADERS = ["Permission", "Admin", "Dispatcher", "Staff"];

interface Props {
  permissions: PermissionRow[];
  onEditPermissions: () => void;
}

export function RoleManagementCard({ permissions, onEditPermissions }: Props) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white">
      <div className="flex items-center justify-between px-5 pt-5">
        <h2 className="font-bold">Role management</h2>
        <button type="button" onClick={onEditPermissions} className="text-sm font-medium text-tertiary">
          Edit permissions
        </button>
      </div>
      <p className="px-5 pb-4 pt-1 text-sm text-secondary/60">
        Set what each role can view and manage. Admins retain full station access.
      </p>

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
          {permissions.map((p) => (
            <tr key={p.id} className="border-t border-secondary/10">
              <td className="px-5 py-3.5 font-semibold text-tertiary">{p.label}</td>
              <td className="px-5 py-3.5">{p.admin}</td>
              <td className="px-5 py-3.5">{p.dispatcher}</td>
              <td className="px-5 py-3.5">{p.staff}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="m-5 flex items-center gap-2 rounded-lg bg-tertiary/10 px-4 py-3 text-sm text-secondary/80">
        <Info size={16} className="shrink-0 text-tertiary" />
        Changes to permissions are recorded in the security audit log.
      </div>
    </div>
  );
}