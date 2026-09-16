"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "../../actions/admin/orders";
import { ALLOWED_TRANSITIONS } from "../../../lib/order-status";

type Props = {
  orderId: string;
  status: string;
};

export default function StatusSelect({ orderId, status }: Props) {
  const [pending, startTransition] = useTransition();
  const options = ALLOWED_TRANSITIONS[status] ?? [];

  if (options.length === 0) {
    return <span className="text-sm text-neutral-500">No action available</span>;
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (!value) return;

    const formData = new FormData();
    formData.set("status", value);

    startTransition(() => updateOrderStatus(orderId, formData));
  }

  return (
    <select
      onChange={handleChange}
      disabled={pending}
      defaultValue=""
      className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm disabled:opacity-50"
    >
      <option value="" disabled>
        {pending ? "Updating..." : "Change status"}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          Mark as {option.toLowerCase()}
        </option>
      ))}
    </select>
  );
}