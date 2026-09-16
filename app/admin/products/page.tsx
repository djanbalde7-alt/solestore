import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "../../../lib/admin-queries";
import { formatPrice } from "../../../lib/format";
import ToggleActiveButton from "./ToggleActiveButton";

export default async function AdminProductsPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Products{" "}
          <span className="font-normal text-neutral-500">
            ({products.length})
          </span>
        </h2>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          New product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="py-16 text-center text-neutral-500">
          No products yet. Create your first one.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-neutral-500">
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Stock</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3" />
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-neutral-100">
                        <Image
                          src={product.images[0]}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <span className="line-clamp-1 font-medium">
                        {product.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 text-neutral-600">
                    {product.category.name}
                  </td>

                  <td className="py-3">{formatPrice(product.price)}</td>

                  <td className="py-3">
                    <span
                      className={
                        product.stock === 0
                          ? "font-medium text-red-600"
                          : product.stock <= 5
                            ? "font-medium text-orange-600"
                            : ""
                      }
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="py-3">
                    <ToggleActiveButton
                      id={product.id}
                      active={product.active}
                    />
                  </td>

                  <td className="py-3 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-neutral-500 hover:text-neutral-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}