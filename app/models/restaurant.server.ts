import type { Prisma, Restaurant, RestaurantReview } from "@prisma/client";

import { prisma } from "~/db.server";

export function getRestaurant({ id }: Pick<Restaurant, "id">) {
  return prisma.restaurant.findFirst({
    include: {
      RestaurantReviews: true,
      Cuisines: true,
      Products: { include: { ProductReviews: true } },
    },
    where: { id },
  });
}

export function getRestaurants(): Prisma.PrismaPromise<
  (Restaurant & {
    RestaurantReviews: RestaurantReview[];
  })[]
> {
  return prisma.restaurant.findMany({
    include: { RestaurantReviews: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createRestaurant({
  name,
  email,
  address,
  phoneNumber,
}: Pick<Restaurant, "name" | "email" | "address" | "phoneNumber">) {
  return prisma.restaurant.create({
    data: {
      name,
      email,
      address,
      phoneNumber,
    },
  });
}

export function deleteRestaurant({ id }: Pick<Restaurant, "id">) {
  return prisma.restaurant.deleteMany({
    where: { id },
  });
}
