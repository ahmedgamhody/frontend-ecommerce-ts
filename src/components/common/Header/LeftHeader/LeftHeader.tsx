import { PiListHeartBold } from "react-icons/pi";
import { BsCart2 } from "react-icons/bs";
import { useAppSelector } from "@store/hooks";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";
import HeaderCounter from "./HeaderCounter/HeaderCounter";
export default function LeftHeader() {
  const carTotalQuantity = useAppSelector(getCartTotalQuantitySelector) || 0;
  const wishlistTotalQuantity =
    useAppSelector((state) => state.wishlist.productsId.length) || 0;
  return (
    <div className="d-flex gap-3 align-items-center">
      <HeaderCounter
        title="WishList"
        navigate="/wishlist"
        icon={<PiListHeartBold size={"30px"} />}
        totalQuantity={wishlistTotalQuantity}
      />
      <HeaderCounter
        title="Cart"
        navigate="/cart"
        icon={<BsCart2 size={"30px"} />}
        totalQuantity={carTotalQuantity}
      />
    </div>
  );
}
