"use client";

import { useActionState } from "react";
import { createCategory, type CategoryState } from "../../actions/admin/categories";

const initialState: CategoryState = { error: null };

export default function CategoryForm() {
  const [state, action, pending] = useActionState(createCategory, initialState);

  return (
    <form action={action} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          name="name"
          placeholder="New category name"
          required
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
        >
          {pending ? "Adding..." : "Add"}
        </button>
      </div>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}