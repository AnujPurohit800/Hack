import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/useAuth";
import { signInRequest } from "../../../api/Auth";

export const useSignin = () => {
 
  const { setAuth,setIsLoggedIn } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (response) => {
      console.log("Successfully signed in", response);

      const userObject = JSON.stringify(response.data);
      setIsLoggedIn(true);
      localStorage.setItem("user", userObject);
      localStorage.setItem("token", response.data.token);

      setAuth({
        user: response.data,
        token: response.data.token,
        isLoading: false,
      });
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  return {
    isSuccess,
    isPending,
    error,
    signinMutation,
  };
};
