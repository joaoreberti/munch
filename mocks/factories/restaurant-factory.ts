// factories/user.ts
import type { Restaurant } from "@prisma/client";
import { randomUUID } from "crypto";
import { Factory } from "fishery";

export const restaurantFactory = Factory.define<Restaurant>(
  ({ transientParams }) => ({
    id: transientParams.id ?? randomUUID(),
    name: transientParams.name ?? "restaurant-name",
    address: transientParams.address ?? "restaurant-address",
    email: transientParams.email ?? "restaurant@hotmail.com",
    phoneNumber: transientParams.phoneNumber ?? "+490123456789",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);
