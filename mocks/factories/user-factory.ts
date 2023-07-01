import { faker } from "@faker-js/faker";
import type { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { Factory } from "fishery";

export const userFactory = Factory.define<User>(({ transientParams }) => ({
  id: transientParams.id ?? randomUUID(),
  email: transientParams.email ?? faker.internet.email(),
  name: transientParams.name ?? faker.person.firstName(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));
