import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { RestaurantsFilter, getRestaurants } from "../models/restaurant.server";
import Filters from "../shared/compontents/filters";
import RestaurantList from "../shared/compontents/restaurant-list";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const cuisines = url.searchParams.getAll("Cuisine");

  const restaurantList = await getRestaurants(
    RestaurantsFilter.asQuery({ cuisine: cuisines })
  );
  const restaurantListItems = restaurantList.map((restaurant) => {
    const restaurantAvgRating = (
      restaurant.RestaurantReviews.reduce((total, { rating }) => {
        return total + rating;
      }, 0) / restaurant.RestaurantReviews.length
    ).toFixed(1);

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
    <div className="m-2 flex">
      <div className="flex-1">
        <Filters cuisines={data.cuisines}></Filters>
      </div>
      {data.restaurantListItems.length === 0 ? (
        <p className="p-4">No restaurants yet</p>
      ) : (
        <RestaurantList restaurants={data.restaurantListItems}></RestaurantList>
      )}
    </div>
  );
}
