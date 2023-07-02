import type { Product } from "@prisma/client";
import { prisma } from "~/db.server";

export function getProduct({ id }: Pick<Product, "id">) {
  return prisma.product.findFirst({
    include: {
      ProductReviews: { include: { user: true } },
      restaurant: true,
    },
    where: { id },
  });
}

export function getProducts() {
  return prisma.product.findMany({
    include: {
      ProductReviews: { include: { user: true } },
      restaurant: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}