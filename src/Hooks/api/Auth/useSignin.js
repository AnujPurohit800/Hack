import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth";
import { signInRequest } from "../../../api/Auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export const useSignin = () => {
  const { setAuth, setIsLoggedIn } = useAuth();

  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (response) => {
      const userObject = JSON.stringify(response);
      setIsLoggedIn(true);
      localStorage.setItem("user", userObject);
      localStorage.setItem("token", response.data.token);

      setAuth({
        user: response,
        token: response.token,
        isLoading: false,
      });

      // Optional: Success Toast
      toast.success("Login successful!");
    },
    onError: (error) => {
      console.error(error.message);

      // Optional: Error Toast
      toast.error(error.message || "Failed to login.");
    },
  });

  return {
    isSuccess,
    isPending,
    error,
    signinMutation,
  };
};
