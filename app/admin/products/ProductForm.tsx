"use client";

import { useActionState } from "react";
import type { ProductState } from "../../actions/admin/products";

type Category = { id: number; name: string };

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  images: string[];
};

type Props = {
  action: (prev: ProductState, formData: FormData) => Promise<ProductState>;
  categories: Category[];
  product?: Product;
  submitLabel: string;
};

const initialState: ProductState = { error: null };

export default function ProductForm({
  action,
  categories,
  product,
  submitLabel,
}: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-5">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          defaultValue={product?.name}
          required
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={product?.description}
          required
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium">
            Price (USD)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0.01"
            defaultValue={product ? (product.price / 100).toFixed(2) : ""}
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="stock" className="mb-1 block text-sm font-medium">
            Stock
          </label>
          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            defaultValue={product?.stock ?? 0}
            required
            className="w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="categoryId" className="mb-1 block text-sm font-medium">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId ?? ""}
          required
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="image" className="mb-1 block text-sm font-medium">
          Image URL
        </label>
        <input
          id="image"
          name="image"
          type="url"
          defaultValue={product?.images[0]}
          placeholder="https://picsum.photos/seed/example/600/600"
          required
          className="w-full rounded-lg border border-neutral-300 px-3 py-2"
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-lg bg-neutral-900 px-6 py-2.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50"
      >
        {pending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}