import RatingsWidget from "./ratings-widget";
import ReviewDetail from "./review-detail";

export default function ProductCard({
  product,
}: {
  product: {
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
  };
}) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        <img
          src={"https://placehold.co/300x200"}
          alt={product.description}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
          {/* <a href={product.href}>
        <span aria-hidden="true" className="absolute inset-0" />
        {product.name}
      </a> */}
        </h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <div className="flex justify-around">
          <div className="flex-1 text-base font-medium text-gray-900">
            €{product.price.toFixed(2)}
          </div>
          <div className=" flex-1 text-base font-medium text-gray-900">
            <RatingsWidget
              avgRating={Number(product.productAvgRating)}
            ></RatingsWidget>
          </div>
        </div>
      </div>
      {product.ProductReviews.length > 0 && (
        <div className="ml-3">
          <hr className="mr-3" />
          <ReviewDetail
            review={product.ProductReviews[0]}
          />
        </div>
      )}
    </div>
  );
}
