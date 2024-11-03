import { TProduct } from "@types";
import styles from "./styles.module.css";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "@store/hooks";
import actPlaceOrder from "@store/orders/act/actPlaceOrder";
import { cartCleanUpAfterPlaceOrder } from "@store/cart/cartSlice";

type CartSubtotalPriceProps = {
  products: TProduct[];
  userAccessToken: string | null;
};
export default function CartSubTotalPrice({
  products,
  userAccessToken,
}: CartSubtotalPriceProps) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const totalPrice = products.reduce((acc, crr) => {
    return acc + crr.price * (crr.quantity ?? 0);
  }, 0);

  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(totalPrice))
      .unwrap()
      .then(() => {
        dispatch(cartCleanUpAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal show={showModal} onHide={modalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order with Total Price:
          <span style={{ fontWeight: "bold", color: "#36AE7C" }}>
            {totalPrice.toFixed(2)} EGP
          </span>
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="success"
            style={{ color: "white" }}
            onClick={placeOrderHandler}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm"></Spinner> Loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <span>Subtotal:</span>
        <span>{totalPrice.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <div className={styles.container}>
          <span></span>
          <span>
            <Button
              variant="info"
              style={{ color: "white" }}
              onClick={modalHandler}
            >
              Place Order
            </Button>
          </span>
        </div>
      )}
    </>
  );
}
