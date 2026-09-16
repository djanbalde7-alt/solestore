"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { auth } from "../../auth";
import { hasPurchased } from "../../lib/queries";

const reviewSchema = z.object({
  productId: z.number().int().positive(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10, "Your review must be at least 10 characters.").max(1000),
});

export type ReviewState = { error: string | null; success: boolean };

export async function createReview(
  _prev: ReviewState,
  formData: FormData
): Promise<ReviewState> {
  const session = await auth();

  if (!session) {
    return { error: "You must be signed in.", success: false };
  }

  const parsed = reviewSchema.safeParse({
    productId: Number(formData.get("productId")),
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, success: false };
  }

  const { productId, rating, comment } = parsed.data;
  const userId = Number(session.user.id);

  const purchased = await hasPurchased(userId, productId);

  if (!purchased) {
    return { error: "You can only review products you've purchased.", success: false };
  }

  try {
    await prisma.review.create({
      data: { userId, productId, rating, comment },
    });
  } catch {
    return { error: "You've already reviewed this product.", success: false };
  }

  revalidatePath(`/product`);

  return { error: null, success: true };
}