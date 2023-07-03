import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";
import { classNames } from "../../utils";

export default function ReviewFeed({
  reviews,
}: {
  reviews: {
    createdAt: string;
    restaurantId?: string;
    productId?: string;
    id: string;
    comment: string;
    rating: number;
    restaurant?: {
      name: string;
    },
    product?: {
      name: string;
    }
  }[];
}) {
  return (
    <div className="ml-1 flow-root">
      <ul className="-mb-8">
        {reviews.map((review, eventIdx) => (
          <li key={review.id} className="odd:bg-yellow-100">
            <div className="relative pb-8">
              {eventIdx !== reviews.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      Number(review.rating) > 4 ? "bg-green-500" : "bg-red-500",
                      "flex mt-5 h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
                    )}
                  >
                    {Number(review.rating) > 4 ? (
                      <HandThumbUpIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    ) : (
                      <HandThumbDownIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <Link
                      to={
                        review.restaurantId
                          ? `/restaurants/${review.restaurantId}`
                          : `/products/${review.productId}`
                      }
                      className="font-medium text-gray-900"
                    >
                      <p className="text-sm text-gray-500">{review.comment}</p>
                      <p>{review.rating}</p>
                      <p>{review.restaurant ? review.restaurant.name : review.product?.name}</p>
                    </Link>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={review.createdAt}>
                      {review.createdAt}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
