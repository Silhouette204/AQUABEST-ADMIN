"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import {
  ADMIN_ACCOUNTS,
  DEFAULT_SETTINGS,
  LAST_SETTINGS_UPDATE,
  PERMISSIONS,
  TAB_SECTION,
  type OperationsConfig,
  type SecurityConfig,
  type SettingsTab,
  type StationInfo,
} from "./settings";
import { SettingsTabs } from "./SettingsTabs";
import { StationDetailsCard } from "./StationDetails";
import { OperationsCard } from "./Operations";
import { AdminAccountsCard } from "./AdminAccounts";
import { RoleManagementCard } from "./RoleManagement";
import { SecurityCard } from "./SecurityCard";

export function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>("Station settings");
  const [saved, setSaved] = useState(DEFAULT_SETTINGS);
  const [draft, setDraft] = useState(DEFAULT_SETTINGS);

  const dirty = JSON.stringify(saved) !== JSON.stringify(draft);

  const updateStation = (patch: Partial<StationInfo>) =>
    setDraft((d) => ({ ...d, station: { ...d.station, ...patch } }));

  const updateOperations = (patch: Partial<OperationsConfig>) =>
    setDraft((d) => ({ ...d, operations: { ...d.operations, ...patch } }));

  const updateSecurity = (patch: Partial<SecurityConfig>) =>
    setDraft((d) => ({ ...d, security: { ...d.security, ...patch } }));

  const handleSave = () => {
    // TODO(backend): tawagin ang API dito (hal. PUT /settings/station) at i-validate gamit ang Zod
    setSaved(draft);
  };

  const handleDiscard = () => setDraft(saved);

  const handleTabChange = (next: SettingsTab) => {
    setTab(next);
    const sectionId = TAB_SECTION[next];
    if (sectionId) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleUploadLogo = () => {
    // TODO(backend): file picker at upload ng logo (PNG/JPG, hanggang 2 MB)
  };

  const handleAddUser = () => {
    // TODO: buksan ang Add user modal
  };

  const handleEditUser = (accountId: string) => {
    // TODO: buksan ang Edit user modal para sa accountId
    void accountId;
  };

  const handleEditPermissions = () => {
    // TODO: buksan ang Edit permissions modal
  };

  const handleViewAuditLog = () => {
    // TODO: pumunta sa audit log
  };

  return (
    <AdminShell active="Settings">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Settings / Users</h1>
          <p className="text-sm text-secondary/60">
            Configure your station, manage access, and keep your team secure.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDiscard}
            disabled={!dirty}
            className="rounded-lg border border-secondary/10 bg-white px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!dirty}
            className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            <Check size={16} /> Save changes
          </button>
        </div>
      </div>

      <div className="mt-6">
        <SettingsTabs tab={tab} onTabChange={handleTabChange} />
      </div>

      <div className="mt-6 grid grid-cols-2 items-start gap-4">
        {/* Kaliwa */}
        <div className="space-y-4">
          <StationDetailsCard station={draft.station} onChange={updateStation} onUploadLogo={handleUploadLogo} />
          <OperationsCard operations={draft.operations} onChange={updateOperations} />
        </div>

        {/* Kanan */}
        <div className="space-y-4">
          <AdminAccountsCard accounts={ADMIN_ACCOUNTS} onAdd={handleAddUser} onEdit={handleEditUser} />
          <RoleManagementCard permissions={PERMISSIONS} onEditPermissions={handleEditPermissions} />
          <SecurityCard
            security={draft.security}
            lastUpdate={LAST_SETTINGS_UPDATE}
            onChange={updateSecurity}
            onViewAuditLog={handleViewAuditLog}
          />
        </div>
      </div>
    </AdminShell>
  );
}