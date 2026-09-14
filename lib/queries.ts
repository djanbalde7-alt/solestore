import { prisma } from "./prisma";

export async function getProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getProductsByCategory(slug: string) {
  return prisma.product.findMany({
    where: {
      active: true,
      category: { slug },
    },
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export async function getFeaturedProducts(limit = 8) {
  return prisma.product.findMany({
    where: { active: true, stock: { gt: 0 } },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { category: true },
  });
}