import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetAllProducts,
  allProductsCleanUp,
} from "@store/products/productsSlice";
import { useEffect } from "react";
export default function useHome() {
  const dispatch = useAppDispatch();
  const { allPtoducts, error, loading } = useAppSelector(
    (state) => state.products
  );
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsIds = useAppSelector((state) => state.wishlist.productsId);
  const productFullInfo = allPtoducts.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsIds.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));
  useEffect(() => {
    const promise = dispatch(actGetAllProducts());
    return () => {
      promise.abort();
      dispatch(allProductsCleanUp());
    };
  }, [dispatch]);
  return { error, loading, productFullInfo };
}
