import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolAdminsService } from "../services/schoolAdmins.service";

export function useCreateSchoolAdmin() {
  return useMutation({
    mutationFn: schoolAdminsService.createSchoolAdmin,
    onSuccess() {
      toast.success("School Admin account created.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to create the School Admin. Please try again.",
      );
    },
  });
}

export default useCreateSchoolAdmin;
