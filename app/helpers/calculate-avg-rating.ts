import type { ProductReview, RestaurantReview } from "@prisma/client";

export function calculateAvgRating(
  reviews: ProductReview[] | RestaurantReview[]
) {
  if (!reviews.length) {
    return "N/A";
  }
  return (
    reviews.reduce((total, { rating }) => {
      return total + rating;
    }, 0) / reviews.length
  ).toFixed(1);
}
