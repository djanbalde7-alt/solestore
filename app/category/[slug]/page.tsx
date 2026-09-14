import { notFound } from "next/navigation";
import { getProductsByCategory, getCategories } from "../../../lib/queries";
import ProductCard from "../../components/ProductCard";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Category not found" };
  }

  return {
    title: category.name,
    description: `Shop our ${category.name.toLowerCase()} sneakers collection.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(slug);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        <p className="mt-2 text-sm text-neutral-600">
          {products.length} products
        </p>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-neutral-500">
          No products in this category yet.
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