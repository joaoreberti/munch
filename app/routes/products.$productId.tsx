import { json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getProduct } from "../models/product.server";
import { useLoaderData } from "@remix-run/react";
import ProductPage from "../shared/components/product-detail";
import Modal from "../shared/components/modal";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.productId, "productId not found");

  const product = await getProduct({ id: params.productId });
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  const productAvgRating = (
    product.ProductReviews.reduce((total, { rating }) => {
      return total + rating;
    }, 0) / product.ProductReviews.length
  ).toFixed(1);

  const enrichedProduct = {
    ...product,
    productAvgRating,
  };

  return json({ enrichedProduct });
};

export default function RestaurantIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container m-2 flex">
      <ProductPage product={data.enrichedProduct}></ProductPage>
      <Modal></Modal>
    </div>
  );
}
