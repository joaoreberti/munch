import type { Cuisine } from "@prisma/client";
import { randomUUID } from "crypto";
import { Factory } from "fishery";
import { Cuisines } from "../../app/models/types/cuisine.enum";

function pickRandomCuisine() {
  const number = Math.floor(Math.random() * 4);

  switch (number) {
    case 0:
      return Cuisines.Brazilian;
    case 1:
      return Cuisines.Portuguese;
    case 2:
      return Cuisines.FastFood;
    case 3:
      return Cuisines.Indian;
    case 4:
      return Cuisines.Portuguese;
    case 5:
      return Cuisines.Vegan;
    case 6:
      return Cuisines.Vietnamese;
  }
}

export const cuisineFactory = Factory.define<Cuisine>(
  ({ transientParams }) => ({
    id: transientParams.id ?? randomUUID(),
    name: transientParams.name ?? pickRandomCuisine(),
    restaurantId: transientParams.restaurantId ?? randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  })
);
