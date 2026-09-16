export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-neutral-200 p-5">
            <div className="h-4 w-20 rounded bg-neutral-100" />
            <div className="mt-3 h-7 w-24 rounded bg-neutral-100" />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 h-6 w-28 rounded bg-neutral-100" />

        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-lg border border-neutral-200 bg-neutral-50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}