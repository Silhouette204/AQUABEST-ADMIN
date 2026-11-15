import type { ReactNode } from "react";
import { AlertCircle, Inbox } from "lucide-react";

export type ViewState = "loading" | "error" | "empty" | "ready";

// Hinuhulaan ang state mula sa mga flags ng fetch (hal. isLoading, isError ng useQuery)
export function getViewState(opts: { isLoading: boolean; isError: boolean; count: number }): ViewState {
  if (opts.isLoading) return "loading";
  if (opts.isError) return "error";
  if (opts.count === 0) return "empty";
  return "ready";
}

interface Props {
  state: ViewState;
  children: ReactNode;
  emptyTitle?: string;
  emptyHint?: string;
  onRetry?: () => void;
  skeletonRows?: number;
}

export function DataState({
  state,
  children,
  emptyTitle = "Nothing to show",
  emptyHint,
  onRetry,
  skeletonRows = 5,
}: Props) {
  if (state === "loading") {
    return (
      <div className="space-y-3 p-5" aria-busy="true" aria-label="Loading">
        {Array.from({ length: skeletonRows }).map((_, i) => (
          <div key={i} className="h-10 animate-pulse rounded-lg bg-secondary/5" />
        ))}
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="flex flex-col items-center gap-2 p-10 text-center">
        <AlertCircle size={28} className="text-red-600" />
        <p className="font-semibold">Something went wrong</p>
        <p className="text-sm text-secondary/60">We couldn&apos;t load this data. Please try again.</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 rounded-lg border border-secondary/10 px-4 py-2 text-sm font-medium"
          >
            Try again
          </button>
        )}
      </div>
    );
  }

  if (state === "empty") {
    return (
      <div className="flex flex-col items-center gap-2 p-10 text-center">
        <Inbox size={28} className="text-secondary/40" />
        <p className="font-semibold">{emptyTitle}</p>
        {emptyHint && <p className="text-sm text-secondary/60">{emptyHint}</p>}
      </div>
    );
  }

  return <>{children}</>;
}