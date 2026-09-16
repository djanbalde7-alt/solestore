import Link from "next/link";
import { getDashboardStats, getLowStockProducts } from "../../lib/admin-queries";
import { formatPrice } from "../../lib/format";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();
  const lowStock = await getLowStockProducts();

  const cards = [
    { label: "Revenue", value: formatPrice(stats.revenue) },
    { label: "Orders", value: String(stats.orderCount) },
    { label: "Pending", value: String(stats.pendingCount) },
    { label: "Active products", value: String(stats.productCount) },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-neutral-200 p-5"
          >
            <p className="text-sm text-neutral-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Low stock</h2>

        {lowStock.length === 0 ? (
          <p className="text-sm text-neutral-500">
            All products are well stocked.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {lowStock.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}`}
                className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm transition hover:border-neutral-900"
              >
                <span className="line-clamp-1">{product.name}</span>
                <span
                  className={
                    product.stock === 0
                      ? "font-medium text-red-600"
                      : "font-medium text-orange-600"
                  }
                >
                  {product.stock === 0 ? "Out of stock" : `${product.stock} left`}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}