import { format } from "date-fns";
import { Link } from "react-router-dom";
import Badge from "../../../components/ui/Badge";
import Icon from "../../../components/icons/Icon.jsx";
import Can from "../../../components/authorization/Can";
import { PERMISSIONS } from "../../../constants/permission";
import { ROUTES, buildPath } from "../../../constants/route";

export const schoolsTableColumns = [
  {
    key: "name",
    header: "School",
    render: (school) => (
      <div>
        <p className="font-medium text-text">{school.name}</p>
        <p className="text-xs text-text-subtle">{school.code}</p>
      </div>
    ),
  },
  {
    key: "contact",
    header: "Contact",
    render: (school) => (
      <div>
        <p className="text-text">{school.email}</p>
        <p className="text-xs text-text-subtle">{school.phone}</p>
      </div>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (school) => (
      <div>
        <p className="text-text">
          {school.city}, {school.state}
        </p>
        <p className="max-w-[16rem] truncate text-xs text-text-subtle">
          {school.address}
        </p>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (school) => <Badge>{school.status}</Badge>,
  },
  {
    key: "createdAt",
    header: "Date Registered",
    render: (school) => format(new Date(school.createdAt), "d MMM yyyy"),
  },
  {
    key: "subscription",
    header: "Subscription",
    render: (school) => (
      <div className="space-y-1">
        <p className="text-text">{school.subscriptionPlan}</p>
        <Badge>{school.subscriptionStatus}</Badge>
      </div>
    ),
  },
  {
    key: "usage",
    header: "Students / Teachers",
    render: (school) => (
      <div>
        <p className="text-text">
          {school.studentsCount.toLocaleString()} students
        </p>
        <p className="text-xs text-text-subtle">
          {school.teachersCount.toLocaleString()} teachers
        </p>
      </div>
    ),
  },
  {
    key: "schoolAdmin",
    header: "School Admin",
    render: (school) =>
      school.schoolAdmin?.fullName ?? (
        <span className="text-text-subtle">Not assigned</span>
      ),
  },
  {
    key: "actions",
    header: "",
    className: "text-right",
    render: (school) => (
      <Can permission={PERMISSIONS.SCHOOLS_EDIT}>
        <Link
          to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_EDIT, { id: school.id })}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-text-subtle hover:bg-surface-muted hover:text-text"
          aria-label={`Edit ${school.name}`}
        >
          <Icon name="moreHorizontal" className="h-4 w-4" />
        </Link>
      </Can>
    ),
  },
];

export default schoolsTableColumns;
