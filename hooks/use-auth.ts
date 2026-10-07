"use client";

import { useMutation } from "@tanstack/react-query";
import { AuthLogin } from "../services/authentication-service";
import { useState } from "react";
import { COMMON_LOGIN_PAYLOAD } from "../constants/config";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/hooks/use-auth-context";
import { TLoginPayload, LoginResponse } from "@/types/auth";
import Cookies from "js-cookie";

const formSchema = z.object({
  userServer: z.string().min(1, "Server is required"),
  userId: z.string().min(1, "User ID is required"),
  userPassword: z
    .string()
    .min(1, "Password is required")
    .min(5, "Password must be at least 5 characters"),
});
type TFormValues = z.infer<typeof formSchema>;
const defaultFormValues: TFormValues = {
  userServer: "",
  userId: "",
  userPassword: "",
};

export default function useAuth() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthContext();
  const [apiError, setApiError] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    clearErrors,
  } = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultFormValues,
    mode: "onTouched",
  });

  const formData = watch();

  const { mutate, isPending } = useMutation<
    LoginResponse,
    Error,
    TLoginPayload
  >({
    mutationKey: ["auth-login"],
    mutationFn: AuthLogin,
    onMutate: () => {
      setApiError("");
      clearErrors();
    },
    onSuccess: (data) => {
      const currentUser = data.data?.[0] ?? null;
      if (!currentUser) {
        throw new Error("Invalid response: user data is missing");
      }
      Cookies.set("auth_token", data.token ?? "", { expires: 7 });
      login({
        user: currentUser,
        privileges: data.data2 ?? [],
        config: data.data3 ?? [],
        token: data.token ?? "",
      });
      window?.location?.reload()
      // replace("/home");
    },
    onError: (error) => {
      setApiError(`${error}`);
    },
    onSettled: () => {
      reset();
    },
  });

  const handleLogin = () => {
    const payload = {
      ...COMMON_LOGIN_PAYLOAD,
      ...formData,
    };
    mutate(payload);
  };

  const handleFormSubmit = handleSubmit(() => {
    handleLogin();
  });

  const clearApiError = () => {
    setApiError("");
    clearErrors();
  };

  return {
    isPending,
    errors,
    control,
    handleFormSubmit,
    apiError,
    clearApiError,
    showPassword,
    setShowPassword,
  };
}
