"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../../lib/prisma";
import { auth } from "../../auth";

export async function toggleFavorite(productId: number) {
  const session = await auth();

  if (!session) {
    return { error: "You must be signed in." };
  }

  const userId = Number(session.user.id);

  const existing = await prisma.favorite.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.favorite.create({
      data: { userId, productId },
    });
  }

  revalidatePath("/account/favorites");

  return { error: null, favorited: !existing };
}

export async function isFavorited(productId: number) {
  const session = await auth();

  if (!session) return false;

  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: { userId: Number(session.user.id), productId },
    },
  });

  return favorite !== null;
}