import { Outlet } from "@remix-run/react";
import { useState } from "react";
import NavBar from "../shared/components/nabvbar";


export default function ProductsPage() {
  // const user = useUser();a
  const [modal, setModal] = useState({
    open: false,
    id: "",
    type: "",
  });

  return (
    <div className="flex h-full min-h-screen flex-col">
      <NavBar></NavBar>
      <main className="flex h-full justify-center bg-white">
        <Outlet context={{ modal, setModal }} />
      </main>
    </div>
  );
}

