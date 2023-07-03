import type { Restaurant } from "@prisma/client";

import { prisma } from "~/db.server";
import { removeNullValues } from "./utils";
export class RestaurantsFilter {
  cuisine?: string[];

  static asQuery(filter: RestaurantsFilter): any {
    return removeNullValues(filter);
  }
}

export function getRestaurant({ id }: Pick<Restaurant, "id">) {
  return prisma.restaurant.findFirst({
    include: {
      RestaurantReviews: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
      Cuisines: true,
      Products: {
        include: {
          ProductReviews: {
            include: { user: true },
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
    where: { id },
  });
}

export function getRestaurants(filter: RestaurantsFilter) {
  if (filter.cuisine?.length) {
    return prisma.restaurant.findMany({
      include: {
        RestaurantReviews: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
        Cuisines: true,
      },
      orderBy: { updatedAt: "desc" },
      where: { Cuisines: { some: { name: { in: filter.cuisine } } } },
    });
  }

  return prisma.restaurant.findMany({
    include: {
      RestaurantReviews: {
        include: { user: true },
        orderBy: { createdAt: "desc" },
      },
      Cuisines: true,
    },
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
