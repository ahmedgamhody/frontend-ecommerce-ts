import { GridList, Heading } from "@components/common";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import useHome from "@hooks/useHome";

import { Container } from "react-bootstrap";

export default function Home() {
  const { error, loading, productFullInfo } = useHome();
  return (
    <Container>
      <Heading title={`All Products`}></Heading>
      <Loading status={loading} error={error} type="products">
        <GridList
          records={productFullInfo}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="No products found"
        />
      </Loading>
    </Container>
  );
}
