import { apiClient } from "../../../services/apiClient";
import { ROLES } from "../../../constants/role";
import { ROUTES } from "../../../constants/route";

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

    const response = await apiClient.post(
      `${BASE_URL} ${ROUTES.AUTH.LOGIN}`,
      credentials,
    );
    return normalizeLoginResponse(response.data);
  },

  register: async (payload) => {
    const response = await apiClient.post(
      `${BASE_URL} ${ROUTES.AUTH.REGISTER}`,
      payload,
    );
    return normalizeRegisterResponse(response.data);
  },

  forgotPassword: async ({ email }) => {
    await apiClient.post(`${BASE_URL} ${ROUTES.AUTH.FORGOT_PASSWORD}`, {
      email,
    });
  },

  resetPassword: async ({ token, password }) => {
    await apiClient.post(`${BASE_URL} ${ROUTES.AUTH.RESET_PASSWORD}`, {
      token,
      password,
    });
  },

  verifyOtp: async ({ email, otp }) => {
    await apiClient.post(`${BASE_URL} ${ROUTES.AUTH.VERIFY_OTP}`, {
      email,
      otp,
    });
  },

  resendOtp: async ({ email }) => {
    await apiClient.post(`${BASE_URL} ${ROUTES.AUTH.RESEND_OTP}`, { email });
  },

  logout: async () => {
    const response = await apiClient.post(`${BASE_URL} ${ROUTES.AUTH.LOGOUT}`);
    return response.data;
  },

  getMe: async () => {
    const response = await apiClient.get(`${BASE_URL} ${ROUTES.AUTH.ME}`);
    return response.data;
  },
};

export default authService;
