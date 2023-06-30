// factories/user.ts
import type { User } from "@prisma/client";
import { randomUUID } from "crypto";
import { Factory } from "fishery";

export const userFactory = Factory.define<User>(({ transientParams }) => ({
  id: transientParams.id ?? randomUUID(),
  email: transientParams.email ?? "lorem-ipsum@hotmail.com",
  createdAt: new Date(),
  updatedAt: new Date(),
}));