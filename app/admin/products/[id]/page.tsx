import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories } from "../../../../lib/queries";
import { getProductById } from "../../../../lib/admin-queries";
import { updateProduct } from "../../../actions/admin/products";
import ProductForm from "../ProductForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const categories = await getCategories();

  const updateWithId = updateProduct.bind(null, productId);

  return (
    <div>
      <Link
        href="/admin/products"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Back to products
      </Link>

      <h2 className="mb-2 mt-4 text-lg font-semibold">Edit product</h2>
      <p className="mb-8 font-mono text-sm text-neutral-500">{product.slug}</p>

      <ProductForm
        action={updateWithId}
        categories={categories}
        product={product}
        submitLabel="Save changes"
      />
    </div>
  );
}