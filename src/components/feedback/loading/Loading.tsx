import { TLoading } from "@types";
import CategorySkeletone from "../skeletons/CategorySkeletone/CategorySkeletone";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";
import OrderSkeleton from "../skeletons/OrderSkeleton/OrderSkeleton";

const skeletonTypes = {
  cart: CartSkeleton,
  products: ProductSkeleton,
  category: CategorySkeletone,
  orders: OrderSkeleton,
};

type LoadingProps = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
  type?: keyof typeof skeletonTypes;
};

export default function loading({
  status,
  error,
  children,
  type = "category",
}: LoadingProps) {
  const Component = skeletonTypes[type];

  if (status === "pending") {
    return <Component />;
  }
  if (status === "failed") {
    return (
      <div>
        <LottieHandler
          type="error"
          message={error as string}
          className="text-danger"
        />
      </div>
    );
  }
  return <>{children}</>;
}
