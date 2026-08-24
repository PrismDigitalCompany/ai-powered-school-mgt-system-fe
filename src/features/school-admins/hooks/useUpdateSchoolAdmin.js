import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolAdminsService } from "../services/schoolAdmins.service";


export function useUpdateSchoolAdmin() {
  return useMutation({
    mutationFn: ({ adminId, payload }) =>
      schoolAdminsService.updateSchoolAdmin(adminId, payload),
    onSuccess() {
      toast.success("School Admin profile updated.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to update the School Admin. Please try again.",
      );
    },
  });
}

export default useUpdateSchoolAdmin;
