import { TProduct } from "./product.types";

export type TOrderItem = {
  id: string;
  userId: number;
  totalPrice: number;
  items: TProduct[];
};
