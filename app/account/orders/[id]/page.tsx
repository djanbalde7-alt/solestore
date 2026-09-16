import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { requireUser } from "../../../../lib/session";
import { getOrderById } from "../../../../lib/queries";
import { formatPrice } from "../../../../lib/format";

type Props = {
  params: Promise<{ id: string }>;
};

export const metadata = {
  title: "Order details",
};

export default async function OrderDetailPage({ params }: Props) {
  const user = await requireUser();
  const { id } = await params;

  const order = await getOrderById(id, Number(user.id));

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/account/orders"
        className="text-sm text-neutral-500 hover:text-neutral-900"
      >
        ← Back to orders
      </Link>

      <h1 className="mt-6 text-2xl font-bold tracking-tight">
        Order <span className="font-mono text-lg">{order.id.slice(0, 8)}</span>
      </h1>

      <p className="mt-2 text-sm text-neutral-600">
        {order.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        · {order.status}
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {order.items.map((item) => (
          <article
            key={item.id}
            className="flex items-center gap-4 rounded-lg border border-neutral-200 p-4"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-neutral-100">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${item.product.slug}`}
                className="line-clamp-1 font-medium hover:underline"
              >
                {item.product.name}
              </Link>
              <p className="mt-1 text-sm text-neutral-600">
                {formatPrice(item.unitPrice)} × {item.quantity}
              </p>
            </div>

            <p className="shrink-0 font-medium">
              {formatPrice(item.unitPrice * item.quantity)}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>

        {order.address && (
          <div className="mt-6">
            <h2 className="text-sm font-medium">Shipping address</h2>
            <p className="mt-1 text-sm text-neutral-600">{order.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}