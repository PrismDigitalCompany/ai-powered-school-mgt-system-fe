import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolsService } from "../services/schools.service";

export function useSuspendSchool() {
  return useMutation({
    mutationFn: schoolsService.suspendSchool,
    onSuccess() {
      toast.success("School suspended.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to suspend the school. Please try again.",
      );
    },
  });
}

export default useSuspendSchool;
