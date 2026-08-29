import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { subscriptionsService } from "../services/subscriptions.service";


export function useUpdateSubscriptionPlan() {
  return useMutation({
    mutationFn: ({ planId, payload }) =>
      subscriptionsService.updateSubscriptionPlan(planId, payload),
    onSuccess() {
      toast.success("Subscription plan updated.");
    },
    onError(error) {
      toast.error(
        error.message ??
          "Unable to update the subscription plan. Please try again.",
      );
    },
  });
}

export default useUpdateSubscriptionPlan;
