import type { Restaurant, RestaurantReview, User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { userFactory } from "../mocks/factories/user-factory";
import { restaurantFactory } from "../mocks/factories/restaurant-factory";
import { restaurantReviewFactory } from "../mocks/factories/restaurant-review-factory";

const prisma = new PrismaClient();

async function seed() {
  for (const tableName of ["User", "Restaurant", "RestaurantReview"])
    await prisma.$queryRawUnsafe(`DELETE FROM "${tableName}";`);

  const usersToInsert = createUsers();
  const restaurantsToInsert = createRestaurants();

  const restaurantReviews = createRestaurantReviews(
    usersToInsert,
    restaurantsToInsert
  );

  console.log(usersToInsert[0], restaurantsToInsert[0], restaurantReviews[0]);

  //upsert users
  await Promise.all(
    usersToInsert.map((user) => {
      return prisma.user.create({ data: user });
    })
  );

  //upsert restaurants
  await Promise.all(
    restaurantsToInsert.map((restaurant) => {
      return prisma.restaurant.create({ data: restaurant });
    })
  );

  //upsert restaurant reviews
  await Promise.all(
    restaurantReviews.map((restaurantReview) => {
      return prisma.restaurantReview.create({ data: restaurantReview });
    })
  );

  console.log(`Database has been seeded. 🌱`);
}

function createUsers() {
  let users: User[] = [];

  for (let i = 0; i < 500; i++) {
    users.push(userFactory.build({ email: `user-${i}-test-account@mail.com` }));
  }

  return users;
}

function createRestaurants() {
  let restaurants: Restaurant[] = [];
  for (let i = 0; i < 100; i++) {
    restaurants.push(
      restaurantFactory.build({
        email: `restaurant-${i}-email@mail.com`,
        name: `restaurant-${i}-name`,
        phoneNumber: `+49${randomNumbers(8)}`,
      })
    );
  }
  return restaurants;
}

function createRestaurantReviews(users: User[], restaurants: Restaurant[]) {
  let restaurantReviews: RestaurantReview[] = [];

  for (let i = 0; i < 2000; i++) {
    restaurantReviews.push(
      restaurantReviewFactory.build({
        restaurantId: getRandomElementFromArray(restaurants).id,
        userId: getRandomElementFromArray(users).id,
      })
    );
  }
  return restaurantReviews;
}

function randomNumbers(length: number) {
  let str = [];
  for (let i = 0; i < length; i++) {
    str.push(Math.floor(Math.random() * 9));
  }
  return str.join("");
}

function getRandomElementFromArray<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
