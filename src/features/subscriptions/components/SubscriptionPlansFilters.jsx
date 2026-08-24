import SearchInput from "../../../components/inputs/SearchInput";
import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import { STATUS } from "../../../constants/status";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: STATUS.ACTIVE, label: "Active" },
  { value: STATUS.INACTIVE, label: "Inactive" },
];

const SubscriptionPlansFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
}) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
    <SearchInput
      value={search}
      onChange={onSearchChange}
      placeholder="Search by plan name…"
      className="sm:max-w-xs"
    />
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      className={NATIVE_SELECT_CLASSNAME}
      aria-label="Filter by status"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SubscriptionPlansFilters;
