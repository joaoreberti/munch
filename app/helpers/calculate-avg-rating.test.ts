import { productReviewFactory } from "../../mocks/factories/product-review-factory";
import { restaurantReviewFactory } from "../../mocks/factories/restaurant-review-factory";
import { calculateAvgRating } from "./calculate-avg-rating";

describe("calculate average rating", () => {
  it("should be defined", () => {
    expect(calculateAvgRating).toBeDefined();
  });

  describe("when passed a product review array ", () => {
    it("should return the average rating", () => {
      const productReviews = [];
      productReviews.push(productReviewFactory.build({ rating: 1 }));
      productReviews.push(productReviewFactory.build({ rating: 4 }));
      productReviews.push(productReviewFactory.build({ rating: 5 }));

      const avgRating = calculateAvgRating(productReviews);
      expect(avgRating).toBe("3.3");
    });
  });

  describe("when passed a restaurant review array ", () => {
    it("should return the average rating", () => {
      const restaurantReviews = [];
      restaurantReviews.push(restaurantReviewFactory.build({ rating: 2 }));
      restaurantReviews.push(restaurantReviewFactory.build({ rating: 5 }));
      restaurantReviews.push(restaurantReviewFactory.build({ rating: 5 }));

      const avgRating = calculateAvgRating(restaurantReviews);
      expect(avgRating).toBe("4.0");
    });
  });
});
