import { getProducts } from "../../lib/queries";
import ProductCard from "../components/ProductCard";

export const revalidate = 3600;

export const metadata = {
  title: "All Sneakers",
  description: "Browse our full collection of premium sneakers.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Sneakers</h1>
        <p className="mt-2 text-sm text-neutral-600">
          {products.length} products
        </p>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-neutral-500">
          No products available.
        </p>
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