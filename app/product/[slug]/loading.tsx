export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-6 py-12">
      <div className="mb-8 h-4 w-64 rounded bg-neutral-100" />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-lg bg-neutral-100" />

        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 rounded bg-neutral-100" />
          <div className="h-8 w-3/4 rounded bg-neutral-100" />
          <div className="h-7 w-28 rounded bg-neutral-100" />
          <div className="mt-2 h-20 rounded bg-neutral-100" />
          <div className="mt-4 h-12 rounded-lg bg-neutral-100" />
        </div>
      </div>
    </div>
  );
}