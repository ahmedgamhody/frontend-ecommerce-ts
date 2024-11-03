import { Form, Button } from "react-bootstrap";
import styles from "./styles.module.css";
import { memo } from "react";
import { TProduct } from "@types";
import ProductInfo from "../ProductInfo/ProductInfo";
const { cartItem, cartItemSelection } = styles;
type CartItemProps = TProduct & {
  changeQuantityHandelar: (id: number, quantity: number) => void;
} & {
  removeItemHandelar: (id: number) => void;
};
const CartItem = memo(
  ({
    id,
    title,
    price,
    img,
    quantity,
    max,
    changeQuantityHandelar,
    removeItemHandelar,
  }: CartItemProps) => {
    const renderOptions = Array(max)
      .fill(0)
      .map((_, index) => (
        <option key={index} value={index + 1}>
          {index + 1}
        </option>
      ));

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandelar(id, quantity);
    };

    const removeItem = () => {
      removeItemHandelar(id);
    };
    return (
      <div className={cartItem}>
        <ProductInfo title={title} price={price} img={img} direction="column">
          <Button
            variant="danger"
            style={{ color: "white", width: "110px" }}
            className="mt-auto"
            onClick={removeItem}
          >
            Remove
          </Button>
        </ProductInfo>
        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select
            aria-label="Default select example"
            value={quantity}
            onChange={changeQuantity}
          >
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
