import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProducts } from "../models/product.server";
import ProductList from "../shared/components/product-list";

export const loader = async () => {
  const productList = await getProducts();

  const productListItems = productList.map((product) => {
    const productAvgRating = (
      product.ProductReviews.reduce((total, { rating }) => {
        return total + rating;
      }, 0) / product.ProductReviews.length
    ).toFixed(1);

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
