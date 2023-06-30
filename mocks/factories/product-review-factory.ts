import type { ProductReview } from "@prisma/client";
import { randomUUID } from "crypto";
import { Factory } from "fishery";

export const productReviewFactory = Factory.define<ProductReview>(
  ({ transientParams }) => ({
    id: transientParams.id ?? randomUUID(),
    rating: transientParams.rating ?? Math.ceil(Math.random() * 5),
    userId: transientParams.userId ?? randomUUID(),
    productId: transientParams.restaurantId ?? randomUUID(),
    comment: transientParams.comment ?? "lorem ipsum",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);
