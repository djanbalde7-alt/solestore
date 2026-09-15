"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type Props = {
  productId: number;
  disabled?: boolean;
};

export default function AddToCartButton({ productId, disabled }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (disabled) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-lg bg-neutral-200 py-3 font-medium text-neutral-500"
      >
        Sold out
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="w-full rounded-lg bg-neutral-900 py-3 font-medium text-white transition hover:bg-neutral-700"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}