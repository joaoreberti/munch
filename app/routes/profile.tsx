import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import NavBar from "../shared/components/nabvbar";
import { getUserId } from "../session.server";
import { getUserReviews } from "../models/user.server";
import ReviewFeed from "../shared/components/review-feed";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request);

  if (!userId) return redirect("/login");
  const userWithReviews = await getUserReviews(userId);
  if (!userWithReviews) return redirect("/login");

  const mergedReviews = [
    ...userWithReviews.ProductReview,
    ...userWithReviews.RestaurantReview,
  ];

  mergedReviews.sort((a, b) => {
    return a.createdAt > b.createdAt ? -1 : 1;
  });

  return json({
    user: {
      name: userWithReviews.name,
      email: userWithReviews.email,
    },
    reviews: mergedReviews,
  });
};
export default function ProfilePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <NavBar></NavBar>
      <main className="flex h-full justify-center bg-white">
        <div className="container mt-5">
          <h1 className="text-2xl font-bold ml-1 ">My reviews timeline</h1>
          <ReviewFeed reviews={data.reviews}></ReviewFeed>
        </div>
      </main>
    </div>
  );
}
