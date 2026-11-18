import { DataState, getViewState } from "@/components/main-dashboard/shared/DataState";
import { formatSigned, type RewardActivity } from "./loyalty";

export function RewardActivityCard({ activity }: { activity: RewardActivity[] }) {
  // TODO(backend): palitan ng isLoading/isError mula sa API
  const state = getViewState({ isLoading: false, isError: false, count: activity.length });

  return (
    <div className="rounded-xl border border-secondary/10 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="font-bold">Recent reward activity</h2>
        <button className="text-sm font-medium text-tertiary">View all</button>
      </div>

      <DataState state={state} emptyTitle="No reward activity yet" skeletonRows={3}>
        <table className="w-full text-left text-sm">
          <thead className="bg-primary text-xs text-secondary/60">
            <tr>
              {["Customer", "Reward", "Points", "Date"].map((h) => (
                <th key={h} className="px-5 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {activity.map((a) => (
              <tr key={a.id} className="border-t border-secondary/10">
                <td className="px-5 py-3 font-medium text-tertiary">{a.customer}</td>
                <td className="px-5 py-3">{a.reward}</td>
                <td className="px-5 py-3">{formatSigned(a.points)}</td>
                <td className="px-5 py-3">{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataState>
    </div>
  );
}