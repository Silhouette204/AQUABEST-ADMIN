import { SETTINGS_TABS, type SettingsTab } from "./settings";

interface Props {
  tab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export function SettingsTabs({ tab, onTabChange }: Props) {
  return (
    <div role="tablist" className="flex gap-6 border-b border-secondary/10">
      {SETTINGS_TABS.map((t) => {
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
  );
}