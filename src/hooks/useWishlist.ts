import { actGetWishlist, wishlistCleanUp } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
function useWishlist() {
  const dispatch = useAppDispatch();
  const { productFullInfo, error, loading } = useAppSelector(
    (state) => state.wishlist
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const records = productFullInfo.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: true,
    isAuthenticated: true,
  }));
  useEffect(() => {
    const promise = dispatch(actGetWishlist("ProductsFullInfo"));

    return () => {
      dispatch(wishlistCleanUp());
      promise.abort();
    };
  }, [dispatch]);
  return { error, loading, records };
}

export default useWishlist;
