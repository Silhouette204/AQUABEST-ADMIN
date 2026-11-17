export interface LoyaltyRules {
  spendAmount: number;       // PHP na kailangang gastusin
  pointsEarned: number;      // points na makukuha kada spendAmount
  welcomeBonus: number;
  vipMultiplier: number;
  expirationMonths: number;
  minRedemption: number;
}

export interface VipThreshold {
  lifetimeSpend: number;
  completedOrders: number;
}

export interface LoyaltyConfig {
  rules: LoyaltyRules;
  vip: VipThreshold;
}

export type RewardIcon = "refill" | "alkaline" | "discount";

export interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: RewardIcon;
}

export interface RewardActivity {
  id: string;
  customer: string;
  reward: string;
  points: number; // negatibo kapag na-redeem
  date: string;
}

export interface LoyaltyStats {
  enrolled: number;
  vipMembers: number;
  newVipsThisMonth: number;
  pointsIssued: number;
  rewardsRedeemed: number;
  redeemedValue: number;
}

// Hardcoded muna. Palitan ng API pag ready na ang backend.
export const PROGRAM_ACTIVE = true;

export const LOYALTY_CONFIG: LoyaltyConfig = {
  rules: {
    spendAmount: 35,
    pointsEarned: 10,
    welcomeBonus: 20,
    vipMultiplier: 1.5,
    expirationMonths: 12,
    minRedemption: 100,
  },
  vip: { lifetimeSpend: 1000, completedOrders: 20 },
};

// Mga patakarang hindi pa mababago sa form (display lang)
export const RULE_NOTES: [string, string][] = [
  ["Eligible order types", "Online & Walk-in"],
  ["Cancelled or failed orders", "No points awarded"],
];

export const LOYALTY_STATS: LoyaltyStats = {
  enrolled: 248,
  vipMembers: 36,
  newVipsThisMonth: 4,
  pointsIssued: 12480,
  rewardsRedeemed: 24,
  redeemedValue: 1160,
};

export const REWARDS: Reward[] = [
  { id: "r1", name: "Free purified refill", description: "1 × 5-gallon purified water", points: 100, icon: "refill" },
  { id: "r2", name: "Free alkaline refill", description: "1 × 5-gallon alkaline water", points: 150, icon: "alkaline" },
  { id: "r3", name: "₱100 order discount", description: "Valid on orders of ₱200 or more", points: 300, icon: "discount" },
];

export const REWARD_ACTIVITY: RewardActivity[] = [
  { id: "a1", customer: "Liza Mendoza", reward: "Free purified refill", points: -100, date: "Nov 5" },
  { id: "a2", customer: "Ana Garcia", reward: "Free alkaline refill", points: -150, date: "Nov 4" },
  { id: "a3", customer: "Roberto Lim", reward: "Free purified refill", points: -100, date: "Nov 3" },
];

export const MULTIPLIER_OPTIONS = [1, 1.25, 1.5, 2].map((v) => ({ value: v, label: `${v}×` }));
export const EXPIRATION_OPTIONS = [6, 12, 18, 24].map((v) => ({ value: v, label: `${v} months` }));

export const formatNumber = (n: number) => n.toLocaleString("en-US");
export const formatWhole = (n: number) => `₱${n.toLocaleString("en-US")}`;
export const formatSigned = (n: number) => `${n > 0 ? "+" : "−"}${formatNumber(Math.abs(n))}`;