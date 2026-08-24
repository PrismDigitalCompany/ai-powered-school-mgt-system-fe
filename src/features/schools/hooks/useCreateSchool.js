import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolsService } from "../services/schools.service";

export function useCreateSchool() {
  return useMutation({
    mutationFn: schoolsService.createSchool,
    onSuccess() {
      toast.success("School registered.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to register the school. Please try again.",
      );
    },
  });
}

export default useCreateSchool;
