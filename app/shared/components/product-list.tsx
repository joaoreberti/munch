import { Link } from "@remix-run/react";
import ProductCard from "./product-card";

export default function ProductList({
  products,
  addReview,
}: {
  products: {
    productAvgRating: string;
    id: string;
    name: string;
    description: string;
    price: number;
    restaurantId: string;
    createdAt: string;
    updatedAt: string;
    ProductReviews: {
      id: string;
      comment: string;
      rating: number;
      userId: string;
      productId: string;
      createdAt: string;
      updatedAt: string;
      user: {
        id: string;
        email: string;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
    }[];
  }[];
  addReview: boolean;
}) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          {products.map((product, i) => (
            <Link
              data-testid={`product-link-${i}`}
              key={product.id}
              to={`${product.id}`}
            >
              <ProductCard product={product}></ProductCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
