"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AdminShell } from "@/components/main-dashboard/SystemNavigation/admin-shell";
import {
  LOYALTY_CONFIG,
  LOYALTY_STATS,
  PROGRAM_ACTIVE,
  REWARDS,
  REWARD_ACTIVITY,
  type LoyaltyRules,
  type VipThreshold,
} from "./loyalty";
import { LoyaltyStatsCards } from "./LoyaltyStats";
import { PointsRules } from "./PointsRules";
import { VipThresholdCard } from "./VipThreshold";
import { RewardsList } from "./RewardsList";
import { RewardActivityCard } from "./RewardActivity";

export function LoyaltyPage() {
  const [saved, setSaved] = useState(LOYALTY_CONFIG);
  const [draft, setDraft] = useState(LOYALTY_CONFIG);

  const dirty = JSON.stringify(saved) !== JSON.stringify(draft);

  const updateRules = (patch: Partial<LoyaltyRules>) =>
    setDraft((d) => ({ ...d, rules: { ...d.rules, ...patch } }));

  const updateVip = (patch: Partial<VipThreshold>) =>
    setDraft((d) => ({ ...d, vip: { ...d.vip, ...patch } }));

  const handleSave = () => {
    // TODO(backend): tawagin ang API dito (hal. PUT /loyalty/config) at i-validate gamit ang Zod
    setSaved(draft);
  };

  const handleDiscard = () => setDraft(saved);

  const handleAddReward = () => {
    // TODO: buksan ang Add Reward modal
  };

  const handleEditReward = (rewardId: string) => {
    // TODO: buksan ang Edit Reward modal para sa rewardId
    void rewardId;
  };

  return (
    <AdminShell active="Loyalty & VIP">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Loyalty &amp; VIP</h1>
          <p className="text-sm text-secondary/60">
            Turn everyday refills into lasting customer relationships.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDiscard}
            disabled={!dirty}
            className="rounded-lg border border-secondary/10 bg-white px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Discard changes
          </button>
          <button
            onClick={handleSave}
            disabled={!dirty}
            className="flex items-center gap-2 rounded-lg bg-tertiary px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            <Check size={16} /> Save rules
          </button>
        </div>
      </div>

      <div className="mt-6">
        <LoyaltyStatsCards stats={LOYALTY_STATS} />
      </div>

      <div className="mt-4 grid grid-cols-2 items-start gap-4">
        {/* Kaliwa */}
        <div className="space-y-4">
          <PointsRules rules={draft.rules} active={PROGRAM_ACTIVE} onChange={updateRules} />
          <RewardActivityCard activity={REWARD_ACTIVITY} />
        </div>

        {/* Kanan */}
        <div className="space-y-4">
          <VipThresholdCard vip={draft.vip} multiplier={draft.rules.vipMultiplier} onChange={updateVip} />
          <RewardsList rewards={REWARDS} onAdd={handleAddReward} onEdit={handleEditReward} />
        </div>
      </div>
    </AdminShell>
  );
}