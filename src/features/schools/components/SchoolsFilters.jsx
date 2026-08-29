import SearchInput from "../../../components/inputs/SearchInput";
import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import { STATUS } from "../../../constants/status";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: STATUS.ACTIVE, label: "Active" },
  { value: STATUS.INACTIVE, label: "Inactive" },
  { value: STATUS.SUSPENDED, label: "Suspended" },
];

const PLAN_OPTIONS = [
  { value: "", label: "All plans" },
  { value: "Basic", label: "Basic" },
  { value: "Professional", label: "Professional" },
  { value: "Enterprise", label: "Enterprise" },
];

const selectClassName = NATIVE_SELECT_CLASSNAME;

const SchoolsFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  plan,
  onPlanChange,
}) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <SearchInput
      value={search}
      onChange={onSearchChange}
      placeholder="Search by school name or code…"
      className="sm:max-w-xs"
    />
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      className={selectClassName}
      aria-label="Filter by status"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <select
      value={plan}
      onChange={(e) => onPlanChange(e.target.value)}
      className={selectClassName}
      aria-label="Filter by subscription plan"
    >
      {PLAN_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SchoolsFilters;
