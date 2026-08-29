import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../services/auth.service";

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ confirmPassword: _confirmPassword, ...payload }) =>
      authService.resetPassword(payload),
    onSuccess() {
      toast.success("Password reset. You can now sign in.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to reset your password. Please try again.",
      );
    },
  });
}

export default useResetPassword;
