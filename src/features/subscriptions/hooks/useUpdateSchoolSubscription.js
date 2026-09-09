import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { subscriptionsService } from "../services/subscriptions.service";

export function useUpdateSchoolSubscription() {
  return useMutation({
    mutationFn: ({ schoolId, subscriptionId, payload }) =>
      subscriptionsService.updateSchoolSubscription(
        schoolId,
        subscriptionId,
        payload,
      ),
    onSuccess() {
      toast.success("School subscription updated.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to update the subscription. Please try again.",
      );
    },
  });
}

export default useUpdateSchoolSubscription;
