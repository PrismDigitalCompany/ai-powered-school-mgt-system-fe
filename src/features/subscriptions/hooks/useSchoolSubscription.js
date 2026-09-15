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
  const subscriptionSessionState = useSubscriptionPlanSessionState();
  const { createdSubscriptions, overridesBySubscriptionId } =
    useSchoolSubscriptionSessionState();
  const effectivePlans = useMemo(
    () => getEffectiveSubscriptionPlans(subscriptionSessionState),
    [subscriptionSessionState],
  );

  const data = useMemo(() => {
    const record = getEffectiveSchoolSubscriptions(
      createdSubscriptions,
      overridesBySubscriptionId,
    ).find((r) => r.schoolId === schoolId);
    return record
      ? resolveSchoolSubscriptionView(record, effectivePlans)
      : null;
  }, [schoolId, createdSubscriptions, overridesBySubscriptionId, effectivePlans]);

  return {
    data,
    isLoading: false,
    isError: false,
  };
}

export default useSchoolSubscription;
