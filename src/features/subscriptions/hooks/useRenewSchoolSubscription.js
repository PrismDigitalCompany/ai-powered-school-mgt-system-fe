import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { subscriptionsService } from "../services/subscriptions.service";

export function useRenewSchoolSubscription() {
  return useMutation({
    mutationFn: ({ schoolId, subscriptionId, payload }) =>
      subscriptionsService.renewSchoolSubscription(
        schoolId,
        subscriptionId,
        payload,
      ),
    onSuccess() {
      toast.success("Subscription period extended.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to renew the subscription. Please try again.",
      );
    },
  });
}

export default useRenewSchoolSubscription;
