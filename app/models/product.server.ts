import type { Product } from "@prisma/client";
import { prisma } from "~/db.server";
import { removeNullValues } from "./utils";

export class ProductFilter {
  restaurantId?: string | null;

  static asQuery(filter: ProductFilter): any {
    return removeNullValues(filter);
  }
}

export function getProduct({ id }: Pick<Product, "id">) {
  return prisma.product.findFirst({
    include: {
      ProductReviews: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
      restaurant: true,
    },
    where: { id },
  });
}

export function getProducts(filter: ProductFilter) {
  if (filter.restaurantId) {
    return prisma.product.findMany({
      include: {
        ProductReviews: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
        restaurant: true,
      },
      orderBy: { updatedAt: "desc" },
      where: { restaurantId: filter.restaurantId },
    });
  }

  return prisma.product.findMany({
    include: {
      ProductReviews: { include: { user: true } },
      restaurant: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}
