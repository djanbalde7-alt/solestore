import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import { requireUser } from "../../../lib/session";
import { formatPrice } from "../../../lib/format";
import ClearCart from "./ClearCart";

export const metadata = {
  title: "Order confirmed",
};

type Props = {
  searchParams: Promise<{ id?: string }>;
};

export default async function SuccessPage({ searchParams }: Props) {
  const user = await requireUser();
  const { id } = await searchParams;

  if (!id) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order || order.userId !== Number(user.id)) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <ClearCart />

      <h1 className="text-3xl font-bold tracking-tight">Thank you for your order</h1>
      <p className="mt-2 text-neutral-600">
        Order <span className="font-mono text-sm">{order.id.slice(0, 8)}</span>
      </p>

      <div className="mt-8 flex flex-col gap-3 rounded-lg border border-neutral-200 p-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>{formatPrice(item.unitPrice * item.quantity)}</span>
          </div>
        ))}

        <div className="mt-3 flex justify-between border-t border-neutral-200 pt-3 font-semibold">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <Link
        href="/products"
        className="mt-8 inline-block rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700"
      >
        Continue shopping
      </Link>
    </div>
  );
}