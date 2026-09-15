"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type FiltersProps = {
  categories: Category[];
};

export default function Filters({ categories }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function reset() {
    router.push(pathname);
  }

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <select
        value={searchParams.get("category") ?? ""}
        onChange={(e) => updateParam("category", e.target.value)}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("sort") ?? ""}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
      >
        <option value="">Newest</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
        <option value="name">Name A-Z</option>
      </select>

      {hasFilters && (
        <button
          onClick={reset}
          className="text-sm text-neutral-600 underline hover:text-neutral-900"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}