import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserId } from "../session.server";
import { createProductReview } from "../models/product-review.server";
import { safeRedirect } from "../utils";
import { createRestaurantReview } from "../models/restaurant-review.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const formData = await request.formData();

  const rating = formData.get("rating");
  const comment = formData.get("comment");
  const type = formData.get("type");
  const id = formData.get("id");

  if (
    !rating ||
    !comment ||
    !type ||
    !id ||
    (type !== "product" && type !== "restaurant")
  )
    return redirect("/");

  if (type === "product") {
    await createProductReview({
      productId: id.toString(),
      rating: Number(rating),
      comment: comment.toString(),
      userId,
    });
  }
  if (type === "restaurant") {
    await createRestaurantReview({
      restaurantId: id.toString(),
      rating: Number(rating),
      comment: comment.toString(),
      userId,
    });
  }
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  return redirect(redirectTo);
};

export const loader = async () => redirect("/");
