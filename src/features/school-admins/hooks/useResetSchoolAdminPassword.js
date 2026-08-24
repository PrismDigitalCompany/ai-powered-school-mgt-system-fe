import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolAdminsService } from "../services/schoolAdmins.service";

export function useResetSchoolAdminPassword() {
  return useMutation({
    mutationFn: ({ adminId, password }) =>
      schoolAdminsService.resetSchoolAdminPassword(adminId, password),
    onSuccess() {
      toast.success("Password reset.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to reset the password. Please try again.",
      );
    },
  });
}

export default useResetSchoolAdminPassword;
