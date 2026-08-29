import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolAdminsService } from "../services/schoolAdmins.service";

export function useUpdateSchoolAdminPermissions() {
  return useMutation({
    mutationFn: ({ adminId, overrides }) =>
      schoolAdminsService.updateSchoolAdminPermissions(adminId, overrides),
    onSuccess() {
      toast.success("School Admin permissions updated.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to update permissions. Please try again.",
      );
    },
  });
}

export default useUpdateSchoolAdminPermissions;
