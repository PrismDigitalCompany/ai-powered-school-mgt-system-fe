import { useMemo } from "react";
import {
  useSubscriptionPlanSessionState,
  getEffectiveSubscriptionPlans,
} from "../data/createdSubscriptionPlans";


export function useSubscriptionPlan(planId) {
  const sessionState = useSubscriptionPlanSessionState();

  const data = useMemo(
    () =>
      getEffectiveSubscriptionPlans(sessionState).find(
        (plan) => plan.id === planId,
      ) ?? null,
    [sessionState, planId],
  );

  return {
    data,
    isLoading: false,
    isError: false,
  };
}

export default useSubscriptionPlan;
