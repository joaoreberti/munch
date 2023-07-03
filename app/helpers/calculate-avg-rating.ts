type RatingEntity = {
  rating: number;
};

export function calculateAvgRating<T extends RatingEntity>(reviews: T[]) {
  if (!reviews.length) {
    return "N/A";
  }
  return (
    reviews.reduce((total, { rating }) => {
      return total + rating;
    }, 0) / reviews.length
  ).toFixed(1);
}
