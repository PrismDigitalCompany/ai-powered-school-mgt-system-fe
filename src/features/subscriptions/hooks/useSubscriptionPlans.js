import { useMemo, useState } from "react";
import {
  useSubscriptionPlanSessionState,
  getEffectiveSubscriptionPlans,
} from "../data/createdSubscriptionPlans";

export function useSubscriptionPlans() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const sessionState = useSubscriptionPlanSessionState();

  const allPlans = useMemo(
    () => getEffectiveSubscriptionPlans(sessionState),
    [sessionState],
  );

  const data = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allPlans.filter((plan) => {
      const matchesQuery = !query || plan.name.toLowerCase().includes(query);
      const matchesStatus = !status || plan.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [allPlans, search, status]);

  return {
    data,
    totalItems: data.length,
    search,
    onSearchChange: setSearch,
    status,
    onStatusChange: setStatus,
    isLoading: false,
    isError: false,
  };
}

export default useSubscriptionPlans;
