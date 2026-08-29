import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card } from "../../../components/ui/cards/Card";
import Btn from "../../../components/ui/Btn";
import Badge from "../../../components/ui/Badge";
import Icon from "../../../components/icons/Icon.jsx";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import {
  groupPermissionsByResource,
  getPermissionSource,
  PERMISSION_SOURCE,
} from "../../../lib/authorization";
import { ROUTES, buildPath } from "../../../constants/route";
import { setSchoolAdminPermissionOverrides } from "../data/schoolAdminPermissionOverrides";
import { useUpdateSchoolAdminPermissions } from "../hooks/useUpdateSchoolAdminPermissions";

const PERMISSION_GROUPS = groupPermissionsByResource();

const SOURCE_BADGE = {
  [PERMISSION_SOURCE.ROLE]: { label: "Role-derived", tone: "brand" },
  [PERMISSION_SOURCE.GRANTED]: { label: "Granted", tone: "success" },
  [PERMISSION_SOURCE.DENIED]: { label: "Denied", tone: "danger" },
  [PERMISSION_SOURCE.NONE]: { label: "Not granted", tone: "neutral" },
};

function sameMembers(a, b) {
  if (a.length !== b.length) return false;
  const setB = new Set(b);
  return a.every((value) => setB.has(value));
}

const PermissionRow = ({ permission, role, overrideState, onChange }) => {
  const effectiveSource = getPermissionSource(role, permission.value, {
    grantedPermissions: overrideState.granted,
    deniedPermissions: overrideState.denied,
  });
  const badge = SOURCE_BADGE[effectiveSource];
  const isRoleGranted =
    getPermissionSource(role, permission.value, {
      grantedPermissions: [],
      deniedPermissions: [],
    }) === PERMISSION_SOURCE.ROLE;

  const isOverridden =
    overrideState.granted.includes(permission.value) ||
    overrideState.denied.includes(permission.value);

  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-text">{permission.label}</p>
        <p className="text-11 text-text-subtle">
          {isRoleGranted
            ? "Included in the School Admin role by default."
            : "Not part of the School Admin role by default."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={badge.tone}>{badge.label}</Badge>
        <div className="flex overflow-hidden rounded-lg border border-border">
          <Btn
            type="button"
            size="sm"
            variant={!isOverridden ? "primary" : "ghost"}
            className="rounded-none"
            disabled={!isOverridden}
            onClick={() => onChange(permission.value, "inherit")}
          >
            Inherit
          </Btn>
          <Btn
            type="button"
            size="sm"
            variant={
              effectiveSource === PERMISSION_SOURCE.GRANTED
                ? "success"
                : "ghost"
            }
            className="rounded-none border-x border-border"
            onClick={() => onChange(permission.value, "grant")}
          >
            Grant
          </Btn>
          <Btn
            type="button"
            size="sm"
            variant={
              effectiveSource === PERMISSION_SOURCE.DENIED ? "danger" : "ghost"
            }
            className="rounded-none"
            onClick={() => onChange(permission.value, "deny")}
          >
            Deny
          </Btn>
        </div>
      </div>
    </div>
  );
};

const SchoolAdminPermissionsForm = ({ admin, overrides }) => {
  const navigate = useNavigate();
  const updatePermissionsMutation = useUpdateSchoolAdminPermissions();

  const [granted, setGranted] = useState(() => [
    ...overrides.grantedPermissions,
  ]);
  const [denied, setDenied] = useState(() => [...overrides.deniedPermissions]);

  const isDirty = useMemo(
    () =>
      !sameMembers(granted, overrides.grantedPermissions) ||
      !sameMembers(denied, overrides.deniedPermissions),
    [granted, denied, overrides],
  );

  const detailsPath = buildPath(ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_DETAILS, {
    id: admin.id,
  });

  const handleChange = (permissionValue, action) => {
    if (action === "inherit") {
      setGranted((prev) => prev.filter((p) => p !== permissionValue));
      setDenied((prev) => prev.filter((p) => p !== permissionValue));
    } else if (action === "grant") {
      setGranted((prev) =>
        prev.includes(permissionValue) ? prev : [...prev, permissionValue],
      );
      setDenied((prev) => prev.filter((p) => p !== permissionValue));
    } else if (action === "deny") {
      setDenied((prev) =>
        prev.includes(permissionValue) ? prev : [...prev, permissionValue],
      );
      setGranted((prev) => prev.filter((p) => p !== permissionValue));
    }
  };

  const handleDiscard = () => {
    setGranted([...overrides.grantedPermissions]);
    setDenied([...overrides.deniedPermissions]);
  };

  const handleSave = () => {
    if (updatePermissionsMutation.isPending) return;

    const nextOverrides = {
      grantedPermissions: granted,
      deniedPermissions: denied,
    };

    updatePermissionsMutation.mutate(
      { adminId: admin.id, overrides: nextOverrides },
      {
        onSuccess: () => {
          setSchoolAdminPermissionOverrides(admin.id, nextOverrides);
        },
      },
    );
  };

  const overrideState = { granted, denied };

  return (
    <div className="space-y-6">
      {updatePermissionsMutation.isError && (
        <FormErrorBanner message={updatePermissionsMutation.error.message} />
      )}

      {PERMISSION_GROUPS.map((group) => (
        <Card key={group.key} className="p-5">
          <h3 className="mb-1 text-sm font-semibold text-text">
            {group.label}
          </h3>
          <div className="divide-y divide-border">
            {group.permissions.map((permission) => (
              <PermissionRow
                key={permission.value}
                permission={permission}
                role={admin.role}
                overrideState={overrideState}
                onChange={handleChange}
              />
            ))}
          </div>
        </Card>
      ))}

      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-6">
        {isDirty && (
          <span className="mr-auto flex items-center gap-1.5 text-xs text-text-muted">
            <Icon name="alertCircle" className="h-3.5 w-3.5" />
            You have unsaved permission changes.
          </span>
        )}
        <Btn
          type="button"
          variant="secondary"
          disabled={updatePermissionsMutation.isPending}
          onClick={() => navigate(detailsPath)}
        >
          Back to Details
        </Btn>
        <Btn
          type="button"
          variant="ghost"
          disabled={!isDirty || updatePermissionsMutation.isPending}
          onClick={handleDiscard}
        >
          Discard Changes
        </Btn>
        <Btn
          type="button"
          loading={updatePermissionsMutation.isPending}
          disabled={!isDirty || updatePermissionsMutation.isPending}
          onClick={handleSave}
        >
          Save Changes
        </Btn>
      </div>
    </div>
  );
};

export default SchoolAdminPermissionsForm;
