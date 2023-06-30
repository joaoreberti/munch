import type {
  Cuisine,
  Product,
  ProductReview,
  Restaurant,
  RestaurantReview,
  User,
} from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { userFactory } from "../mocks/factories/user-factory";
import { restaurantFactory } from "../mocks/factories/restaurant-factory";
import { restaurantReviewFactory } from "../mocks/factories/restaurant-review-factory";
import { getRandomElementFromArray } from "../mocks/utils";
import { cuisineFactory } from "../mocks/factories/cuisine-factory";
import { productFactory } from "../mocks/factories/product-factory";
import { productReviewFactory } from "../mocks/factories/product-review-factory";

const prisma = new PrismaClient();

async function seed() {
  for (const tableName of ["User", "Restaurant", "RestaurantReview", "Cuisine"])
    await prisma.$queryRawUnsafe(`DELETE FROM "${tableName}";`);

  const usersToInsert = createUsers();
  const restaurantsToInsert = createRestaurants();
  const restaurantReviews = createRestaurantReviews(
    usersToInsert,
    restaurantsToInsert
  );
  const cuisinesToInsert = createCuisines(restaurantsToInsert);
  const productsToInsert = createProducts(restaurantsToInsert);
  const productReviewsToInsert = createProductReviews(
    usersToInsert,
    productsToInsert
  );

  console.log(
    usersToInsert[0],
    restaurantsToInsert[0],
    restaurantReviews[0],
    cuisinesToInsert[0],
    productsToInsert[0],
    productReviewsToInsert[0]
  );

  //insert users
  await Promise.all(
    usersToInsert.map((user) => {
      return prisma.user.create({ data: user });
    })
  );

  //insert restaurants
  await Promise.all(
    restaurantsToInsert.map((restaurant) => {
      return prisma.restaurant.create({ data: restaurant });
    })
  );

  //insert restaurant reviews
  await Promise.all(
    restaurantReviews.map((restaurantReview) => {
      return prisma.restaurantReview.create({ data: restaurantReview });
    })
  );

  //insert cuisines
  await Promise.all(
    cuisinesToInsert.map((cuisine) => {
      return prisma.cuisine.create({ data: cuisine });
    })
  );

  //insert products
  await Promise.all(
    productsToInsert.map((product) => {
      return prisma.product.create({ data: product });
    })
  );

  //insert products
  await Promise.all(
    productReviewsToInsert.map((productReview) => {
      return prisma.productReview.create({ data: productReview });
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

function createCuisines(restaurants: Restaurant[]) {
  let cuisines: Cuisine[] = [];

  for (let i = 0; i < 100; i++) {
    cuisines.push(
      cuisineFactory.build({
        restaurantId: restaurants[i].id,
      })
    );
  }
  return cuisines;
}

function createProducts(restaurants: Restaurant[]) {
  let products: Product[] = [];

  for (let i = 0; i < 1000; i++) {
    console.log(
      i,
      "id: " + Math.floor((i + 1) / 10),
      "length: " + restaurants.length
    );
    products.push(
      productFactory.build({
        restaurantId: restaurants[Math.floor(i === 0 ? 0 : i / 10)].id,
        name: `product-${i}-name`,
      })
    );
  }
  return products;
}

function createProductReviews(users: User[], products: Product[]) {
  let productReviews: ProductReview[] = [];

  for (let i = 0; i < 2000; i++) {
    productReviews.push(
      productReviewFactory.build({
        productId: getRandomElementFromArray(products).id,
        userId: getRandomElementFromArray(users).id,
      })
    );
  }

  return productReviews;
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
