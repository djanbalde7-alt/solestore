"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/session";
import { slugify } from "../../../lib/slug";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  price: z.coerce.number().positive("Price must be greater than zero."),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative."),
  categoryId: z.coerce.number().int().positive("Select a category."),
  image: z.string().url("Enter a valid image URL."),
});

export type ProductState = { error: string | null };

function parseForm(formData: FormData) {
  return productSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    categoryId: formData.get("categoryId"),
    image: formData.get("image"),
  });
}

function revalidatePublicPages(slug?: string) {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
  if (slug) revalidatePath(`/product/${slug}`);
}

export async function createProduct(
  _prev: ProductState,
  formData: FormData
): Promise<ProductState> {
  await requireAdmin();

  const parsed = parseForm(formData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, description, price, stock, categoryId, image } = parsed.data;

  const baseSlug = slugify(name);
  const existing = await prisma.product.findUnique({ where: { slug: baseSlug } });
  const slug = existing ? `${baseSlug}-${Date.now().toString(36)}` : baseSlug;

  await prisma.product.create({
    data: {
      name,
      description,
      slug,
      price: Math.round(price * 100),
      stock,
      categoryId,
      images: [image],
    },
  });

  revalidatePublicPages();
  redirect("/admin/products");
}

export async function updateProduct(
  id: number,
  _prev: ProductState,
  formData: FormData
): Promise<ProductState> {
  await requireAdmin();

  const parsed = parseForm(formData);

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { name, description, price, stock, categoryId, image } = parsed.data;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price: Math.round(price * 100),
      stock,
      categoryId,
      images: [image],
    },
  });

  revalidatePublicPages(product.slug);
  redirect("/admin/products");
}

export async function toggleProductActive(id: number) {
  await requireAdmin();

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) return;

  await prisma.product.update({
    where: { id },
    data: { active: !product.active },
  });

  revalidatePublicPages(product.slug);
}