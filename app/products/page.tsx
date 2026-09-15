import { Suspense } from "react";
import { getFilteredProducts, getCategories } from "../../lib/queries";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";

export const metadata = {
  title: "All Sneakers",
  description: "Browse our full collection of premium sneakers.",
};

type Props = {
  searchParams: Promise<{
    category?: string;
    q?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;

  const products = await getFilteredProducts({
    category: params.category,
    q: params.q,
    sort: params.sort,
  });

  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Sneakers</h1>
        <p className="mt-2 text-sm text-neutral-600">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>

      <Suspense fallback={<div className="mb-8 h-24" />}>
        <div className="mb-4">
          <SearchBar />
        </div>
        <Filters categories={categories} />
      </Suspense>

      {products.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-neutral-500">No products match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}