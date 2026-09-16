import Link from "next/link";
import { getAllOrders } from "../../../lib/admin-queries";
import { formatPrice } from "../../../lib/format";
import { STATUS_STYLES } from "../../../lib/order-status";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold">
        Orders{" "}
        <span className="font-normal text-neutral-500">({orders.length})</span>
      </h2>

      {orders.length === 0 ? (
        <p className="py-16 text-center text-neutral-500">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-neutral-500">
                <th className="pb-3 font-medium">Order</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-neutral-100 last:border-0"
                >
                  <td className="py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-mono text-xs hover:underline"
                    >
                      {order.id.slice(0, 8)}
                    </Link>
                  </td>

                  <td className="py-3">
                    <p className="font-medium">{order.user.name}</p>
                    <p className="text-xs text-neutral-500">
                      {order.user.email}
                    </p>
                  </td>

                  <td className="py-3 text-neutral-600">
                    {order.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  <td className="py-3 text-neutral-600">
                    {order.items.length}
                  </td>

                  <td className="py-3 font-medium">
                    {formatPrice(order.total)}
                  </td>

                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
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