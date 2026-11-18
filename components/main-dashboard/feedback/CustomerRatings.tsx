import { Star } from "lucide-react";
import { formatNumber, type RatingSummary, type Review } from "./feedback";

function Stars({ rating, size }: { rating: number; size: number }) {
  const filled = Math.round(rating);
  return (
    <span className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={i < filled ? "fill-amber-500 text-amber-500" : "text-secondary/20"}
        />
      ))}
    </span>
  );
}

interface Props {
  summary: RatingSummary;
  reviews: Review[];
  onReply: (reviewId: string) => void;
}

export function CustomerRatings({ summary, reviews, onReply }: Props) {
  return (
    <div className="rounded-xl border border-secondary/10 bg-white p-5">
      <h2 className="font-bold">Customer ratings</h2>

      <div className="mt-4 flex items-center gap-4 border-b border-secondary/10 pb-5">
        <p className="text-5xl font-bold">{summary.average.toFixed(1)}</p>
        <div>
          <Stars rating={summary.average} size={16} />
          <p className="mt-1 text-xs text-secondary/60">
            {formatNumber(summary.reviewCount)} verified reviews
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="mt-4 text-sm text-secondary/60">No reviews yet.</p>
      ) : (
        <ul className="mt-4 space-y-5">
          {reviews.map((r) => (
            <li key={r.id}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{r.customer}</p>
                <Stars rating={r.rating} size={12} />
              </div>
              <p className="mt-1.5 text-sm">“{r.comment}”</p>
              <p className="mt-1.5 text-xs text-secondary/50">
                {r.date} · {r.orderId}
              </p>
              <button
                type="button"
                onClick={() => onReply(r.id)}
                className="mt-2 text-xs font-medium text-tertiary"
              >
                Reply to review
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}