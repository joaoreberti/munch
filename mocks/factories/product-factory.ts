import type { Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { Factory } from "fishery";

export const productFactory = Factory.define<Product>(
  ({ transientParams }) => ({
    id: transientParams.id ?? randomUUID(),
    name: transientParams.name ?? "product-name",
    description: transientParams.description ?? "product-description",
    restaurantId: transientParams.restaurantId ?? randomUUID(),
    price: transientParams.price ?? Math.fround(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);
