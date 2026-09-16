import { prisma } from "../../../lib/prisma";
import CategoryForm from "./CategoryForm";
import DeleteCategoryButton from "./DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });

  return (
    <div className="max-w-2xl">
      <h2 className="mb-6 text-lg font-semibold">Categories</h2>

      <CategoryForm />

      <div className="mt-8 flex flex-col gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3"
          >
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="font-mono text-xs text-neutral-500">
                {category.slug}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-500">
                {category._count.products}{" "}
                {category._count.products === 1 ? "product" : "products"}
              </span>

              <DeleteCategoryButton
                id={category.id}
                disabled={category._count.products > 0}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}