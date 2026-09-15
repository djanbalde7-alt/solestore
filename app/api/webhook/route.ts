import { headers } from "next/headers";
import type Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import { prisma } from "../../../lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object;
    const orderId = checkoutSession.metadata?.orderId;

    if (!orderId) {
      return new Response("Missing orderId", { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return new Response("Order not found", { status: 404 });
    }

    if (order.status !== "PENDING") {
      return new Response("Already processed", { status: 200 });
    }

    const address = checkoutSession.customer_details?.address;
    const formattedAddress = address
      ? [address.line1, address.city, address.postal_code, address.country]
          .filter(Boolean)
          .join(", ")
      : "";

    await prisma.$transaction([
      prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID", address: formattedAddress },
      }),
      ...order.items.map((item) =>
        prisma.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        })
      ),
    ]);
  }

  return new Response("OK", { status: 200 });
}