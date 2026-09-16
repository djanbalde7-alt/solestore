export const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CANCELLED"],
  PAID: ["SHIPPED", "CANCELLED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

export const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-neutral-100 text-neutral-700",
  PAID: "bg-green-100 text-green-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-neutral-900 text-white",
  CANCELLED: "bg-red-100 text-red-800",
};