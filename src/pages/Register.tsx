import { Heading } from "@components/common";
import { InputField } from "@components/form";
import useRegister from "@hooks/useRegister";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from "react-router-dom";

///

export default function Register() {
  const {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    submitForm,
    emailAvailabilityStatus,
    emailOnBlurHandler,
    errors,
  } = useRegister();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form
            style={{ marginBottom: "30px" }}
            onSubmit={handleSubmit(submitForm)}
          >
            <InputField
              label="First Name"
              type="text"
              placeholder="Enter first name"
              registration={register("firstName")}
              error={errors.firstName}
            />

            <InputField
              label="Last Name"
              type="text"
              placeholder="Enter last name"
              registration={register("lastName")}
              error={errors.lastName}
            />

            <InputField
              label="Email address"
              type="email"
              placeholder="Enter email"
              registration={register("email")}
              error={errors.email}
              onBlurFunction={emailOnBlurHandler}
              emailInputText={emailAvailabilityStatus}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="Password"
              registration={register("password")}
              error={errors.password}
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Confirm password"
              registration={register("confirmPassword")}
              error={errors.confirmPassword}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking" || loading === "pending"
              }
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Register ...
                </>
              ) : (
                "Register"
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
