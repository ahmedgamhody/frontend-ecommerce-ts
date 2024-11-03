import { Container } from "react-bootstrap";
import { Product } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import useProducts from "@hooks/useProducts";
/////////////////////
const Products = () => {
  const { params, loading, error, productFullInfo } = useProducts();
  return (
    <Container>
      <Heading title={`${params.prefix?.toUpperCase()} Products`}></Heading>
      <Loading status={loading} error={error} type="products">
        <GridList
          records={productFullInfo}
          renderItem={(record) => <Product {...record} />}
          emptyMessage="No products found"
        />
      </Loading>
    </Container>
  );
};

export default Products;
