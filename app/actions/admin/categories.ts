"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/session";
import { slugify } from "../../../lib/slug";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(40),
});

export type CategoryState = { error: string | null };

export async function createCategory(
  _prev: CategoryState,
  formData: FormData
): Promise<CategoryState> {
  await requireAdmin();

  const parsed = categorySchema.safeParse({ name: formData.get("name") });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name } = parsed.data;
  const slug = slugify(name);

  try {
    await prisma.category.create({ data: { name, slug } });
  } catch {
    return { error: "A category with this name already exists." };
  }

  revalidatePath("/admin/categories");
  revalidatePath("/");

  return { error: null };
}

export async function deleteCategory(id: number) {
  await requireAdmin();

  const count = await prisma.product.count({ where: { categoryId: id } });

  if (count > 0) {
    return { error: `This category still has ${count} products.` };
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/admin/categories");
  revalidatePath("/");

  return { error: null };
}