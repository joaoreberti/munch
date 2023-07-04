import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { calculateAvgRating } from "../helpers/calculate-avg-rating";
import { getRestaurant } from "../models/restaurant.server";
import Modal from "../shared/components/modal";
import RestaurantPage from "../shared/components/restaurant-detail";
import ErrorPage from "../shared/components/not-found";

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
    return (
      <ErrorPage
        errorCode={500}
        title="Internal Server Error"
        message={`An unexpected error occurred: ${error.message}`}
      ></ErrorPage>
    );
  }

  if (!isRouteErrorResponse(error)) {
    return (
      <ErrorPage
        errorCode={500}
        title="Internal Server Error"
        message="Unknown error"
      ></ErrorPage>
    );
  }

  if (error.status === 404) {
    return (
      <ErrorPage
        errorCode={404}
        title="Page not found"
        message="Restaurant not found"
      ></ErrorPage>
    );
  }

  return (
    <ErrorPage
      errorCode={500}
      title="Internal Server Error"
      message={`An unexpected error occurred: ${error.statusText}`}
    ></ErrorPage>
  );
}
