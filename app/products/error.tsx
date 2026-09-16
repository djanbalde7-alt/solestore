"use client";

import Link from "next/link";

export default function ProductsError({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h2 className="text-xl font-semibold">Couldn&apos;t load products</h2>

      <p className="mt-3 text-neutral-600">
        The catalog is temporarily unavailable.
      </p>

      <div className="mt-8 flex justify-center gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700"
        >
          Try again
        </button>

        <Link
          href="/"
          className="rounded-lg border border-neutral-300 px-6 py-3 font-medium transition hover:border-neutral-900"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}