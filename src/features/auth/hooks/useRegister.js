import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../services/auth.service";

export function useRegister() {
  return useMutation({
    mutationFn: ({ confirmPassword: _confirmPassword, ...payload }) =>
      authService.register(payload),
    onSuccess() {
      toast.success("Account created. You can now sign in.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to create your account. Please try again.",
      );
    },
  });
}

export default useRegister;
