"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { auth } from "../../auth";

const cartSchema = z.array(
  z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().positive().max(20),
  })
).min(1).max(50);

export type CheckoutState = { error: string | null };

export async function createCheckoutSession(
  _prev: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const session = await auth();

  if (!session) {
    redirect("/signin");
  }

  const raw = formData.get("cart");
  const parsed = cartSchema.safeParse(JSON.parse(String(raw)));

  if (!parsed.success) {
    return { error: "Your cart is invalid. Please refresh the page." };
  }

  const items = parsed.data;

  const products = await prisma.product.findMany({
    where: {
      id: { in: items.map((i) => i.productId) },
      active: true,
    },
  });

  const lines = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      return { error: "One of your items is no longer available." };
    }

    if (product.stock < item.quantity) {
      return { error: `${product.name} — only ${product.stock} left in stock.` };
    }

    lines.push({ product, quantity: item.quantity });
  }

  const total = lines.reduce(
    (sum, l) => sum + l.product.price * l.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId: Number(session.user.id),
      total,
      status: "PENDING",
      address: "",
      items: {
        create: lines.map((l) => ({
          productId: l.product.id,
          quantity: l.quantity,
          unitPrice: l.product.price,
        })),
      },
    },
  });

  const checkout = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: session.user.email,
    line_items: lines.map((l) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: l.product.name,
          images: [l.product.images[0]],
        },
        unit_amount: l.product.price,
      },
      quantity: l.quantity,
    })),
    metadata: { orderId: order.id },
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success?id=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
  });

  redirect(checkout.url!);
}