import Link from "next/link";
import { getFeaturedProducts, getCategories } from "../lib/queries";
import ProductCard from "./components/ProductCard";

export const revalidate = 3600;

export default async function Home() {
  const products = await getFeaturedProducts(8);
  const categories = await getCategories();

  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Premium sneakers, curated.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-600">
            Hand-picked releases from the brands that matter. Free shipping on
            orders over $100.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-lg bg-neutral-900 px-8 py-3 font-medium text-white transition hover:bg-neutral-700"
          >
            Shop all
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-6 text-xl font-semibold">Shop by category</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="rounded-lg border border-neutral-200 p-6 text-center transition hover:border-neutral-900"
            >
              <span className="font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">New arrivals</h2>
          <Link href="/products" className="text-sm text-neutral-600 hover:text-neutral-900">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}