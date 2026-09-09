import { useMemo } from "react";
import {
  getEffectiveSchoolSubscriptions,
  resolveSchoolSubscriptionView,
} from "../data/schoolSubscriptions";
import { useSchoolSubscriptionSessionState } from "../data/createdSchoolSubscriptions";
import {
  useSubscriptionPlanSessionState,
  getEffectiveSubscriptionPlans,
} from "../data/createdSubscriptionPlans";

export function useSchoolSubscription(schoolId) {
  const subscriptionPlanSessionState = useSubscriptionPlanSessionState();
  const schoolSubscriptionSessionState = useSchoolSubscriptionSessionState();
  const effectivePlans = useMemo(
    () => getEffectiveSubscriptionPlans(subscriptionPlanSessionState),
    [subscriptionPlanSessionState],
  );

  const data = useMemo(() => {
    const record = getEffectiveSchoolSubscriptions(
      schoolSubscriptionSessionState.createdSubscriptions,
      schoolSubscriptionSessionState.overridesBySchoolId,
    ).find((r) => r.schoolId === schoolId);
    return record
      ? resolveSchoolSubscriptionView(record, effectivePlans)
      : null;
  }, [schoolId, schoolSubscriptionSessionState, effectivePlans]);

  return {
    data,
    isLoading: false,
    isError: false,
  };
}

export default useSchoolSubscription;
