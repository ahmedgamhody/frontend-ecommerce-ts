import { TProduct } from "@types";
import CartItem from "../CartItem/CartItem";

type CartItemListProps = {
  products: TProduct[];
  changeQuantityHandelar: (id: number, quantity: number) => void;
  removeItemHandelar: (id: number) => void;
};
export default function CartItemList({
  products,
  changeQuantityHandelar,
  removeItemHandelar,
}: CartItemListProps) {
  const renderList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changeQuantityHandelar={changeQuantityHandelar}
      removeItemHandelar={removeItemHandelar}
    />
  ));
  return <div>{renderList}</div>;
}
