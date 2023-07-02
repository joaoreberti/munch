import { Outlet } from "@remix-run/react";

import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import NavBar from "../shared/compontents/nabvbar";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const cuisines = formData.getAll("Cuisine");

  const url = new URL(request.url);
  for (const cuisine of cuisines) {
    url.searchParams.append("Cuisine", cuisine.toString());
  }

  return redirect(url.pathname + url.search);
};

export default function RestaurantsPage() {
  // const user = useUser();
  return (
    <div className="flex h-full min-h-screen flex-col">
      <NavBar></NavBar>
      <main className="flex h-full justify-center bg-white">
        <Outlet />
      </main>
    </div>
  );
}
