import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolsService } from "../services/schools.service";

export function useUpdateSchool() {
  return useMutation({
    mutationFn: ({ schoolId, payload }) =>
      schoolsService.updateSchool(schoolId, payload),
    onSuccess() {
      toast.success("School updated.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to update the school. Please try again.",
      );
    },
  });
}

export default useUpdateSchool;
