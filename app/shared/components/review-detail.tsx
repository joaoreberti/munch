import { StarIcon } from "@heroicons/react/20/solid";
import { classNames } from "../../utils";

export default function ReviewDetail({
  review,
}: {
  review: {
    id: string;
    comment: string;
    rating: number;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: { name: string };
  };
}) {
  // const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="bg-white ">
      <div key={review.id} className="py-12">
        <div className=" item-center sm:flex-row lg:flex   ">
          <img
            src={`https://ui-avatars.com/api/?name=${review.user.name}&background=random`}
            alt={`${review.user.name}.`}
            className="h-12 w-12 rounded-full sm:mx-auto sm:flex-shrink-0 lg:mx-3"
          />
          <div className="">
            <h4 className="text-sm font-bold text-gray-900">
              {review.user.name}
            </h4>
            <div className="mt-1 flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    review.rating > rating
                      ? "text-yellow-400"
                      : "text-gray-300",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="sr-only">{review.rating} out of 5 stars</p>
          </div>
        </div>

        <div
          className="mt-4 space-y-6 text-base italic text-gray-600"
          dangerouslySetInnerHTML={{ __html: review.comment }}
        />
      </div>
    </div>
  );
}
