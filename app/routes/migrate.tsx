import { redirect } from "@remix-run/node";
import { resetDatabase } from "../models/index.server";

export const loader = async () => {
  await resetDatabase();
  return redirect("/");
};
