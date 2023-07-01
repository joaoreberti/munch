import type { Restaurant } from "@prisma/client";
import { randomUUID } from "crypto";
import { Factory } from "fishery";
import { randomNumbers } from "../utils";
import { faker } from "@faker-js/faker";

export const restaurantFactory = Factory.define<Restaurant>(
  ({ transientParams }) => ({
    id: transientParams.id ?? randomUUID(),
    name: transientParams.name ?? faker.company.name(),
    address: transientParams.address ?? faker.location.streetAddress(),
    email: transientParams.email ?? faker.internet.email(),
    phoneNumber: transientParams.phoneNumber ?? `+49${randomNumbers(8)}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);
