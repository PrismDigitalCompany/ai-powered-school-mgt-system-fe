import { apiClient } from "../../../services/apiClient";

const BASE_URL = "/schools";

function normalizeCreateSchoolResponse(raw) {
  return raw ?? null;
}

function normalizeUpdateSchoolResponse(raw) {
  return raw ?? null;
}

function normalizeLifecycleResponse(raw) {
  return raw ?? null;
}

function normalizeAssignSchoolAdminResponse(raw) {
  return raw ?? null;
}

function normalizeRemoveSchoolAdminResponse(raw) {
  return raw ?? null;
}

function normalizeAssignSubscriptionPlanResponse(raw) {
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

  assignSubscriptionPlan: async (schoolId, planId) => {
    const response = await apiClient.post(
      `${BASE_URL}/${schoolId}/subscription-plan`,
      { planId },
    );
    return normalizeAssignSubscriptionPlanResponse(response.data);
  },
};

export default schoolsService;
