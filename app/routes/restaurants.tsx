import { Form, Outlet } from "@remix-run/react";

import NavBar from "../shared/compontents/nabvbar";

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

<Form action="/logout" method="post">
  <button
    type="submit"
    className="rounded bg-slate-600 px-4 py-2 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
  >
    Logout
  </button>
</Form>;
