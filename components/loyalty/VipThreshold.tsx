import { Crown } from "lucide-react";
import { NumberField } from "./LoyaltyFields";
import type { LoyaltyRules, VipThreshold } from "./loyalty";

interface Props {
  vip: VipThreshold;
  multiplier: LoyaltyRules["vipMultiplier"];
  onChange: (patch: Partial<VipThreshold>) => void;
}

export function VipThresholdCard({ vip, multiplier, onChange }: Props) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">VIP membership threshold</h2>

      <div className="mt-4 flex items-center gap-3 rounded-lg bg-secondary px-5 py-4 text-white">
        <Crown size={22} className="shrink-0" />
        <div>
          <p className="font-semibold">A little more for your regulars</p>
          <p className="text-sm text-white/70">
            {multiplier}× points and priority delivery scheduling.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <NumberField
          label="Lifetime spend (PHP)"
          value={vip.lifetimeSpend}
          step={0.01}
          onChange={(v) => onChange({ lifetimeSpend: v })}
        />
        <NumberField
          label="Completed orders"
          value={vip.completedOrders}
          onChange={(v) => onChange({ completedOrders: v })}
        />
      </div>

      <p className="mt-4 text-xs text-secondary/60">
        Customers must meet both thresholds. VIP status is granted automatically and does not expire.
      </p>
    </div>
  );
}