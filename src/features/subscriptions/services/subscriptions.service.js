import { apiClient } from "../../../services/apiClient";
import { ROUTES } from "../../../constants/route";
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

export const subscriptionsService = {
  getSubscriptionPlans: async () => {
    const response = await apiClient.get(
      `${BASE_URL}${ROUTES.SUBSCRIBE.PLANS}`,
    );
    return normalizeSubscriptionPlansResponse(response.data);
  },

  getSubscriptionPlan: async (planId) => {
    const response = await apiClient.get(
      `${BASE_URL}${ROUTES.SUBSCRIBE.PLANS}/${planId}`,
    );
    return normalizeSubscriptionPlanResponse(response.data);
  },

  createSubscriptionPlan: async (payload) => {
    const response = await apiClient.post(
      `${BASE_URL}${ROUTES.SUBSCRIBE.PLANS}`,
      payload,
    );
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
    const response = await apiClient.delete(
      `${BASE_URL}${ROUTES.SUBSCRIBE.PLANS}/${planId}`,
    );
    return normalizeDeleteSubscriptionPlanResponse(response.data);
  },
};

export default subscriptionsService;
