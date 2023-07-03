import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { calculateAvgRating } from "../helpers/calculate-avg-rating";
import { deleteRestaurant, getRestaurant } from "../models/restaurant.server";
import Modal from "../shared/components/modal";
import RestaurantPage from "../shared/components/restaurant-detail";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.restaurantId, "restaurantId not found");

  const restaurant = await getRestaurant({ id: params.restaurantId });
  if (!restaurant) {
    throw new Response("Not Found", { status: 404 });
  }

  const restaurantAvgRating = calculateAvgRating(restaurant.RestaurantReviews);

  const productsListItems = restaurant.Products.map((product) => {
    const productAvgRating = calculateAvgRating(product.ProductReviews);

    return {
      ...product,
      productAvgRating,
    };
  });

  const enrichedRestaurant = {
    ...{ ...restaurant, Products: productsListItems },
    restaurantAvgRating,
  };

  return json({
    enrichedRestaurant,
  });
};

export const action = async ({ params, request }: ActionArgs) => {
  invariant(params.restaurantId, "restaurantId not found");

  await deleteRestaurant({ id: params.restaurantId });

  return redirect("/restaurants");
};

export default function RestaurantDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <main>
      <div className="flex">
        <RestaurantPage restaurant={data.enrichedRestaurant}></RestaurantPage>
        <Modal></Modal>
      </div>
    </main>
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
