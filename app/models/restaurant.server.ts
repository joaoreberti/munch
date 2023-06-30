import type { Restaurant } from "@prisma/client";

import { prisma } from "~/db.server";

export function getRestaurant({ id }: Pick<Restaurant, "id">) {
  return prisma.restaurant.findFirst({
    select: { id: true, name: true },
  });
}

export function getRestaurants() {
  return prisma.restaurant.findMany({
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createRestaurant({
  name,
  email,
  address,
  phone_number,
}: Pick<Restaurant, "name" | "email" | "address" | "phone_number">) {
  return prisma.restaurant.create({
    data: {
      name,
      email,
      address,
      phone_number,
    },
  });
}

export function deleteRestaurant({ id }: Pick<Restaurant, "id">) {
  return prisma.restaurant.deleteMany({
    where: { id },
  });
}
