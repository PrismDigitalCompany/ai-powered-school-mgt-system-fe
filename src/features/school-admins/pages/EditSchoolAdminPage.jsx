import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";
import SchoolDetailField from "../../schools/components/SchoolDetailField";
import EditSchoolAdminForm from "../components/EditSchoolAdminForm";
import { useSchoolAdmin } from "../hooks/useSchoolAdmin";
import { ROUTES, buildPath } from "../../../constants/route";


const EditSchoolAdminPage = () => {
  const { id: adminId } = useParams();
  const navigate = useNavigate();
  const { data: admin } = useSchoolAdmin(adminId);

  if (!admin) {
    return (
      <div>
        <PageHeader
          title="School Administrator not found"
          subtitle="This School Administrator doesn't exist or may have been removed."
        />
        <Card className="p-8">
          <EmptyState
            title="No matching School Administrator"
            description={`No School Administrator was found for "${adminId}".`}
            action={
              <Btn onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOL_ADMINS)}>
                Back to School Administrators
              </Btn>
            }
          />
        </Card>
      </div>
    );
  }

  const detailsPath = buildPath(ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_DETAILS, {
    id: admin.id,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Edit ${admin.fullName}`}
        subtitle="Update this School Administrator's profile and contact information."
        actions={
          <Btn variant="secondary" onClick={() => navigate(detailsPath)}>
            Back to Details
          </Btn>
        }
      />

      <Card className="p-6">
        <h2 className="mb-1 text-base font-semibold text-text">
          Not editable here
        </h2>
        <p className="mb-4 text-sm text-text-muted">
          Account status, school assignment and sign-in credentials are managed
          through separate workflows — activate/deactivate from the details
          page, assignment from the school&apos;s page, and the password through
          Reset Password. Nothing on this form changes any of them.
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField
            label="Status"
            value={<Badge>{admin.status}</Badge>}
          />
          <SchoolDetailField
            label="Assigned School"
            value={
              <Link
                to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_DETAILS, {
                  id: admin.school.id,
                })}
                className="text-brand-700 hover:underline"
              >
                {admin.school.name} ({admin.school.code})
              </Link>
            }
          />
          <SchoolDetailField label="Password" value="Managed separately" />
          <SchoolDetailField
            label="Date Assigned"
            value={format(new Date(admin.createdAt), "d MMM yyyy")}
          />
        </div>
      </Card>

      <Card className="p-6">
        <EditSchoolAdminForm admin={admin} />
      </Card>
    </div>
  );
};

export default EditSchoolAdminPage;
