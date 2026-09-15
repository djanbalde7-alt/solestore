"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative hover:text-neutral-600">
      Cart
      {totalItems > 0 && (
        <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-900 text-xs text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}