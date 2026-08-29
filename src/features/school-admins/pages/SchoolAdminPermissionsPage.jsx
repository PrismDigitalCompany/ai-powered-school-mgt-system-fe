import { useParams, useNavigate } from "react-router-dom";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";
import SchoolAdminPermissionsForm from "../components/SchoolAdminPermissionsForm";
import { useSchoolAdmin } from "../hooks/useSchoolAdmin";
import { useSchoolAdminPermissionOverrides } from "../data/schoolAdminPermissionOverrides";
import { ROUTES } from "../../../constants/route";

const SchoolAdminPermissionsPage = () => {
  const { id: adminId } = useParams();
  const navigate = useNavigate();
  const { data: admin } = useSchoolAdmin(adminId);
  const overrides = useSchoolAdminPermissionOverrides(adminId);

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

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${admin.fullName}'s Permissions`}
        subtitle="Grant or deny permissions for this School Admin, on top of their role."
      />

      <Card className="p-6">
        <h2 className="mb-1 text-base font-semibold text-text">Role</h2>
        <p className="mb-3 text-sm text-text-muted">
          This School Admin&apos;s role is fixed. Permissions below are
          overrides layered on top of it — role management, account status,
          password, and school assignment are handled through their own separate
          workflows, not here.
        </p>
        <Badge tone="brand">{admin.role}</Badge>
      </Card>

      <SchoolAdminPermissionsForm
        key={admin.id}
        admin={admin}
        overrides={overrides}
      />
    </div>
  );
};

export default SchoolAdminPermissionsPage;
