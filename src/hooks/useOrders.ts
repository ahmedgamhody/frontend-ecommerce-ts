import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetOrders, ordersCleanUp } from "@store/orders/ordersSlice";
import { TProduct } from "@types";
import { useEffect, useState } from "react";
export default function useOrders() {
  const dispatch = useAppDispatch();
  const { loading, error, orderList } = useAppSelector((state) => state.orders);
  const [selectedProduct, setSelectedProduct] = useState<TProduct[]>([]);
  const [showModal, setShowModal] = useState(false);
  const viewDetailsHandler = (id: number) => {
    const productsDetails = orderList.find(
      (order) => Number(order.id) === id
    )?.items;
    const newItems = productsDetails ?? [];
    setShowModal(true);
    setSelectedProduct(newItems);
  };

  const closeModalHandler = () => {
    setShowModal(false);
    setSelectedProduct([]);
  };

  useEffect(() => {
    const promise = dispatch(actGetOrders());
    return () => {
      promise.abort();
      dispatch(ordersCleanUp());
    };
  }, [dispatch]);
  return {
    loading,
    error,
    selectedProduct,
    showModal,
    viewDetailsHandler,
    closeModalHandler,
    orderList,
  };
}
