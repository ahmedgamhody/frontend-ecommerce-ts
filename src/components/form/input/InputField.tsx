import React from "react";
import Form from "react-bootstrap/Form";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
type TEmailStatus =
  | "idle"
  | "available"
  | "notAvailable"
  | "checking"
  | "failed";
interface InputFieldProps {
  label: string;
  type?: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  autoComplete?: string;
  onBlurFunction?: (e: React.FocusEvent<HTMLInputElement>) => void;
  emailInputText?: TEmailStatus;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  registration,
  error,
  autoComplete = "new-password",
  onBlurFunction,
  emailInputText,
}: InputFieldProps) {
  // onBlur Handles
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlurFunction) {
      onBlurFunction(e); // نفذ onBlur المخصصة فقط إذا كانت موجودة
      registration.onBlur(e); // نفذ التحقق العام من useForm عند مغادرة الحقل
    } else {
      registration.onBlur(e); // نفذ التحقق العام من useForm عند مغادرة الحقل
    }
  };

  const showEmailMessage = (email: TEmailStatus) => {
    if (email === "available") {
      return (
        !error && (
          <Form.Text className="text-success">
            This email is available for use.
          </Form.Text>
        )
      );
    } else if (email === "notAvailable") {
      return (
        !error && (
          <Form.Text className="text-danger">
            This email is already taken.
          </Form.Text>
        )
      );
    } else if (email == "checking") {
      return (
        !error && (
          <Form.Text muted>
            We're currently checking the availability of this email address.
            Please wait a moment.
          </Form.Text>
        )
      );
    } else if (email == "failed") {
      return (
        !error && (
          <Form.Text className="text-danger">
            An error occurred while checking the email availability.
          </Form.Text>
        )
      );
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...registration}
        isInvalid={
          !!error ||
          emailInputText === "failed" ||
          emailInputText === "notAvailable"
        }
        autoComplete={autoComplete} // for paswords inputs only
        onBlur={onBlurHandler}
        isValid={emailInputText === "available"}
        disabled={emailInputText === "checking"}
      />
      {error && (
        <Form.Control.Feedback type="invalid">
          {error.message}
        </Form.Control.Feedback>
      )}
      {emailInputText && showEmailMessage(emailInputText)}
    </Form.Group>
  );
}
