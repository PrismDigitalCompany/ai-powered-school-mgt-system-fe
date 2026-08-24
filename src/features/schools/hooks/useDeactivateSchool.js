import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolsService } from "../services/schools.service";

export function useDeactivateSchool() {
  return useMutation({
    mutationFn: schoolsService.deactivateSchool,
    onSuccess() {
      toast.success("School deactivated.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to deactivate the school. Please try again.",
      );
    },
  });
}

export default useDeactivateSchool;
