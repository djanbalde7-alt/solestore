type Review = {
  id: number;
  rating: number;
  comment: string;
  createdAt: Date;
  user: { name: string };
};

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-neutral-500">
        No reviews yet. Be the first to review this product.
      </p>
    );
  }

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div>
      <p className="mb-6 text-sm text-neutral-600">
        <span className="font-medium text-neutral-900">
          {average.toFixed(1)} out of 5
        </span>{" "}
        · {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
      </p>

      <div className="flex flex-col gap-6">
        {reviews.map((review) => (
          <article key={review.id} className="border-b border-neutral-200 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-sm" aria-label={`${review.rating} out of 5 stars`}>
                {"★".repeat(review.rating)}
                <span className="text-neutral-300">
                  {"★".repeat(5 - review.rating)}
                </span>
              </span>
              <span className="text-sm font-medium">{review.user.name}</span>
              <span className="text-sm text-neutral-400">
                {review.createdAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {review.comment}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}