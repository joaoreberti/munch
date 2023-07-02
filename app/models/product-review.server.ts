import type { ProductReview } from "@prisma/client";
import { prisma } from "../db.server";

export async function createProductReview({
  productId,
  comment,
  userId,
  rating,
}: {
  productId: ProductReview["productId"];
  comment: ProductReview["comment"];
  userId: ProductReview["userId"];
  rating: ProductReview["rating"];
}) {
  return prisma.productReview.create({
    data: {
      productId,
      comment,
      userId,
      rating,
    },
  });
}
