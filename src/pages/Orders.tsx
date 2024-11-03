import { Heading } from "@components/common";
import { ProductInfo } from "@components/eCommerce";
import { Loading } from "@components/feedback";
import useOrders from "@hooks/useOrders";

import { Modal, Table } from "react-bootstrap";

export default function Orders() {
  const {
    loading,
    error,
    selectedProduct,
    showModal,
    viewDetailsHandler,
    closeModalHandler,
    orderList,
  } = useOrders();
  return (
    <>
      <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity={el.quantity}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Heading title="My Order" />
      <Loading status={loading} error={error} type="orders">
        <Table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>
                  {order.items.length} item(s)
                  <span
                    onClick={() => viewDetailsHandler(Number(order.id))}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Product Details
                  </span>
                </td>
                <td>{order.totalPrice.toFixed(2)} EGP</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Loading>
    </>
  );
}
