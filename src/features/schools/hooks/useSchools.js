import { useMemo, useState } from "react";
import { MOCK_SCHOOLS } from "../data/schoolsMock";

const PAGE_SIZE = 10;

export function useSchools() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return MOCK_SCHOOLS.filter((school) => {
      const matchesQuery =
        !query ||
        school.name.toLowerCase().includes(query) ||
        school.code.toLowerCase().includes(query);
      const matchesStatus = !status || school.status === status;
      const matchesPlan = !plan || school.subscriptionPlan === plan;
      return matchesQuery && matchesStatus && matchesPlan;
    });
  }, [search, status, plan]);

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
    plan,
    onPlanChange: withPageReset(setPlan),
    // Always false against local data — present so a future React Query
    // swap doesn't change what callers branch on.
    isLoading: false,
    isError: false,
  };
}

export default useSchools;
