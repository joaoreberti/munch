import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { RestaurantsFilter, getRestaurants } from "../models/restaurant.server";
import Filters from "../shared/components/filters";
import RestaurantList from "../shared/components/restaurant-list";
import { calculateAvgRating } from "../helpers/calculate-avg-rating";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const cuisines = url.searchParams.getAll("Cuisine");

  const restaurantList = await getRestaurants(
    RestaurantsFilter.asQuery({ cuisine: cuisines })
  );
  const restaurantListItems = restaurantList.map((restaurant) => {
    const restaurantAvgRating = calculateAvgRating(restaurant.RestaurantReviews);

    return {
      ...restaurant,
      restaurantAvgRating,
    };
  });

  return json({ restaurantListItems, cuisines });
};

export default function RestaurantIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container m-2 flex">
      <div className="sticky top-0">
        <Filters cuisines={data.cuisines}></Filters>
      </div>
      <div className="mx-auto">
        {data.restaurantListItems.length === 0 ? (
          <p className="p-4">No restaurants yet</p>
        ) : (
          <RestaurantList
            restaurants={data.restaurantListItems}
          ></RestaurantList>
        )}
      </div>
    </div>
  );
}
