import { useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { format } from "date-fns";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Icon from "../../../components/icons/Icon.jsx";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import ResetPasswordFormDialog from "../components/ResetPasswordFormDialog";
import SchoolDetailField from "../../schools/components/SchoolDetailField";
import { useSchoolAdmin } from "../hooks/useSchoolAdmin";
import { useResetSchoolAdminPassword } from "../hooks/useResetSchoolAdminPassword";
import { useActivateSchoolAdmin } from "../hooks/useActivateSchoolAdmin";
import { useDeactivateSchoolAdmin } from "../hooks/useDeactivateSchoolAdmin";
import { joinFullName } from "../utils/adminName";
import { STATUS } from "../../../constants/status";
import { ROUTES, buildPath } from "../../../constants/route";

const SchoolAdminDetailsPage = () => {
  const { id: adminId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: admin } = useSchoolAdmin(adminId);

  const [profileOverride] = useState(
    () => location.state?.updatedSchoolAdminProfile ?? null,
  );
  const [isResetFormOpen, setIsResetFormOpen] = useState(false);
  const [pendingPassword, setPendingPassword] = useState(null);
  const [statusOverride, setStatusOverride] = useState(null);
  const [pendingLifecycleAction, setPendingLifecycleAction] = useState(null);
  const resetPasswordMutation = useResetSchoolAdminPassword();
  const activateSchoolAdminMutation = useActivateSchoolAdmin();
  const deactivateSchoolAdminMutation = useDeactivateSchoolAdmin();

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

  const effectiveStatus = statusOverride ?? admin.status;
  const effectiveFullName = profileOverride
    ? joinFullName(profileOverride)
    : admin.fullName;
  const effectiveEmail = profileOverride?.email ?? admin.email;
  const effectivePhone = profileOverride?.phone ?? admin.phone;

  return (
    <div className="space-y-6">
      <PageHeader
        title={effectiveFullName}
        subtitle={admin.school.name}
        actions={
          <div className="flex flex-wrap gap-2">
            <Btn
              variant="secondary"
              onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOL_ADMINS)}
            >
              Back to School Administrators
            </Btn>
            <Btn asChild>
              <Link
                to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_EDIT, {
                  id: admin.id,
                })}
              >
                Edit Admin
              </Link>
            </Btn>
            <Btn asChild variant="secondary">
              <Link
                to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_PERMISSIONS, {
                  id: admin.id,
                })}
              >
                Manage Permissions
              </Link>
            </Btn>
            <Btn asChild variant="secondary">
              <Link
                to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_ACTIVITY, {
                  id: admin.id,
                })}
              >
                View Activity
              </Link>
            </Btn>
            <Btn variant="danger" onClick={() => setIsResetFormOpen(true)}>
              Reset Password
            </Btn>
            {effectiveStatus === STATUS.ACTIVE && (
              <Btn
                variant="danger"
                onClick={() => setPendingLifecycleAction("deactivate")}
              >
                Deactivate
              </Btn>
            )}
            {effectiveStatus === STATUS.INACTIVE && (
              <Btn
                variant="success"
                onClick={() => setPendingLifecycleAction("activate")}
              >
                Activate
              </Btn>
            )}
          </div>
        }
      />

      <ConfirmationDialog
        open={pendingLifecycleAction !== null}
        onClose={() => setPendingLifecycleAction(null)}
        onConfirm={() => {
          if (pendingLifecycleAction === "activate") {
            activateSchoolAdminMutation.mutate(admin.id, {
              onSuccess: () => {
                setStatusOverride(STATUS.ACTIVE);
                setPendingLifecycleAction(null);
              },
            });
          } else if (pendingLifecycleAction === "deactivate") {
            deactivateSchoolAdminMutation.mutate(admin.id, {
              onSuccess: () => {
                setStatusOverride(STATUS.INACTIVE);
                setPendingLifecycleAction(null);
              },
            });
          }
        }}
        isLoading={
          activateSchoolAdminMutation.isPending ||
          deactivateSchoolAdminMutation.isPending
        }
        title={
          pendingLifecycleAction === "activate"
            ? "Activate School Admin account?"
            : "Deactivate School Admin account?"
        }
        description={
          pendingLifecycleAction === "activate"
            ? `${effectiveFullName}'s account will become active. This does not change their school assignment, contact information, or password.`
            : `${effectiveFullName}'s account will become inactive and may no longer be able to authenticate according to the platform's rules. This does not remove them from ${admin.school.name} — the assignment is unchanged.`
        }
        confirmLabel={
          pendingLifecycleAction === "activate" ? "Activate" : "Deactivate"
        }
        confirmVariant={
          pendingLifecycleAction === "activate" ? "success" : "danger"
        }
      />

      <ResetPasswordFormDialog
        open={isResetFormOpen}
        onClose={() => setIsResetFormOpen(false)}
        onValidated={(password) => {
          setIsResetFormOpen(false);
          setPendingPassword(password);
        }}
      />

      <ConfirmationDialog
        open={pendingPassword !== null}
        onClose={() => setPendingPassword(null)}
        onConfirm={() => {
          resetPasswordMutation.mutate(
            { adminId: admin.id, password: pendingPassword },
            { onSuccess: () => setPendingPassword(null) },
          );
        }}
        isLoading={resetPasswordMutation.isPending}
        title="Reset Password?"
        description={`This will reset the password for ${effectiveFullName}. Their current password will no longer work.`}
        confirmLabel="Reset Password"
        confirmVariant="danger"
      />

      {/* Identity summary */}
      <Card className="flex flex-wrap items-center gap-4 p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted">
          <Icon name="userCircle" className="h-8 w-8 text-text-subtle" />
        </div>
        <div>
          <p className="text-lg font-semibold text-text">{effectiveFullName}</p>
          <p className="text-sm text-text-muted">{effectiveEmail}</p>
          <div className="mt-2">
            <Badge>{effectiveStatus}</Badge>
          </div>
        </div>
      </Card>

      {/* Details */}
      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-text">
          Administrator Information
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField label="Full Name" value={effectiveFullName} />
          <SchoolDetailField label="Email" value={effectiveEmail} />
          <SchoolDetailField label="Phone" value={effectivePhone} />
          <SchoolDetailField
            label="Status"
            value={<Badge>{effectiveStatus}</Badge>}
          />
          <SchoolDetailField
            label="Date Assigned"
            value={format(new Date(admin.createdAt), "d MMM yyyy")}
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
        </div>
      </Card>
    </div>
  );
};

export default SchoolAdminDetailsPage;
