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
      <div>
        <h3 className="text-2xl font-bold">{data.enrichedRestaurant.name}</h3>
        <h3 className="text-2xl font-normal">
          {data.enrichedRestaurant.restaurantAvgRating}
        </h3>
        {data.enrichedRestaurant.Cuisines.length > 0 ? (
          <div>
            {data.enrichedRestaurant.Cuisines.map((cuisine) => {
              return <span key={cuisine.id}>{cuisine.name}</span>;
            })}
          </div>
        ) : (
          <></>
        )}
        <hr className="my-4" />
        <ul>
          {data.enrichedRestaurant.Products.map((product) => {
            return (
              <li key={product.id}>
                <div>{product.name}</div>
                <div>{product.description}</div>
                <div>{product.productAvgRating}</div>
                <div>
                  <picture>
                    <source
                      srcSet="https://placehold.co/300x200"
                      media="(orientation: landscape)"
                    />
                    <img src="https://placehold.co/600x400" alt="" />
                  </picture>
                </div>
                <div>€{product.price}</div>
              </li>
            );
          })}
        </ul>
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
