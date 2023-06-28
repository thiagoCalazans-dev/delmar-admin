
import { baseURL } from "@/utils/helpers/baseURL";
import { Color } from "../model/color";

async function get(): Promise<Color[]> {
  const response = await fetch(`${baseURL}/product/color`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("failed fetch");
  }
  return response.json();
}

export const colorActions = {
  get,
};
