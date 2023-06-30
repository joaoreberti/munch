import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteRestaurant, getRestaurant } from "../models/restaurant.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.restaurantId, "restaurantId not found");

  const restaurant = await getRestaurant({ id: params.restaurantId });
  if (!restaurant) {
    throw new Response("Not Found", { status: 404 });
  }

  const restaurantAvgRating = (
    restaurant.RestaurantReview.reduce((total, { rating }) => {
      return total + rating;
    }, 0) / restaurant.RestaurantReview.length
  ).toFixed(1);

  return json({ restaurant: { ...restaurant, restaurantAvgRating } });
};

export const action = async ({ params, request }: ActionArgs) => {
  invariant(params.restaurantId, "restaurantId not found");

  await deleteRestaurant({ id: params.restaurantId });

  return redirect("/restaurants");
};

export default function RestaurantDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.restaurant.name}</h3>
      <h3 className="text-2xl font-normal">
        {data.restaurant.restaurantAvgRating}
      </h3>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Restaurant not found</div>;
  }

  return <div>An unexpected error occurred: {error.statusText}</div>;
}
