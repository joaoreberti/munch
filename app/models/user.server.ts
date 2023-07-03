import type { User } from "@prisma/client";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], name: User["name"]) {
  return prisma.user.create({
    data: {
      email,
      name,
    },
  });
}

export async function getUserReviews(id: User["id"]) {
  return prisma.user.findFirst({
    include: {
      ProductReview: {
        include: { product: { include: { restaurant: true } } },
      },
      RestaurantReview: { include: { restaurant: true } },
    },
    where: {
      id,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}
