import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolAdminsService } from "../services/schoolAdmins.service";

export function useDeactivateSchoolAdmin() {
  return useMutation({
    mutationFn: schoolAdminsService.deactivateSchoolAdmin,
    onSuccess() {
      toast.success("School Admin account deactivated.");
    },
    onError(error) {
      toast.error(
        error.message ??
          "Unable to deactivate the School Admin account. Please try again.",
      );
    },
  });
}

export default useDeactivateSchoolAdmin;
