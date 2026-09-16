import ProductCardSkeleton from "../components/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <div className="h-9 w-48 animate-pulse rounded bg-neutral-100" />
        <div className="mt-2 h-4 w-24 animate-pulse rounded bg-neutral-100" />
      </div>

      <div className="mb-8 h-24 animate-pulse rounded bg-neutral-100" />

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}