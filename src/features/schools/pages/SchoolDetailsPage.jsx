import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";

import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Icon from "../../../components/icons/Icon.jsx";
import Badge from "../../../components/ui/Badge";
import EmptyState from "../../../components/feedback/EmptyState";
import ConfirmationDialog from "../../../components/dialogs/ConfirmationDialog";
import AssignSchoolAdminDialog from "../components/AssignSchoolAdminDialog";
import DashboardStatCard from "../../super-admin/components/dashboard/DashboardStatCard";
import SchoolDetailField from "../components/SchoolDetailField";
import { useSchool } from "../hooks/useSchool";
import { useActivateSchool } from "../hooks/useActivateSchool";
import { useDeactivateSchool } from "../hooks/useDeactivateSchool";
import { useSuspendSchool } from "../hooks/useSuspendSchool";
import { useAssignSchoolAdmin } from "../hooks/useAssignSchoolAdmin";
import { useRemoveSchoolAdmin } from "../hooks/useRemoveSchoolAdmin";
import { STATUS } from "../../../constants/status";
import { ROUTES, buildPath } from "../../../constants/route";

const SchoolDetailsPage = () => {
  const { id: schoolId } = useParams();
  const navigate = useNavigate();
  const { data: school } = useSchool(schoolId);
  const [statusOverride, setStatusOverride] = useState(null);
  const [assignedAdminOverride, setAssignedAdminOverride] = useState();
  const [pendingAction, setPendingAction] = useState(null);
  const [isAssignPickerOpen, setIsAssignPickerOpen] = useState(false);
  const [adminToAssign, setAdminToAssign] = useState(null);
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);

  const activateSchoolMutation = useActivateSchool();
  const deactivateSchoolMutation = useDeactivateSchool();
  const suspendSchoolMutation = useSuspendSchool();
  const assignSchoolAdminMutation = useAssignSchoolAdmin();
  const removeSchoolAdminMutation = useRemoveSchoolAdmin();

  if (!school) {
    return (
      <div>
        <PageHeader
          title="School not found"
          subtitle="This school doesn't exist or may have been removed."
        />
        <Card className="p-8">
          <EmptyState
            title="No matching school"
            description={`No school was found for "${schoolId}".`}
            action={
              <Btn onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOLS)}>
                Back to Schools
              </Btn>
            }
          />
        </Card>
      </div>
    );
  }

  const effectiveStatus = statusOverride ?? school.status;
  const effectiveAdmin =
    assignedAdminOverride !== undefined
      ? assignedAdminOverride
      : school.schoolAdmin;
  const isLifecycleMutating =
    activateSchoolMutation.isPending ||
    deactivateSchoolMutation.isPending ||
    suspendSchoolMutation.isPending;

  const handleSelectAdminToAssign = (admin) => {
    setIsAssignPickerOpen(false);
    setAdminToAssign(admin);
  };

  const handleConfirmAssignment = () => {
    assignSchoolAdminMutation.mutate(
      { schoolId: school.id, schoolAdminId: adminToAssign.id },
      {
        onSuccess: () => {
          setAssignedAdminOverride({
            fullName: adminToAssign.fullName,
            email: adminToAssign.email,
            phone: adminToAssign.phone,
          });
          setAdminToAssign(null);
        },
      },
    );
  };

  const handleConfirmRemoval = () => {
    removeSchoolAdminMutation.mutate(school.id, {
      onSuccess: () => {
        setAssignedAdminOverride(null);
        setIsRemoveConfirmOpen(false);
      },
    });
  };

  const handleConfirmLifecycle = () => {
    if (pendingAction === "activate") {
      activateSchoolMutation.mutate(school.id, {
        onSuccess: () => {
          setStatusOverride(STATUS.ACTIVE);
          setPendingAction(null);
        },
      });
    } else if (pendingAction === "deactivate") {
      deactivateSchoolMutation.mutate(school.id, {
        onSuccess: () => {
          setStatusOverride(STATUS.INACTIVE);
          setPendingAction(null);
        },
      });
    } else if (pendingAction === "suspend") {
      suspendSchoolMutation.mutate(school.id, {
        onSuccess: () => {
          setStatusOverride(STATUS.SUSPENDED);
          setPendingAction(null);
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={school.name}
        subtitle={school.code}
        actions={
          <div className="flex flex-wrap gap-2">
            <Btn
              variant="secondary"
              onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOLS)}
            >
              Back to Schools
            </Btn>
            <Btn asChild>
              <Link
                to={buildPath(ROUTES.SUPER_ADMIN.SCHOOL_EDIT, {
                  id: school.id,
                })}
              >
                Edit School
              </Link>
            </Btn>
            {effectiveStatus === STATUS.ACTIVE && (
              <Btn
                variant="danger"
                onClick={() => setPendingAction("deactivate")}
              >
                Deactivate
              </Btn>
            )}
            {effectiveStatus === STATUS.INACTIVE && (
              <Btn
                variant="success"
                onClick={() => setPendingAction("activate")}
              >
                Activate
              </Btn>
            )}
            {effectiveStatus !== STATUS.SUSPENDED && (
              <Btn variant="danger" onClick={() => setPendingAction("suspend")}>
                Suspend
              </Btn>
            )}
          </div>
        }
      />

      <ConfirmationDialog
        open={pendingAction !== null}
        onClose={() => setPendingAction(null)}
        onConfirm={handleConfirmLifecycle}
        isLoading={isLifecycleMutating}
        title={
          pendingAction === "activate"
            ? "Activate school?"
            : pendingAction === "deactivate"
              ? "Deactivate school?"
              : "Suspend school?"
        }
        description={
          pendingAction === "activate"
            ? "The school will become active and available according to the platform's active-state rules."
            : pendingAction === "deactivate"
              ? "The school will become inactive."
              : "The school will be suspended. Suspension is a distinct platform status from deactivation — it directly changes the school's platform status, separately from the Active/Inactive state."
        }
        confirmLabel={
          pendingAction === "activate"
            ? "Activate"
            : pendingAction === "deactivate"
              ? "Deactivate"
              : "Suspend"
        }
        confirmVariant={pendingAction === "activate" ? "success" : "danger"}
      />

      <AssignSchoolAdminDialog
        open={isAssignPickerOpen}
        onClose={() => setIsAssignPickerOpen(false)}
        onSelect={handleSelectAdminToAssign}
      />

      <ConfirmationDialog
        open={adminToAssign !== null}
        onClose={() => setAdminToAssign(null)}
        onConfirm={handleConfirmAssignment}
        isLoading={assignSchoolAdminMutation.isPending}
        title="Assign School Admin?"
        description={
          adminToAssign
            ? adminToAssign.school.id !== school.id
              ? `${adminToAssign.fullName} will be assigned to ${school.name}. They are currently assigned to ${adminToAssign.school.name} — completing this will remove them from that school.`
              : `${adminToAssign.fullName} will be assigned to ${school.name}.`
            : ""
        }
        confirmLabel="Assign"
        confirmVariant="primary"
      />

      <ConfirmationDialog
        open={isRemoveConfirmOpen}
        onClose={() => setIsRemoveConfirmOpen(false)}
        onConfirm={handleConfirmRemoval}
        isLoading={removeSchoolAdminMutation.isPending}
        title="Remove School Admin?"
        description={
          effectiveAdmin
            ? `${effectiveAdmin.fullName} will be removed as the School Admin for ${school.name}. This only removes the assignment — their account will not be deleted and remains available to assign elsewhere. ${school.name} will have no School Admin until a new one is assigned.`
            : ""
        }
        confirmLabel="Remove"
        confirmVariant="danger"
      />

      {/* Identity summary */}
      <Card className="flex flex-wrap items-center gap-4 p-6">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-muted">
          <Icon name="school" className="h-7 w-7 text-text-subtle" />
        </div>
        <div>
          <p className="text-lg font-semibold text-text">{school.name}</p>
          <p className="text-sm text-text-muted">{school.code}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge>{effectiveStatus}</Badge>
            <Badge>{school.subscriptionStatus}</Badge>
          </div>
        </div>
      </Card>

      {/* School Information */}
      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-text">
          School Information
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField label="School Name" value={school.name} />
          <SchoolDetailField label="School Code" value={school.code} />
          <SchoolDetailField label="School Type" value={school.schoolType} />
          <SchoolDetailField
            label="School Category"
            value={school.schoolCategory}
          />
          <SchoolDetailField label="School Email" value={school.email} />
          <SchoolDetailField label="Phone Number" value={school.phone} />
        </div>
      </Card>

      {/* Location */}
      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-text">Location</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField label="Country" value={school.country} />
          <SchoolDetailField label="State / Region" value={school.state} />
          <SchoolDetailField label="City" value={school.city} />
          <SchoolDetailField
            label="Address"
            value={school.address}
            className="sm:col-span-2 lg:col-span-3"
          />
        </div>
      </Card>

      {/* Administration */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-text">Administration</h2>
          {effectiveAdmin && (
            <Btn
              variant="danger"
              size="sm"
              onClick={() => setIsRemoveConfirmOpen(true)}
            >
              Remove
            </Btn>
          )}
        </div>
        {effectiveAdmin ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <SchoolDetailField
              label="Full Name"
              value={effectiveAdmin.fullName}
            />
            <SchoolDetailField label="Email" value={effectiveAdmin.email} />
            <SchoolDetailField label="Phone" value={effectiveAdmin.phone} />
          </div>
        ) : (
          <EmptyState
            title="No School Admin assigned"
            description="This school doesn't have a School Admin yet."
            action={
              <Btn onClick={() => setIsAssignPickerOpen(true)}>
                Assign School Admin
              </Btn>
            }
          />
        )}
      </Card>

      {/* Subscription & Status */}
      <Card className="p-6">
        <h2 className="mb-4 text-base font-semibold text-text">
          Subscription &amp; Status
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SchoolDetailField
            label="Status"
            value={<Badge>{effectiveStatus}</Badge>}
          />
          <SchoolDetailField
            label="Subscription Plan"
            value={school.subscriptionPlan}
          />
          <SchoolDetailField
            label="Subscription Status"
            value={<Badge>{school.subscriptionStatus}</Badge>}
          />
          <SchoolDetailField
            label="Date Registered"
            value={format(new Date(school.createdAt), "d MMM yyyy")}
          />
        </div>
      </Card>

      {/* Usage Metrics */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-text">
          Usage Metrics
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DashboardStatCard
            title="Students"
            value={school.studentsCount.toLocaleString()}
            icon="graduationCap"
            tone="brand"
          />
          <DashboardStatCard
            title="Teachers"
            value={school.teachersCount.toLocaleString()}
            icon="userCheck"
            tone="brand"
          />
        </div>
      </div>
    </div>
  );
};

export default SchoolDetailsPage;
