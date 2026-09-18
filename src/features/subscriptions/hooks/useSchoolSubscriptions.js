import { useMemo, useState } from "react";
import {
  getEffectiveSchoolSubscriptions,
  resolveSchoolSubscriptionView,
} from "../data/schoolSubscriptions";
import { useSchoolSubscriptionSessionState } from "../data/createdSchoolSubscriptions";
import {
  useSubscriptionPlanSessionState,
  getEffectiveSubscriptionPlans,
} from "../data/createdSubscriptionPlans";

const PAGE_SIZE = 10;

export function useSchoolSubscriptions() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [planId, setPlanId] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [page, setPage] = useState(1);

  const subscriptionPlanSessionState = useSubscriptionPlanSessionState();
  const { createdSubscriptions, overridesBySubscriptionId } =
    useSchoolSubscriptionSessionState();
  const effectivePlans = useMemo(
    () => getEffectiveSubscriptionPlans(subscriptionPlanSessionState),
    [subscriptionPlanSessionState],
  );

  const allSubscriptions = useMemo(
    () =>
      getEffectiveSchoolSubscriptions(
        createdSubscriptions,
        overridesBySubscriptionId,
      ).map((record) => resolveSchoolSubscriptionView(record, effectivePlans)),
    [createdSubscriptions, overridesBySubscriptionId, effectivePlans],
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return allSubscriptions.filter((subscription) => {
      const matchesQuery =
        !query ||
        subscription.school?.name.toLowerCase().includes(query) ||
        subscription.school?.code.toLowerCase().includes(query) ||
        subscription.plan?.name.toLowerCase().includes(query);
      const matchesStatus = !status || subscription.status === status;
      const matchesPlan = !planId || subscription.planId === planId;
      const matchesBillingCycle =
        !billingCycle || subscription.billingCycle === billingCycle;
      return (
        matchesQuery && matchesStatus && matchesPlan && matchesBillingCycle
      );
    });
  }, [allSubscriptions, search, status, planId, billingCycle]);

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const data = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return {
    data,
    totalItems,
    page: safePage,
    pageSize: PAGE_SIZE,
    onPageChange: setPage,
    search,
    onSearchChange: withPageReset(setSearch),
    status,
    onStatusChange: withPageReset(setStatus),
    planId,
    onPlanIdChange: withPageReset(setPlanId),
    billingCycle,
    onBillingCycleChange: withPageReset(setBillingCycle),
    isLoading: false,
    isError: false,
  };
}

export default useSchoolSubscriptions;
