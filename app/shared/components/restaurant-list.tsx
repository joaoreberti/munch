import { Link } from "@remix-run/react";
import RestaurantCard from "./restaurant-card";

export default function RestaurantList({
  restaurants,
}: {
  restaurants: {
    restaurantAvgRating: string;
    id: string;
    name: string;
    address: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    RestaurantReviews: {
      id: string;
      comment: string;
      rating: number;
      userId: string;
      restaurantId: string;
      createdAt: string;
      updatedAt: string;
      user: { name: string };
    }[];
    Cuisines: {
      name: string;
    }[];
  }[];
}) {
  return (
    <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {restaurants.map((restaurant, index) => (
        <Link
          data-testid={`restaurant-link-${index}`}
          key={restaurant.id}
          to={restaurant.id}
        >
          <RestaurantCard
            addReview={false}
            restaurant={restaurant}
          ></RestaurantCard>
        </Link>
      ))}
    </ul>
  );
}
