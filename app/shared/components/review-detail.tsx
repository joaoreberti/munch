import { PlusCircleIcon, StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

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
        <hr className="mr-3 mt-5" />
        <button
          type="button"
          className="sm:align-center items-center gap-x-2 rounded-md bg-yellow-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 sm:flex-row lg:inline-flex"
          onClick={() => {
            console.log("clicked");
          }}
        >
          <div>Leave your own review</div>
          <div className="sm:hidden lg:flex">
            <PlusCircleIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </button>
      </div>
    </div>
  );
}
