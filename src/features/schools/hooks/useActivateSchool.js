import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolsService } from "../services/schools.service";

export function useActivateSchool() {
  return useMutation({
    mutationFn: schoolsService.activateSchool,
    onSuccess() {
      toast.success("School activated.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to activate the school. Please try again.",
      );
    },
  });
}

export default useActivateSchool;
