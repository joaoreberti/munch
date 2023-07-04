import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserId } from "../session.server";
import { createProductReview } from "../models/product-review.server";
import { safeRedirect } from "../utils";
import { createRestaurantReview } from "../models/restaurant-review.server";
import { ReviewType } from "../models/types/review-type.enum";

export const action = async ({ request }: ActionArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const formData = await request.formData();

  const rating = formData.get("rating")?.toString();

  const comment = formData.get("comment")?.toString();
  const type = formData.get("type")?.toString();
  const id = formData.get("id")?.toString();

  if (
    !rating ||
    typeof comment !== "string" ||
    !type ||
    !id ||
    ![ReviewType.product, ReviewType.restaurant].includes(type as ReviewType)
  )
    return redirect("/");

  const reviewAttributes = {
    rating: Number(rating),
    comment: comment,
    userId,
  };

  if (type === ReviewType.product) {
    await createProductReview({
      ...reviewAttributes,
      productId: id,
    });
  }
  if (type === ReviewType.restaurant) {
    await createRestaurantReview({
      ...reviewAttributes,
      restaurantId: id,
    });
  }
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  return redirect(redirectTo);
};

export const loader = async () => redirect("/");
