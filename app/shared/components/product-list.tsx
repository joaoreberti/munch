import { Link } from "@remix-run/react";
import RatingsWidget from "./ratings-widgent";
import ReviewDetail from "./review-detail";

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
          {products.map((product) => (
            <Link key={product.id} to={`${product.id}`}>
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
                      addReview={addReview}
                      review={
                        product.ProductReviews[
                          product.ProductReviews.length - 1
                        ]
                      }
                    />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

//   <li key={product.id}>
//   <div>{product.name}</div>
//   <div>{product.description}</div>
//   <div>{product.productAvgRating}</div>
//   <div>
//     <picture>
//       <source
//         srcSet="https://placehold.co/300x200"
//         media="(orientation: landscape)"
//       />
//       <img src="https://placehold.co/600x400" alt="" />
//     </picture>
//   </div>
//   <div>€{product.price}</div>
// </li>
