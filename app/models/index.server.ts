import { seedDatabase } from "../../prisma/seed-functions";

export async function resetDatabase() {
  console.log("resetting database");
  return await seedDatabase();
}
