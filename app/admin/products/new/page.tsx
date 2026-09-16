import Link from "next/link";
import { getCategories } from "../../../../lib/queries";
import { createProduct } from "../../../actions/admin/products";
import ProductForm from "../ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Back to products
      </Link>

      <h2 className="mb-8 mt-4 text-lg font-semibold">New product</h2>

      <ProductForm
        action={createProduct}
        categories={categories}
        submitLabel="Create product"
      />
    </div>
  );
}