import { Info } from "lucide-react";
import { NumberField, SelectField } from "./LoyaltyFields";
import { EXPIRATION_OPTIONS, MULTIPLIER_OPTIONS, RULE_NOTES, type LoyaltyRules } from "./loyalty";

interface Props {
  rules: LoyaltyRules;
  active: boolean;
  onChange: (patch: Partial<LoyaltyRules>) => void;
}

export function PointsRules({ rules, active, onChange }: Props) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Points rules</h2>
        <span className={`text-sm font-medium ${active ? "text-tertiary" : "text-secondary/50"}`}>
          {active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-tertiary/10 px-4 py-3 text-sm text-secondary/80">
        <Info size={16} className="shrink-0 text-tertiary" />
        Points are credited only when an order is delivered and fully paid.
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <NumberField
          label="Spend amount (PHP)"
          value={rules.spendAmount}
          step={0.01}
          onChange={(v) => onChange({ spendAmount: v })}
        />
        <NumberField
          label="Points earned"
          value={rules.pointsEarned}
          onChange={(v) => onChange({ pointsEarned: v })}
        />
        <NumberField
          label="Welcome bonus"
          value={rules.welcomeBonus}
          suffix="points"
          onChange={(v) => onChange({ welcomeBonus: v })}
        />
        <SelectField
          label="VIP points multiplier"
          value={rules.vipMultiplier}
          options={MULTIPLIER_OPTIONS}
          onChange={(v) => onChange({ vipMultiplier: v })}
        />
        <SelectField
          label="Points expiration"
          value={rules.expirationMonths}
          options={EXPIRATION_OPTIONS}
          onChange={(v) => onChange({ expirationMonths: v })}
        />
        <NumberField
          label="Minimum redemption"
          value={rules.minRedemption}
          suffix="points"
          onChange={(v) => onChange({ minRedemption: v })}
        />
      </div>

      <div className="mt-5 space-y-3 border-t border-secondary/10 pt-4 text-sm">
        {RULE_NOTES.map(([label, value]) => (
          <div key={label} className="flex justify-between">
            <span className="text-secondary/60">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}