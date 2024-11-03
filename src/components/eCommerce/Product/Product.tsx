import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState, memo } from "react";
//heart icons
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { TProduct } from "@types";
import ProductInfo from "../ProductInfo/ProductInfo";
const { maximumNotice, wishlistBtn } = styles;

const Product = ({
  id,
  title,
  price,
  img,
  max,
  quantity,
  isLiked,
  isAuthenticated,
}: TProduct) => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;
  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }
    setIsBtnDisabled(true);
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };
  const likeToggleHandelar = () => {
    if (isAuthenticated) {
      setIsLoading(true);
      if (isLoading) {
        return;
      }
      dispatch(actLikeToggle(id))
        .unwrap() // unwrap  دى عشان استنى رد ال الاكشن والبيانات
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false))
        .finally(() => setIsLoading(false));
    } else {
      setShowModal(true);
    }
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to login first to add this item to your wishlist.
        </Modal.Body>
      </Modal>
      <ProductInfo title={title} price={price} img={img} direction="row">
        <div className={wishlistBtn} onClick={likeToggleHandelar}>
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : isLiked ? (
            <FaHeart size={"24px"} color="red" />
          ) : (
            <FaRegHeart size={"24px"} color="red" />
          )}
        </div>
        <p className={maximumNotice}>
          {quantityReachedToMax
            ? "You reach to the limit"
            : `You can add ${currentRemainingQuantity} item (s)`}
        </p>
        <Button
          variant={quantityReachedToMax ? "warning" : "info"}
          style={{ color: quantityReachedToMax ? "black" : "white" }}
          onClick={addToCartHandler}
          disabled={isBtnDisabled || quantityReachedToMax}
        >
          {isBtnDisabled ? (
            <>
              <Spinner animation="border" size="sm" /> Loading ...
            </>
          ) : quantityReachedToMax ? (
            "Out of stock"
          ) : (
            "Add to cart"
          )}
        </Button>
      </ProductInfo>
    </>
  );
};
export default memo(Product);
