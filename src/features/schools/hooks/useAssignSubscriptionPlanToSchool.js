import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { schoolsService } from "../services/schools.service";


export function useAssignSubscriptionPlanToSchool() {
  return useMutation({
    mutationFn: ({ schoolId, planId }) =>
      schoolsService.assignSubscriptionPlan(schoolId, planId),
    onSuccess() {
      toast.success("Subscription plan assigned.");
    },
    onError(error) {
      toast.error(
        error.message ??
          "Unable to assign the subscription plan. Please try again.",
      );
    },
  });
}

export default useAssignSubscriptionPlanToSchool;
