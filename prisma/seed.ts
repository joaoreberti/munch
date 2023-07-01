import { PrismaClient } from "@prisma/client";
import { seedDatabase } from "./seed-functions";

const prisma = new PrismaClient();

seedDatabase()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
