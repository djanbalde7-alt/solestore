"use server";

import { getProductsByIds } from "../../lib/queries";

export async function fetchCartProducts(ids: number[]) {
  return getProductsByIds(ids);
}