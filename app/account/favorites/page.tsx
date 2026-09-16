import Link from "next/link";
import { requireUser } from "../../../lib/session";
import { getUserFavorites } from "../../../lib/queries";
import ProductCard from "../../components/ProductCard";

export const metadata = {
  title: "Your favorites",
};

export default async function FavoritesPage() {
  const user = await requireUser();
  const favorites = await getUserFavorites(Number(user.id));

  const products = favorites
    .map((f) => f.product)
    .filter((p) => p.active);

  if (products.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Your favorites</h1>
        <p className="mt-4 text-neutral-500">
          You haven&apos;t saved any sneakers yet.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700"
        >
          Browse sneakers
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Your favorites</h1>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}