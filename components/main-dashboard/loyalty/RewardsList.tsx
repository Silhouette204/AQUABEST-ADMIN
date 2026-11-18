import { Droplet, Gift, Pencil, Sparkles, type LucideIcon } from "lucide-react";
import type { Reward, RewardIcon } from "./loyalty";

const ICONS: Record<RewardIcon, LucideIcon> = {
  refill: Droplet,
  alkaline: Sparkles,
  discount: Gift,
};

interface Props {
  rewards: Reward[];
  onAdd: () => void;
  onEdit: (rewardId: string) => void;
}

export function RewardsList({ rewards, onAdd, onEdit }: Props) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Available rewards</h2>
        <button onClick={onAdd} className="text-sm font-medium text-tertiary">
          + Add reward
        </button>
      </div>

      {rewards.length === 0 ? (
        <p className="mt-4 text-sm text-secondary/60">No rewards yet. Add one to get started.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {rewards.map((r) => {
            const Icon = ICONS[r.icon];
            return (
              <li key={r.id} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-tertiary/10 text-tertiary">
                  <Icon size={18} />
                </span>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-secondary/60">{r.description}</p>
                </div>
                <span className="text-sm font-semibold text-tertiary">{r.points} pts</span>
                <button
                  onClick={() => onEdit(r.id)}
                  aria-label={`Edit ${r.name}`}
                  className="text-secondary/50"
                >
                  <Pencil size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-5 border-t border-secondary/10 pt-4 text-xs text-secondary/60">
        Rewards apply to the product value. Delivery fees are excluded.
      </p>
    </div>
  );
}