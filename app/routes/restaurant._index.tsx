import { Link } from "@remix-run/react";

export default function RestaurantIndexPage() {
  return (
    <p>
      No restaurant selected. Select a restaurant on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new restaurant.
      </Link>
    </p>
  );
}
