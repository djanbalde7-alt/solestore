"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/session";
import { ALLOWED_TRANSITIONS } from "../../../lib/order-status";

const statusSchema = z.enum([
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
]);

export async function updateOrderStatus(orderId: string, formData: FormData) {
  await requireAdmin();

  const parsed = statusSchema.safeParse(formData.get("status"));

  if (!parsed.success) return;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) return;

  const newStatus = parsed.data;

  if (!ALLOWED_TRANSITIONS[order.status].includes(newStatus)) {
    return;
  }

  if (newStatus === "CANCELLED" && order.status === "PAID") {
    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: { status: newStatus },
      }),
      ...order.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: { stock: { increment: item.quantity } },
        })
      ),
    ]);
  } else {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/account/orders");
}