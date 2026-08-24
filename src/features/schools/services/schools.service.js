import { apiClient } from "../../../services/apiClient";

const BASE_URL = "/schools";

/**
 * SCHOOLS SERVICE — the one API boundary for school creation and
 * updates. No backend exists yet; nothing here is a confirmed contract.
 *
 * Assumed request (create):  POST /schools  { name, code, schoolType,
 *   schoolCategory, email, phone, country, state, city, address,
 *   adminFirstName, adminLastName, adminEmail, adminPhone, password }
 * Assumed request (update):  PATCH /schools/:schoolId  { name, code,
 *   schoolType, schoolCategory, email, phone, country, state, city,
 *   address } — only the editable profile fields (see
 *   schemas/edit-school.schema.js); status, subscription, usage
 *   counts, and the School Admin account are never sent here, since
 *   this form can't edit them.
 * Assumed response: not relied upon structurally for either — both
 *   normalize functions pass the response through as opaque data.
 *   Nothing here assumes specific fields exist, since no shape is
 *   confirmed.
 *
 * LOGO — deliberately excluded from both requests. apiClient is a plain
 * JSON client (Content-Type: application/json, see services/apiClient.js)
 * with no multipart setup, and building one now would mean inventing an
 * upload contract nobody has confirmed. Simpler to leave the logo
 * local-preview-only (see SchoolIdentitySection) until a real
 * file-upload contract exists than to half-build multipart support for
 * an endpoint that doesn't exist yet. Note this also means an update
 * request never has an opportunity to clear or replace a persisted
 * logo — there's no persisted logo field on the school record at all
 * yet, so nothing is at risk of being silently deleted; that becomes a
 * real design question once logo storage actually exists.
 */
function normalizeCreateSchoolResponse(raw) {
  return raw ?? null;
}

function normalizeUpdateSchoolResponse(raw) {
  return raw ?? null;
}

/**
 * Assumed requests (lifecycle):  POST /schools/:schoolId/activate  and
 *   POST /schools/:schoolId/deactivate — no request body, the action is
 *   the endpoint itself. Suspend is a deliberately separate, distinct
 *   operation with its own (also unconfirmed) endpoint below, not
 *   merged into activate/deactivate.
 * Assumed response: not relied upon — same reasoning as create/update.
 */
function normalizeLifecycleResponse(raw) {
  return raw ?? null;
}

/**
 * Assumed request:  POST /schools/:schoolId/school-admin
 *   { schoolAdminId } — associates an EXISTING School Admin account
 *   with a school. Does not create a new admin account (see
 *   features/school-admins/services/schoolAdmins.service.js for that).
 *   Placed here rather than in schoolAdmins.service.js because the
 *   conceptual endpoint modifies a school sub-resource, not an admin
 *   one — matching the REST shape this is assumed to take.
 * Assumed response: not relied upon — same reasoning as the other
 *   methods here.
 */
function normalizeAssignSchoolAdminResponse(raw) {
  return raw ?? null;
}

/**
 * Assumed request:  DELETE /schools/:schoolId/school-admin — removes
 *   the School → School Admin relationship only. This does NOT delete
 *   the School Admin account, does not touch their password, status, or
 *   permissions, and does not remove them from the platform's user
 *   system — the account remains available to assign elsewhere. That
 *   distinction (unassign vs. delete-the-account) is why this method is
 *   named removeSchoolAdmin, not deleteSchoolAdmin.
 * Assumed response: not relied upon — same reasoning as the other
 *   methods here.
 */
function normalizeRemoveSchoolAdminResponse(raw) {
  return raw ?? null;
}

export const schoolsService = {
  createSchool: async ({ logo: _logo, ...payload }) => {
    const response = await apiClient.post(BASE_URL, payload);
    return normalizeCreateSchoolResponse(response.data);
  },

  updateSchool: async (schoolId, { logo: _logo, ...payload }) => {
    const response = await apiClient.patch(`${BASE_URL}/${schoolId}`, payload);
    return normalizeUpdateSchoolResponse(response.data);
  },

  activateSchool: async (schoolId) => {
    const response = await apiClient.post(`${BASE_URL}/${schoolId}/activate`);
    return normalizeLifecycleResponse(response.data);
  },

  deactivateSchool: async (schoolId) => {
    const response = await apiClient.post(`${BASE_URL}/${schoolId}/deactivate`);
    return normalizeLifecycleResponse(response.data);
  },

  suspendSchool: async (schoolId) => {
    const response = await apiClient.post(`${BASE_URL}/${schoolId}/suspend`);
    return normalizeLifecycleResponse(response.data);
  },

  assignSchoolAdmin: async (schoolId, schoolAdminId) => {
    const response = await apiClient.post(
      `${BASE_URL}/${schoolId}/school-admin`,
      { schoolAdminId },
    );
    return normalizeAssignSchoolAdminResponse(response.data);
  },

  removeSchoolAdmin: async (schoolId) => {
    const response = await apiClient.delete(
      `${BASE_URL}/${schoolId}/school-admin`,
    );
    return normalizeRemoveSchoolAdminResponse(response.data);
  },
};

export default schoolsService;
