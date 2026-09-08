import { apiClient } from "../../../services/apiClient";
import { ROLES } from "../../../constants/role";

const BASE_URL = "/auth";

function getDevSuperAdminSession({ email, password }) {
  if (!import.meta.env.DEV) {
    return null;
  }

  const devEmail = import.meta.env.VITE_DEV_SUPER_ADMIN_EMAIL;
  const devPassword = import.meta.env.VITE_DEV_SUPER_ADMIN_PASSWORD;

  if (!devEmail || !devPassword) {
    return null;
  }

  if (email !== devEmail || password !== devPassword) {
    return null;
  }

  return {
    user: {
      id: "dev-super-admin",
      email: devEmail,
      fullName: "Dev Super Admin",
      role: ROLES.SUPER_ADMIN,
      isDevSession: true,
    },
    token: "dev-local-session-token",
  };
}

function normalizeLoginResponse(raw) {
  return {
    user: raw?.user ?? null,
    token: raw?.token ?? null,
  };
}

function normalizeRegisterResponse(raw) {
  return {
    user: raw?.user ?? null,
  };
}

export const authService = {
  login: async (credentials) => {
    const devSession = getDevSuperAdminSession(credentials);
    if (devSession) {
      return devSession;
    }

    const response = await apiClient.post(`${BASE_URL}/login`, credentials);
    return normalizeLoginResponse(response.data);
  },

  register: async (payload) => {
    const response = await apiClient.post(`${BASE_URL}/register`, payload);
    return normalizeRegisterResponse(response.data);
  },

  forgotPassword: async ({ email }) => {
    await apiClient.post(`${BASE_URL}/forgot-password`, { email });
  },

  resetPassword: async ({ token, password }) => {
    await apiClient.post(`${BASE_URL}/reset-password`, { token, password });
  },

  verifyOtp: async ({ email, otp }) => {
    await apiClient.post(`${BASE_URL}/verify-otp`, { email, otp });
  },

  resendOtp: async ({ email }) => {
    await apiClient.post(`${BASE_URL}/verify-otp/resend`, { email });
  },

  logout: async () => {
    const response = await apiClient.post(`${BASE_URL}/logout`);
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get(`${BASE_URL}/me`);
    return response.data;
  },
};

export default authService;
