import { NavLink } from "@remix-run/react";
import RatingsWidget from "./ratings-widgent";
import Review from "./review";

export default function RestaurantList({
  restaurants,
}: {
  restaurants: {
    restaurantAvgRating: string;
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    RestaurantReviews: {
      id: string;
      comment: string;
      rating: number;
      userId: string;
      restaurantId: string;
      createdAt: string;
      updatedAt: string;
      user: { name: string };
    }[];
    Cuisines: {
      name: string;
    }[];
  }[];
}) {
  return (
    <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {restaurants.map((restaurant, index) => (
        <NavLink
          data-testid={`restaurant-link-${index}`}
          key={restaurant.id}
          to={restaurant.id}
        >
          <li
            key={restaurant.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={`https://ui-avatars.com/api/?name=${restaurant.name}&background=random`}
                alt=""
              />
              <h3 className="mt-6 text-sm font-medium text-gray-900">
                {restaurant.name}
              </h3>
              <h4>{restaurant.Cuisines[0].name}</h4>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Rating</dt>
                <dd className="text-md text-gray-500">
                  <RatingsWidget
                    restaurantAvgRating={Number(restaurant.restaurantAvgRating)}
                  ></RatingsWidget>
                </dd>
                <dt className="sr-only">Number of reviews</dt>
                <dd className="mt-3 text-sm text-gray-500">
                  Number of reviews:{" "}
                  {restaurant.RestaurantReviews.length > 0
                    ? restaurant.RestaurantReviews.length
                    : "N/A"}
                </dd>

                <dt className="sr-only">Address</dt>
                <dd className="mt-3">{restaurant.address}</dd>
              </dl>
              {restaurant.RestaurantReviews.length > 0 && (
                <>
                  <hr />
                  <Review
                    restaurantReview={
                      restaurant.RestaurantReviews[
                        restaurant.RestaurantReviews.length - 1
                      ]
                    }
                  />
                </>
              )}
            </div>
          </li>
        </NavLink>
      ))}
    </ul>
  );
}
