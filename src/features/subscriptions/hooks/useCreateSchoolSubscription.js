import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { subscriptionsService } from "../services/subscriptions.service";


export function useCreateSchoolSubscription() {
  return useMutation({
    mutationFn: ({ schoolId, payload }) =>
      subscriptionsService.createSchoolSubscription(schoolId, payload),
    onSuccess() {
      toast.success("School subscription created.");
    },
    onError(error) {
      toast.error(
        error.message ?? "Unable to create the subscription. Please try again.",
      );
    },
  });
}

export default useCreateSchoolSubscription;
