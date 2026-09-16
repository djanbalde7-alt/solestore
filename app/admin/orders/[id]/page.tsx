import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getOrderByIdAdmin } from "../../../../lib/admin-queries";
import { formatPrice } from "../../../../lib/format";
import { STATUS_STYLES } from "../../../../lib/order-status";
import StatusSelect from "../StatusSelect";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrderByIdAdmin(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/orders"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Back to orders
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-mono text-lg font-semibold">
            {order.id.slice(0, 8)}
          </h2>
          <p className="mt-1 text-sm text-neutral-600">
            {order.createdAt.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[order.status]}`}
          >
            {order.status}
          </span>
          <StatusSelect orderId={order.id} status={order.status} />
        </div>
      </div>

      <section className="mt-8 rounded-lg border border-neutral-200 p-5">
        <h3 className="mb-3 text-sm font-medium">Customer</h3>
        <p className="text-sm">{order.user.name}</p>
        <p className="text-sm text-neutral-600">{order.user.email}</p>

        {order.address && (
          <>
            <h3 className="mb-1 mt-4 text-sm font-medium">Shipping address</h3>
            <p className="text-sm text-neutral-600">{order.address}</p>
          </>
        )}
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-sm font-medium">Items</h3>

        <div className="flex flex-col gap-3">
          {order.items.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-4 rounded-lg border border-neutral-200 p-4"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-neutral-100">
                <Image
                  src={item.product.images[0]}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/products/${item.product.id}`}
                  className="line-clamp-1 text-sm font-medium hover:underline"
                >
                  {item.product.name}
                </Link>
                <p className="mt-1 text-sm text-neutral-600">
                  {formatPrice(item.unitPrice)} × {item.quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm font-medium">
                {formatPrice(item.unitPrice * item.quantity)}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-between border-t border-neutral-200 pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </section>
    </div>
  );
}