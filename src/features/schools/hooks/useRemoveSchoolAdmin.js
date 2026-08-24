import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolsService } from "../services/schools.service";

export function useRemoveSchoolAdmin() {
  return useMutation({
    mutationFn: schoolsService.removeSchoolAdmin,
    onSuccess() {
      toast.success("School Admin removed from this school.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to remove the School Admin. Please try again.",
      );
    },
  });
}

export default useRemoveSchoolAdmin;
