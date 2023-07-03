import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

  return json({ productListItems });
};
export default function RestaurantIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container m-2 flex">
      <ProductList
        addReview={false}
        products={data.productListItems}
      ></ProductList>
    </div>
  );
}
