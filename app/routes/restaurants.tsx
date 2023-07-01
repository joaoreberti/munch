import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getRestaurants } from "~/models/restaurant.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
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

export default function RestaurantsPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Restaurants</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button
            type="submit"
            className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
          >
            Logout
          </button>
        </Form>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Restaurant
          </Link>

          <hr />

          {data.restaurantListItems.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol>
              {data.restaurantListItems.map((restaurant, index) => (
                <li key={restaurant.id}>
                  <NavLink
                    data-testid={`restaurant-link-${index}`}
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={restaurant.id}
                  >
                    📝 {restaurant.name}
                    rating: {restaurant.restaurantAvgRating}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
