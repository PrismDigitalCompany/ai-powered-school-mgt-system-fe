import axios from "axios";


export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  headers: {
    "Content-Type": "application/json",
  },
});


function normalizeError(error) {
  if (!error.response) {
    return {
      status: 0,
      message: "Network error. Please check your connection and try again.",
      fieldErrors: null,
    };
  }

  const { status, data } = error.response;

  return {
    status,
    message: data?.message ?? "Something went wrong. Please try again.",
    fieldErrors: data?.errors ?? null,
  };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error)),
);

export default apiClient;
