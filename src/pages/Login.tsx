import { Heading } from "@components/common";
import { InputField } from "@components/form";
import useLogin from "@hooks/useLogin";

import { Col, Row, Alert, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";

export default function Login() {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    submitForm,
    errors,
    searchParams,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") && (
            <Alert variant="success">
              Your account has been created successfully , please login
            </Alert>
          )}

          <Form
            style={{ marginBottom: "30px" }}
            onSubmit={handleSubmit(submitForm)}
          >
            <InputField
              label="Email address"
              type="email"
              placeholder="Enter email"
              registration={register("email")}
              error={errors.email}
              autoComplete="email"
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Password"
              registration={register("password")}
              error={errors.password}
              autoComplete="current-password"
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={loading === "pending"}
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Login ...
                </>
              ) : (
                "Login"
              )}
            </Button>
            {error && (
              <Alert
                variant="danger"
                style={{ marginTop: "10px", color: "red" }}
              >
                {error}
              </Alert>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
}
