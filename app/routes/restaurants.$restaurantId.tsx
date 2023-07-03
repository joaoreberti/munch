import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteRestaurant, getRestaurant } from "../models/restaurant.server";
import RestaurantPage from "../shared/components/restaurant-detail";
import Modal from "../shared/components/modal";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.restaurantId, "restaurantId not found");

  const restaurant = await getRestaurant({ id: params.restaurantId });
  if (!restaurant) {
    throw new Response("Not Found", { status: 404 });
  }

  let restaurantAvgRating = (
    restaurant.RestaurantReviews.reduce((total, { rating }) => {
      return total + rating;
    }, 0) / restaurant.RestaurantReviews.length
  ).toFixed(1);
  if (restaurantAvgRating === "NaN") {
    restaurantAvgRating = "N/A";
  }

  const productsListItems = restaurant.Products.map((product) => {
    let productAvgRating = (
      product.ProductReviews.reduce((total, { rating }) => {
        return total + rating;
      }, 0) / product.ProductReviews.length
    ).toFixed(1);
    if (productAvgRating === "NaN") {
      productAvgRating = "N/A";
    }
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
