import { ToggleRow } from "./SettingsFields";
import { SECTION_IDS, type SecurityConfig, type SettingsUpdate } from "./settings";

interface Props {
  security: SecurityConfig;
  lastUpdate: SettingsUpdate;
  onChange: (patch: Partial<SecurityConfig>) => void;
  onViewAuditLog: () => void;
}

export function SecurityCard({ security, lastUpdate, onChange, onViewAuditLog }: Props) {
  return (
    <div id={SECTION_IDS.security} className="scroll-mt-4 rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">Security</h2>

      <div className="mt-4">
        <ToggleRow
          label="Two-factor authentication"
          description="Required for all administrator accounts."
          checked={security.twoFactorRequired}
          onChange={(v) => onChange({ twoFactorRequired: v })}
        />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-secondary/10 pt-4">
        <div>
          <p className="text-sm font-semibold">Last settings update</p>
          <p className="text-xs text-secondary/60">
            {lastUpdate.by} · {lastUpdate.at}
          </p>
        </div>
        <button type="button" onClick={onViewAuditLog} className="text-sm font-medium text-tertiary">
          View audit log →
        </button>
      </div>
    </div>
  );
}