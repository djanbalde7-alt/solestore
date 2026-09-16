import Link from "next/link";
import { requireUser } from "../../../lib/session";
import { getUserOrders } from "../../../lib/queries";
import { formatPrice } from "../../../lib/format";

export const metadata = {
  title: "Your orders",
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-neutral-100 text-neutral-700",
  PAID: "bg-green-100 text-green-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-neutral-900 text-white",
  CANCELLED: "bg-red-100 text-red-800",
};

export default async function OrdersPage() {
  const user = await requireUser();
  const orders = await getUserOrders(Number(user.id));

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Your orders</h1>
        <p className="mt-4 text-neutral-500">You haven&apos;t ordered yet.</p>
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
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Your orders</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/account/orders/${order.id}`}
            className="rounded-lg border border-neutral-200 p-5 transition hover:border-neutral-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-sm text-neutral-500">
                  {order.id.slice(0, 8)}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  {order.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                >
                  {order.status}
                </span>
                <span className="font-semibold">{formatPrice(order.total)}</span>
              </div>
            </div>

            <p className="mt-3 text-sm text-neutral-500">
              {order.items.length} {order.items.length === 1 ? "item" : "items"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}