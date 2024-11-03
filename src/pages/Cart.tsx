import { Heading } from "@components/common";
import { CartItemList, CartSubTotalPrice } from "@components/eCommerce";
import { Loading, LottieHandler } from "@components/feedback";
import useCart from "@hooks/useCart";

export default function Cart() {
  const {
    removeItemHandelar,
    changeQuantityHandelar,
    products,
    error,
    loading,
    userAccessToken,
    placeOrderStatus,
  } = useCart();

  return (
    <>
      <Heading title="Your Cart"></Heading>
      <Loading status={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CartItemList
              products={products}
              changeQuantityHandelar={changeQuantityHandelar}
              removeItemHandelar={removeItemHandelar}
            />
            <CartSubTotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : (
          <div>
            {placeOrderStatus === "succeeded" ? (
              <LottieHandler
                type="success"
                message="Your order has been placed successfully"
              />
            ) : (
              <LottieHandler type="emtyRecord" message="Your cart is empty" />
            )}
          </div>
        )}
      </Loading>
    </>
  );
}
