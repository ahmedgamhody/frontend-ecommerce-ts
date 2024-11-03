import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpTypes } from "@validations/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister, authCleanUp } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function useRegister() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    getFieldState,
    trigger,
    formState: { errors },
  } = useForm<signUpTypes>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const submitForm: SubmitHandler<signUpTypes> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(actAuthRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        nav("/login?message=account_created_successfully");
      });
  };

  //
  // use emailHook
  const {
    emailAvailabilityStatus,
    enteredEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    await trigger("email");
    const email = e.target.value;
    const { invalid, isDirty } = getFieldState("email");
    if (isDirty && !invalid && enteredEmail !== email) {
      checkEmailAvailability(email);
    }
    if (email.length === 0) {
      resetCheckEmailAvailability();
    }
  };
  useEffect(() => {
    // clean up loading and error messages form slice
    return () => {
      dispatch(authCleanUp());
    };
  }, [dispatch]);
  return {
    loading,
    error,
    accessToken,
    register,
    handleSubmit,
    submitForm,
    emailAvailabilityStatus,
    emailOnBlurHandler,
    errors,
  };
}
