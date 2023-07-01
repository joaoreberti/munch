import { faker } from "@faker-js/faker";
import type { Product } from "@prisma/client";
import { randomUUID } from "crypto";
import { Factory } from "fishery";

export const productFactory = Factory.define<Product>(
  ({ transientParams }) => ({
    id: transientParams.id ?? randomUUID(),
    name: transientParams.name ?? faker.commerce.productName(),
    description:
      transientParams.description ?? faker.commerce.productDescription(),
    restaurantId: transientParams.restaurantId ?? randomUUID(),
    price: transientParams.price ?? Math.fround(Math.random() * 100),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);
