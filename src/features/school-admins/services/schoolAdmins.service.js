import { apiClient } from "../../../services/apiClient";
import { SCHOOL_PERMISSIONS } from "../../../constants/permission";

const BASE_URL = "/school-admins";

function normalizeCreateSchoolAdminResponse(raw) {
  return raw ?? null;
}

/**
 * Assumed request:  PATCH /school-admins/:adminId
 *   { firstName, lastName, email, phone }
 *
 * Only the editable profile/contact fields are sent. Password, password
 * hash, reset token, authentication token, school assignment, account
 * status and permissions are never part of this request — each is owned
 * by its own workflow and endpoint.
 */
const UPDATABLE_SCHOOL_ADMIN_FIELDS = Object.freeze([
  "firstName",
  "lastName",
  "email",
  "phone",
]);

function pickUpdatableSchoolAdminFields(payload = {}) {
  return UPDATABLE_SCHOOL_ADMIN_FIELDS.reduce((allowed, field) => {
    if (payload[field] !== undefined) {
      allowed[field] = payload[field];
    }
    return allowed;
  }, {});
}

function normalizeUpdateSchoolAdminResponse(raw) {
  return raw ?? null;
}

/**
 * Assumed request:  PUT /school-admins/:adminId/permissions
 *   { grantedPermissions: string[], deniedPermissions: string[] }
 *
 * The two arrays are this School Admin's explicit overrides ON TOP OF
 * their SCHOOL_ADMIN role baseline — never the role's own permission
 * list, never another admin's. Every value is required to be one of the
 * real, centrally-defined SCHOOL_PERMISSIONS; a permission can never sit
 * in both arrays at once (deny wins if it does).
 */
function sanitizePermissionOverrides({
  grantedPermissions = [],
  deniedPermissions = [],
} = {}) {
  const allowed = new Set(SCHOOL_PERMISSIONS);
  const denied = new Set(deniedPermissions.filter((p) => allowed.has(p)));
  const granted = new Set(
    grantedPermissions.filter((p) => allowed.has(p) && !denied.has(p)),
  );
  return {
    grantedPermissions: Array.from(granted),
    deniedPermissions: Array.from(denied),
  };
}

function normalizeUpdateSchoolAdminPermissionsResponse(raw) {
  return raw ?? null;
}

function normalizeResetSchoolAdminPasswordResponse(raw) {
  return raw ?? null;
}

function normalizeSchoolAdminLifecycleResponse(raw) {
  return raw ?? null;
}

function normalizeSchoolAdminActivityResponse(raw) {
  return Array.isArray(raw) ? raw : [];
}

export const schoolAdminsService = {
  createSchoolAdmin: async ({
    confirmPassword: _confirmPassword,
    ...payload
  }) => {
    const response = await apiClient.post(BASE_URL, payload);
    return normalizeCreateSchoolAdminResponse(response.data);
  },

  updateSchoolAdmin: async (adminId, payload) => {
    const response = await apiClient.patch(
      `${BASE_URL}/${adminId}`,
      pickUpdatableSchoolAdminFields(payload),
    );
    return normalizeUpdateSchoolAdminResponse(response.data);
  },

  updateSchoolAdminPermissions: async (adminId, overrides) => {
    const response = await apiClient.put(
      `${BASE_URL}/${adminId}/permissions`,
      sanitizePermissionOverrides(overrides),
    );
    return normalizeUpdateSchoolAdminPermissionsResponse(response.data);
  },

  resetSchoolAdminPassword: async (adminId, password) => {
    const response = await apiClient.post(
      `${BASE_URL}/${adminId}/reset-password`,
      { password },
    );
    return normalizeResetSchoolAdminPasswordResponse(response.data);
  },

  activateSchoolAdmin: async (adminId) => {
    const response = await apiClient.post(`${BASE_URL}/${adminId}/activate`);
    return normalizeSchoolAdminLifecycleResponse(response.data);
  },

  deactivateSchoolAdmin: async (adminId) => {
    const response = await apiClient.post(`${BASE_URL}/${adminId}/deactivate`);
    return normalizeSchoolAdminLifecycleResponse(response.data);
  },

  getSchoolAdminActivity: async (adminId) => {
    const response = await apiClient.get(`${BASE_URL}/${adminId}/activity`);
    return normalizeSchoolAdminActivityResponse(response.data);
  },
};

export default schoolAdminsService;
