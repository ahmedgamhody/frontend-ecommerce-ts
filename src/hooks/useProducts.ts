import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import {
  actGetProductsByCatPrefix,
  productsCleanUp,
} from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
export default function useProducts() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector((state) => state.products);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItemsIds = useAppSelector((state) => state.wishlist.productsId);
  // this const for pass quantity
  const productFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
    isLiked: wishlistItemsIds.includes(el.id),
    isAuthenticated: userAccessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCatPrefix(params.prefix as string)
    );
    return () => {
      dispatch(productsCleanUp()); // هنا بعمل clean up for products which were is
      promise.abort(); // دا عشان لو فتحت صفخه ال catogey وبعدها ضغط على ال cat وفتحت صفحه ال products ورجعت بسرعه يكنسل ال request
    };
  }, [params, dispatch]);
  return { productFullInfo, error, loading, params };
}
