import { apiClient } from "../../../services/apiClient";

const BASE_URL = "/subscriptions";

function normalizeSubscriptionPlansResponse(raw) {
  return Array.isArray(raw) ? raw : [];
}

function normalizeSubscriptionPlanResponse(raw) {
  return raw ?? null;
}

function normalizeCreateSubscriptionPlanResponse(raw) {
  return raw ?? null;
}

function normalizeUpdateSubscriptionPlanResponse(raw) {
  return raw ?? null;
}

function normalizeDeleteSubscriptionPlanResponse(raw) {
  return raw ?? null;
}

function normalizeSchoolSubscriptionsResponse(raw) {
  return Array.isArray(raw) ? raw : [];
}

function normalizeSchoolSubscriptionResponse(raw) {
  return raw ?? null;
}


function normalizeCreateSchoolSubscriptionResponse(raw) {
  return raw ?? null;
}

export const subscriptionsService = {
  getSubscriptionPlans: async () => {
    const response = await apiClient.get(`${BASE_URL}/plans`);
    return normalizeSubscriptionPlansResponse(response.data);
  },

  getSubscriptionPlan: async (planId) => {
    const response = await apiClient.get(`${BASE_URL}/plans/${planId}`);
    return normalizeSubscriptionPlanResponse(response.data);
  },

  createSubscriptionPlan: async (payload) => {
    const response = await apiClient.post(`${BASE_URL}/plans`, payload);
    return normalizeCreateSubscriptionPlanResponse(response.data);
  },

  updateSubscriptionPlan: async (planId, { id: _id, ...payload }) => {
    const response = await apiClient.patch(
      `${BASE_URL}/plans/${planId}`,
      payload,
    );
    return normalizeUpdateSubscriptionPlanResponse(response.data);
  },

  deleteSubscriptionPlan: async (planId) => {
    const response = await apiClient.delete(`${BASE_URL}/plans/${planId}`);
    return normalizeDeleteSubscriptionPlanResponse(response.data);
  },

  getSchoolSubscriptions: async () => {
    const response = await apiClient.get(`${BASE_URL}/schools`);
    return normalizeSchoolSubscriptionsResponse(response.data);
  },

  getSchoolSubscription: async (schoolId) => {
    const response = await apiClient.get(`${BASE_URL}/schools/${schoolId}`);
    return normalizeSchoolSubscriptionResponse(response.data);
  },

  createSchoolSubscription: async (schoolId, payload) => {
    const response = await apiClient.post(
      `${BASE_URL}/schools/${schoolId}`,
      payload,
    );
    return normalizeCreateSchoolSubscriptionResponse(response.data);
  },
};

export default subscriptionsService;
