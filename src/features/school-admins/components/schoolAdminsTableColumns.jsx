import { Link } from "react-router-dom";
import { format } from "date-fns";
import Badge from "../../../components/ui/Badge";
import { ROUTES, buildPath } from "../../../constants/route";

export const schoolAdminsTableColumns = [
  {
    key: "fullName",
    header: "School Admin",
    render: (admin) => (
      <Link
        to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_DETAILS, {
          id: admin.id,
        })}
        className="font-medium text-brand-700 hover:underline"
      >
        {admin.fullName}
      </Link>
    ),
  },
  {
    key: "email",
    header: "Email",
    render: (admin) => admin.email,
  },
  {
    key: "phone",
    header: "Phone",
    render: (admin) => admin.phone,
  },
  {
    key: "school",
    header: "School",
    render: (admin) => (
      <div>
        <p className="text-text">{admin.school.name}</p>
        <p className="text-xs text-text-subtle">{admin.school.code}</p>
      </div>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (admin) => <Badge>{admin.status}</Badge>,
  },
  {
    key: "createdAt",
    header: "Date Assigned",
    render: (admin) => format(new Date(admin.createdAt), "d MMM yyyy"),
  },
];

export default schoolAdminsTableColumns;
