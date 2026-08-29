import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authService } from "../services/auth.service";

export function useVerifyOtp() {
  return useMutation({
    mutationFn: authService.verifyOtp,
    onSuccess() {
      toast.success("Email verified.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to verify that code. Please try again.",
      );
    },
  });
}

export default useVerifyOtp;
