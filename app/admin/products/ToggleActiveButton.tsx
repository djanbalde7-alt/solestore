"use client";

import { useTransition } from "react";
import { toggleProductActive } from "../../actions/admin/products";

type Props = {
  id: number;
  active: boolean;
};

export default function ToggleActiveButton({ id, active }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => toggleProductActive(id))}
      disabled={pending}
      className={`rounded-full px-3 py-1 text-xs font-medium transition disabled:opacity-50 ${
        active
          ? "bg-green-100 text-green-800 hover:bg-green-200"
          : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
      }`}
    >
      {active ? "Active" : "Hidden"}
    </button>
  );
}