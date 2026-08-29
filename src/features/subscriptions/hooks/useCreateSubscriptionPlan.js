import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { subscriptionsService } from "../services/subscriptions.service";

export function useCreateSubscriptionPlan() {
  return useMutation({
    mutationFn: subscriptionsService.createSubscriptionPlan,
    onSuccess() {
      toast.success("Subscription plan created.");
    },
    onError(error) {
      toast.error(
        error.message ??
          "Unable to create the subscription plan. Please try again.",
      );
    },
  });
}

export default useCreateSubscriptionPlan;
