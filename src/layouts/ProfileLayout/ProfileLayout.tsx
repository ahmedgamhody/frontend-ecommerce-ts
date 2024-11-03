import { useAppSelector } from "@store/hooks";
import { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { Navigate, NavLink, Outlet } from "react-router-dom";
export default function ProfileLayout() {
  const { accessToken } = useAppSelector((state) => state.auth);
  useEffect(() => {}, []);
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Row>
      <Col>
        <ListGroup>
          <ListGroup.Item as={NavLink} to="" end>
            My Accont Info
          </ListGroup.Item>
          <ListGroup.Item as={NavLink} to="orders">
            Orders
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={9}>
        <Outlet />
      </Col>
    </Row>
  );
}
