export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-lg bg-neutral-100" />
      <div className="mt-3 h-4 w-3/4 rounded bg-neutral-100" />
      <div className="mt-2 h-4 w-1/4 rounded bg-neutral-100" />
    </div>
  );
}