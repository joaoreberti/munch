import { json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getProduct } from "../models/product.server";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import ProductPage from "../shared/components/product-detail";
import Modal from "../shared/components/modal";
import { calculateAvgRating } from "../helpers/calculate-avg-rating";
import ErrorPage from "../shared/components/not-found";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.productId, "productId not found");

  const product = await getProduct({ id: params.productId });
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  const productAvgRating = calculateAvgRating(product.ProductReviews);

  const enrichedProduct = {
    ...product,
    productAvgRating,
  };

  return json({ enrichedProduct });
};

export default function ProductIndexPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container m-2 flex">
      <ProductPage product={data.enrichedProduct}></ProductPage>
      <Modal></Modal>
    </div>
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
        message="Product not found"
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
