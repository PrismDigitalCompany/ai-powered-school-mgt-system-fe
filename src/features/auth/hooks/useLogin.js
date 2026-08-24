import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../services/auth.service";
import { useAuthStore } from "../../../app/store/authStore";

export function useLogin() {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: authService.login,
    onSuccess(data) {
      login(data.user, data.token);
      toast.success("You've successfully logged in.");
    },
    onError(error) {
      toast.error(error.message ?? "Unable to log in. Please try again.");
    },
  });
}

export default useLogin;
