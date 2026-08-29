import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../services/auth.service";

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess() {
      toast.success("Reset instructions sent, if that email is registered.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to request a reset. Please try again.",
      );
    },
  });
}

export default useForgotPassword;
