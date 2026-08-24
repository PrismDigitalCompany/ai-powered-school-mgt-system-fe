import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { subscriptionsService } from "../services/subscriptions.service";


export function useDeleteSubscriptionPlan() {
  return useMutation({
    mutationFn: (planId) => subscriptionsService.deleteSubscriptionPlan(planId),
    onSuccess() {
      toast.success("Subscription plan deleted.");
    },
    onError(error) {
      toast.error(
        error.message ??
          "Unable to delete the subscription plan. Please try again.",
      );
    },
  });
}

export default useDeleteSubscriptionPlan;
