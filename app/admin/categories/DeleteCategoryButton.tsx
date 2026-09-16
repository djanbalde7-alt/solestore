"use client";

import { useState, useTransition } from "react";
import { deleteCategory } from "../../actions/admin/categories";

type Props = {
  id: number;
  disabled: boolean;
};

export default function DeleteCategoryButton({ id, disabled }: Props) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  if (disabled) {
    return (
      <span className="text-sm text-neutral-300" title="Category is not empty">
        Delete
      </span>
    );
  }

  if (confirming) {
    return (
      <span className="flex items-center gap-2 text-sm">
        <button
          onClick={() => startTransition(() => { deleteCategory(id); })}
          disabled={pending}
          className="font-medium text-red-600 hover:underline disabled:opacity-50"
        >
          {pending ? "Deleting..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-neutral-500 hover:underline"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-sm text-neutral-500 hover:text-red-600"
    >
      Delete
    </button>
  );
}