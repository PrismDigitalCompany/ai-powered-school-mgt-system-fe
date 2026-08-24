import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolAdminsService } from "../services/schoolAdmins.service";

export function useActivateSchoolAdmin() {
  return useMutation({
    mutationFn: schoolAdminsService.activateSchoolAdmin,
    onSuccess() {
      toast.success("School Admin account activated.");
    },
    onError(error) {
      toast.error(
        error.message ??
          "Unable to activate the School Admin account. Please try again.",
      );
    },
  });
}

export default useActivateSchoolAdmin;
