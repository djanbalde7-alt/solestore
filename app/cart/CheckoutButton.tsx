"use client";

import { useActionState } from "react";
import { createCheckoutSession, type CheckoutState } from "../checkout/actions";
import type { CartItem } from "../../lib/types";

const initialState: CheckoutState = { error: null };

type Props = {
  items: CartItem[];
};

export default function CheckoutButton({ items }: Props) {
  const [state, action, pending] = useActionState(
    createCheckoutSession,
    initialState
  );

  return (
    <form action={action}>
      <input type="hidden" name="cart" value={JSON.stringify(items)} />

      {state.error && (
        <p className="mb-3 text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-neutral-900 py-3 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
      >
        {pending ? "Redirecting..." : "Checkout"}
      </button>
    </form>
  );
}