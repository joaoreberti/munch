import { StarIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Review({
  restaurantReview,
}: {
  restaurantReview: {
    id: string;
    comment: string;
    rating: number;
    userId: string;
    restaurantId: string;
    createdAt: string;
    updatedAt: string;
    user: { name: string };
  };
}) {
  return (
    <div className="bg-white">
      <div key={restaurantReview.id} className="py-12">
        <div className="flex items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${restaurantReview.user.name}&background=random`}
            alt={`${restaurantReview.user.name}.`}
            className="h-12 w-12 rounded-full"
          />
          <div className="ml-4">
            <h4 className="text-sm font-bold text-gray-900">
              {restaurantReview.user.name}
            </h4>
            <div className="mt-1 flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    restaurantReview.rating > rating
                      ? "text-yellow-400"
                      : "text-gray-300",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="sr-only">{restaurantReview.rating} out of 5 stars</p>
          </div>
        </div>

        <div
          className="mt-4 space-y-6 text-base italic text-gray-600"
          dangerouslySetInnerHTML={{ __html: restaurantReview.comment }}
        />
      </div>
    </div>
  );
}
