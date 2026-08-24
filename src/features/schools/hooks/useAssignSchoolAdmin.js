import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolsService } from "../services/schools.service";

export function useAssignSchoolAdmin() {
  return useMutation({
    mutationFn: ({ schoolId, schoolAdminId }) =>
      schoolsService.assignSchoolAdmin(schoolId, schoolAdminId),
    onSuccess() {
      toast.success("School Admin assigned.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to assign the School Admin. Please try again.",
      );
    },
  });
}

export default useAssignSchoolAdmin;
