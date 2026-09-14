import "dotenv/config";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

const CATEGORIES = [
  { name: "Running", slug: "running" },
  { name: "Basketball", slug: "basketball" },
  { name: "Lifestyle", slug: "lifestyle" },
  { name: "Skateboarding", slug: "skateboarding" },
];

const BRANDS = ["Nike", "Adidas", "New Balance", "Puma", "Asics", "Converse"];
const MODELS = ["Air Max", "Dunk Low", "Gel-Lyte", "Suede Classic", "990v6", "Chuck 70"];

async function main() {
  console.log("Cleaning database...");
  await prisma.favorite.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log("Creating categories...");
  const categories = [];
  for (const c of CATEGORIES) {
    const category = await prisma.category.create({ data: c });
    categories.push(category);
  }

  console.log("Creating products...");
  for (let i = 0; i < 50; i++) {
    const brand = faker.helpers.arrayElement(BRANDS);
    const model = faker.helpers.arrayElement(MODELS);
    const colorway = faker.color.human();
    const name = `${brand} ${model} "${colorway}"`;

    await prisma.product.create({
      data: {
        name,
        slug: faker.helpers.slugify(name).toLowerCase() + "-" + i,
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 6000, max: 25000 }),
        stock: faker.number.int({ min: 0, max: 30 }),
        images: [`https://picsum.photos/seed/${i}/600/600`],
        categoryId: faker.helpers.arrayElement(categories).id,
      },
    });
  }

  console.log("Creating users...");
  const hashedPassword = await bcrypt.hash("password123", 10);

  await prisma.user.create({
    data: {
      email: "admin@solestore.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      email: "client@solestore.com",
      name: "John Doe",
      password: hashedPassword,
      role: "CLIENT",
    },
  });

  console.log("Seed completed");
}

main();