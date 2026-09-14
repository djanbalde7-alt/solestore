import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-neutral-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/products"
        className="mt-8 inline-block rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700"
      >
        Browse all sneakers
      </Link>
    </div>
  );
}