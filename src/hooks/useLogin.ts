import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthLogin, authCleanUp } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { signInSchema, signInTypes } from "@validations/signInSchema";
import { useEffect } from "react";
export default function useLogin() {
  const { loading, error, accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInTypes>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur", // تفعيل التحقق عند ترك الحقل
  });

  const submitForm: SubmitHandler<signInTypes> = async (data) => {
    if (searchParams.get("message")) {
      setSearchParams({});
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => {
        nav("/");
      });
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
    errors,
    searchParams,
  };
}
