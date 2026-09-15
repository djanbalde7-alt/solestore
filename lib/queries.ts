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


export type ProductFilters = {
  category?: string;
  q?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
};

export async function getFilteredProducts(filters: ProductFilters) {
  const { category, q, sort, minPrice, maxPrice } = filters;

  return prisma.product.findMany({
    where: {
      active: true,
      ...(category && { category: { slug: category } }),
      ...(q && {
        name: { contains: q, mode: "insensitive" },
      }),
      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: minPrice }),
          ...(maxPrice && { lte: maxPrice }),
        },
      }),
    },
    orderBy: getOrderBy(sort),
    include: { category: true },
  });
}

function getOrderBy(sort?: string) {
  switch (sort) {
    case "price-asc":
      return { price: "asc" as const };
    case "price-desc":
      return { price: "desc" as const };
    case "name":
      return { name: "asc" as const };
    default:
      return { createdAt: "desc" as const };
  }
}

export async function getProductsByIds(ids: number[]) {
  if (ids.length === 0) return [];

  return prisma.product.findMany({
    where: {
      id: { in: ids },
      active: true,
    },
  });
}