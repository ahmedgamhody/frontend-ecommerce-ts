import {
  actGetProductsByItems,
  cartCleanUp,
  cartItemsChangeQuantity,
  removeCartItem,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ordersCleanUp } from "@store/orders/ordersSlice";
import { useCallback, useEffect } from "react";

function useCart() {
  const dispatch = useAppDispatch();
  const { productFullInfo, items, error, loading } = useAppSelector(
    (state) => state.cart
  );
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const changeQuantityHandelar = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemsChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandelar = useCallback(
    (id: number) => {
      dispatch(removeCartItem(id));
    },
    [dispatch]
  );

  const placeOrderStatus = useAppSelector((state) => state.orders.loading);

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      promise.abort();
      dispatch(cartCleanUp());
      dispatch(ordersCleanUp());
    };
  }, [dispatch]);
  const products = productFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  return {
    removeItemHandelar,
    changeQuantityHandelar,
    products,
    error,
    loading,
    userAccessToken,
    placeOrderStatus,
  };
}

export default useCart;
