import { StarIcon } from "@heroicons/react/20/solid";
import { Form } from "@remix-run/react";
import { useState } from "react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateReview({
  id,
  type,
}: {
  id: string;
  type: "restaurant" | "product" | "";
}) {
  const [rating, setRating] = useState(0);

  return (
    <Form action="/review" method="post">
      <h1>{type === "product" ? "Product" : "Restaurant"} Review</h1>
      <input type="hidden" name="redirectTo" defaultValue={`/${type}s/${id}`} />
      <input name="id" id="id" hidden defaultValue={id} />
      <input name="type" id="type" hidden defaultValue={type} />
      <label
        htmlFor="comment"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add your comment
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
      <label
        htmlFor="rating"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add your rating
      </label>
      <div className="mt-4 flex items-center">
        <input type="number" defaultValue={rating} name="rating" hidden />
        {[0, 1, 2, 3, 4].map((star) => (
          <StarIcon
            key={star}
            className={classNames(
              rating > star ? "text-yellow-400" : "text-gray-300",
              "h-5 w-5 flex-shrink-0"
            )}
            onClick={() => setRating(star + 1)}
            aria-hidden="true"
          />
        ))}
        {rating} out of 5 stars
      </div>
      <div className="mt-2">rating goes here</div>
      <div className="mt-5 sm:mt-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back to dashboard
        </button>
      </div>
    </Form>
  );
}
