import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ProductFilter, getProducts } from "../models/product.server";
import ProductList from "../shared/components/product-list";
import { calculateAvgRating } from "../helpers/calculate-avg-rating";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const restaurantId = url.searchParams.get("restaurantId");

  const productList = await getProducts(
    ProductFilter.asQuery({ restaurantId })
  );

  const productListItems = productList.map((product) => {
    const productAvgRating = calculateAvgRating(product.ProductReviews);
    return {
      ...product,
      productAvgRating,
    };
  });

  return json({ productListItems, restaurantId });
};
export default function RestaurantIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container m-2 flex-row">
      {data.restaurantId ? (
        <Link className="mt-3" to={`/restaurants/${data.restaurantId}`}>
          <button
            data-testid="back-to-restaurant"
            className="ml-3 rounded-full bg-yellow-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            Back to {data.productListItems[0].restaurant.name}
          </button>
        </Link>
      ) : (
        <></>
      )}
      <ProductList
        addReview={false}
        products={data.productListItems}
      ></ProductList>
    </div>
  );
}
