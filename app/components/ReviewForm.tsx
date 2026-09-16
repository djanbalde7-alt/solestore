"use client";

import { useActionState } from "react";
import { createReview, type ReviewState } from "../actions/reviews";

const initialState: ReviewState = { error: null, success: false };

export default function ReviewForm({ productId }: { productId: number }) {
  const [state, action, pending] = useActionState(createReview, initialState);

  if (state.success) {
    return (
      <p className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
        Thanks for your review.
      </p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="productId" value={productId} />

      <div>
        <label htmlFor="rating" className="mb-1 block text-sm font-medium">
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          defaultValue="5"
          className="rounded-lg border border-neutral-300 px-3 py-2"
        >
          <option value="5">★★★★★</option>
          <option value="4">★★★★</option>
          <option value="3">★★★</option>
          <option value="2">★★</option>
          <option value="1">★</option>
        </select>
      </div>

      <div>
        <label htmlFor="comment" className="mb-1 block text-sm font-medium">
          Your review
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          required
          minLength={10}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-lg bg-neutral-900 px-6 py-2 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
      >
        {pending ? "Posting..." : "Post review"}
      </button>
    </form>
  );
}