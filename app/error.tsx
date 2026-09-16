"use client";

import { useEffect } from "react";
import Link from "next/link";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-2xl font-bold tracking-tight">
        Something went wrong
      </h1>

      <p className="mt-4 text-neutral-600">
        We couldn&apos;t load this page. Please try again.
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

      {error.digest && (
        <p className="mt-8 font-mono text-xs text-neutral-400">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}