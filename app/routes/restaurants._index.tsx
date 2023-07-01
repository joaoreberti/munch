import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getRestaurants } from "../models/restaurant.server";
import RestaurantList from "../shared/compontents/restaurant-list";

export const loader = async () => {
  const restaurantList = await getRestaurants();
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

  return json({ restaurantListItems });
};

export default function RestaurantIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      {data.restaurantListItems.length === 0 ? (
        <p className="p-4">No notes yet</p>
      ) : (
        <ol>
          <RestaurantList
            restaurants={data.restaurantListItems}
          ></RestaurantList>
        </ol>
      )}
    </>
  );
}
