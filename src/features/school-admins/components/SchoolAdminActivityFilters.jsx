import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import {
  ACTIVITY_EVENT_CATALOG,
  ACTIVITY_RESULT,
} from "../data/schoolAdminActivity";

const TYPE_OPTIONS = [
  { value: "", label: "All event types" },
  ...Object.entries(ACTIVITY_EVENT_CATALOG).map(([value, { label }]) => ({
    value,
    label,
  })),
];

const RESULT_OPTIONS = [
  { value: "", label: "All results" },
  { value: ACTIVITY_RESULT.SUCCESS, label: "Successful" },
  { value: ACTIVITY_RESULT.FAILED, label: "Failed" },
];

const SchoolAdminActivityFilters = ({
  eventType,
  onEventTypeChange,
  result,
  onResultChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}) => (
  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
    <select
      value={eventType}
      onChange={(e) => onEventTypeChange(e.target.value)}
      className={NATIVE_SELECT_CLASSNAME}
      aria-label="Filter by event type"
    >
      {TYPE_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <select
      value={result}
      onChange={(e) => onResultChange(e.target.value)}
      className={NATIVE_SELECT_CLASSNAME}
      aria-label="Filter by result"
    >
      {RESULT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    <div className="flex items-center gap-2">
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => onDateFromChange(e.target.value)}
        className={NATIVE_SELECT_CLASSNAME}
        aria-label="From date"
      />
      <span className="text-sm text-text-subtle">to</span>
      <input
        type="date"
        value={dateTo}
        onChange={(e) => onDateToChange(e.target.value)}
        className={NATIVE_SELECT_CLASSNAME}
        aria-label="To date"
      />
    </div>
  </div>
);

export default SchoolAdminActivityFilters;
