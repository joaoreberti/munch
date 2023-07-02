import type { RestaurantReview } from "@prisma/client";
import { prisma } from "../db.server";

export async function createRestaurantReview({
  restaurantId,
  comment,
  userId,
  rating,
}: {
  restaurantId: RestaurantReview["restaurantId"];
  comment: RestaurantReview["comment"];
  userId: RestaurantReview["userId"];
  rating: RestaurantReview["rating"];
}) {
  return prisma.restaurantReview.create({
    data: {
      restaurantId,
      comment,
      userId,
      rating,
    },
  });
}
