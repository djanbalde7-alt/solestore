import { prisma } from "./prisma";

export async function getDashboardStats() {
  const [productCount, orderCount, pendingCount, revenue] = await Promise.all([
    prisma.product.count({ where: { active: true } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({
      where: { status: { in: ["PAID", "SHIPPED", "DELIVERED"] } },
      _sum: { total: true },
    }),
  ]);

  return {
    productCount,
    orderCount,
    pendingCount,
    revenue: revenue._sum.total ?? 0,
  };
}

export async function getLowStockProducts(threshold = 5) {
  return prisma.product.findMany({
    where: { active: true, stock: { lte: threshold } },
    orderBy: { stock: "asc" },
    take: 10,
  });
}


export async function getAllProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true },
  });
}

export async function getProductById(id: number) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}


export async function getAllOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      items: true,
    },
  });
}

export async function getOrderByIdAdmin(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: true } },
    },
  });
}