import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { Product } from "@components/eCommerce";
import useWishlist from "@hooks/useWishlist";
import { useAppSelector } from "@store/hooks";
import { Navigate } from "react-router-dom";

export default function Wishlist() {
  const { records, error, loading } = useWishlist();
  const { accessToken } = useAppSelector((state) => state.auth);
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Heading title="Your Wishlist"></Heading>

      <Loading status={loading} error={error} type="products">
        <GridList
          records={records}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="Your wishlist is empty"
        />
      </Loading>
    </>
  );
}
