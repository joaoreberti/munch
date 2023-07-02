import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { getRestaurants, RestaurantsFilter } from "../models/restaurant.server";

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
  //   const data = useLoaderData<typeof loader>();

  return (
    <div className="container m-2 flex">
      <div>Product page</div>
    </div>
  );
}
