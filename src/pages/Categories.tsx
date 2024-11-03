import { Container } from "react-bootstrap";
import { Category } from "@components/eCommerce";

import { Loading } from "@components/feedback";
import { GridList, Heading } from "@components/common";
import useCategories from "@hooks/useCategories";
export default function Categories() {
  const { records, error, loading } = useCategories();
  return (
    <Container>
      <Heading title="Categories"></Heading>
      <Loading status={loading} error={error} type="category">
        <GridList
          records={records}
          renderItem={(record) => {
            return <Category {...record} />;
          }}
          emptyMessage="No categories found"
        />
      </Loading>
    </Container>
  );
}
