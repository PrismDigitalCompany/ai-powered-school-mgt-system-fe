import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../services/auth.service";

export function useResendOtp() {
  return useMutation({
    mutationFn: authService.resendOtp,
    onSuccess() {
      toast.success("A new code has been sent to your email.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to resend a code. Please try again.",
      );
    },
  });
}

export default useResendOtp;
