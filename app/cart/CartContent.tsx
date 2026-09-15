"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../components/CartProvider";
import { fetchCartProducts } from "./actions";
import { formatPrice } from "../../lib/format";

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  images: string[];
  stock: number;
};

export default function CartContent() {
  const { items, updateQuantity, removeItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = items.map((i) => i.productId);

    fetchCartProducts(ids)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, [items]);

  if (loading) {
    return <p className="py-16 text-center text-neutral-500">Loading...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mb-6 text-neutral-500">Your cart is empty.</p>
        <Link
          href="/products"
          className="inline-block rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white transition hover:bg-neutral-700"
        >
          Browse sneakers
        </Link>
      </div>
    );
  }

  const lines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((line) => line !== null);

  const total = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0
  );

  return (
    <div>
      <div className="flex flex-col gap-4">
        {lines.map((line) => (
          <article
            key={line.productId}
            className="flex items-center gap-4 rounded-lg border border-neutral-200 p-4"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded bg-neutral-100">
              <Image
                src={line.product.images[0]}
                alt={line.product.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${line.product.slug}`}
                className="line-clamp-1 font-medium hover:underline"
              >
                {line.product.name}
              </Link>
              <p className="mt-1 text-sm text-neutral-600">
                {formatPrice(line.product.price)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                className="h-8 w-8 rounded border border-neutral-300 hover:bg-neutral-100"
              >
                −
              </button>
              <span className="w-8 text-center text-sm">{line.quantity}</span>
              <button
                onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                disabled={line.quantity >= line.product.stock}
                className="h-8 w-8 rounded border border-neutral-300 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>

            <p className="w-20 shrink-0 text-right font-medium">
              {formatPrice(line.product.price * line.quantity)}
            </p>

            <button
              onClick={() => removeItem(line.productId)}
              className="shrink-0 text-sm text-neutral-400 hover:text-neutral-900"
            >
              Remove
            </button>
          </article>
        ))}
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">{formatPrice(total)}</span>
        </div>

        <button className="mt-6 w-full rounded-lg bg-neutral-900 py-3 font-medium text-white transition hover:bg-neutral-700">
          Checkout
        </button>

        <p className="mt-3 text-center text-sm text-neutral-500">
          Checkout coming in the next milestone.
        </p>
      </div>
    </div>
  );
}