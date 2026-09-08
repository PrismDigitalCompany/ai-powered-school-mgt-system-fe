import SearchInput from "../../../components/inputs/SearchInput";
import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import { MOCK_SUBSCRIPTION_PLANS } from "../data/subscriptionPlans";
import {
  SUBSCRIPTION_STATUS_BADGE,
  BILLING_CYCLE,
  BILLING_CYCLE_LABEL,
} from "../data/schoolSubscriptions";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  ...Object.entries(SUBSCRIPTION_STATUS_BADGE).map(([value, { label }]) => ({
    value,
    label,
  })),
];

const BILLING_CYCLE_OPTIONS = [
  { value: "", label: "All billing cycles" },
  ...Object.values(BILLING_CYCLE).map((value) => ({
    value,
    label: BILLING_CYCLE_LABEL[value],
  })),
];

const SchoolSubscriptionsFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  planId,
  onPlanIdChange,
  billingCycle,
  onBillingCycleChange,
}) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
    <SearchInput
      value={search}
      onChange={onSearchChange}
      placeholder="Search by school, code, or plan…"
      className="sm:max-w-xs"
    />

    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      className={NATIVE_SELECT_CLASSNAME}
      aria-label="Filter by subscription status"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <select
      value={planId}
      onChange={(e) => onPlanIdChange(e.target.value)}
      className={NATIVE_SELECT_CLASSNAME}
      aria-label="Filter by plan"
    >
      <option value="">All plans</option>
      {MOCK_SUBSCRIPTION_PLANS.map((plan) => (
        <option key={plan.id} value={plan.id}>
          {plan.name}
        </option>
      ))}
    </select>

    <select
      value={billingCycle}
      onChange={(e) => onBillingCycleChange(e.target.value)}
      className={NATIVE_SELECT_CLASSNAME}
      aria-label="Filter by billing cycle"
    >
      {BILLING_CYCLE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SchoolSubscriptionsFilters;
