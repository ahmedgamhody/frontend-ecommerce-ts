import { Container } from "react-bootstrap";
import { Header, Footer } from "@components/common";

import styles from "./styles.module.css";
import { Outlet } from "react-router-dom";
const { container, wrapper } = styles;
export default function MainLayout() {
  return (
    <Container className={container}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  );
}