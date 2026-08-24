import SearchInput from "../../../components/inputs/SearchInput";
import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import { STATUS } from "../../../constants/status";
import { useSchoolAdminSchoolOptions } from "../hooks/useSchoolAdmins";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: STATUS.ACTIVE, label: "Active" },
  { value: STATUS.INACTIVE, label: "Inactive" },
];

const SchoolAdminsFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  schoolId,
  onSchoolIdChange,
}) => {
  const schoolOptions = useSchoolAdminSchoolOptions();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SearchInput
        value={search}
        onChange={onSearchChange}
        placeholder="Search by name, email, or school…"
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
      <select
        value={schoolId}
        onChange={(e) => onSchoolIdChange(e.target.value)}
        className={NATIVE_SELECT_CLASSNAME}
        aria-label="Filter by school"
      >
        <option value="">All schools</option>
        {schoolOptions.map((school) => (
          <option key={school.id} value={school.id}>
            {school.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SchoolAdminsFilters;
