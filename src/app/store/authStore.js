import { create } from "zustand";
import { storage } from "../../lib/storage";

const AUTH_STORAGE_KEY = "auth-session";

function readPersistedSession() {
  const session = storage.get(AUTH_STORAGE_KEY);
  if (!session?.user || !session?.token) {
    return { isAuthenticated: false, user: null, role: null, token: null };
  }
  return {
    isAuthenticated: true,
    user: session.user,
    role: session.user.role ?? null,
    token: session.token,
  };
}


export const useAuthStore = create((set) => ({
  ...readPersistedSession(),
  initializing: false,
  schoolContext: null,

  login(user, token) {
    storage.set(AUTH_STORAGE_KEY, { user, token });
    set({
      isAuthenticated: true,
      user,
      role: user?.role ?? null,
      token,
    });
  },

  logout() {
    storage.remove(AUTH_STORAGE_KEY);
    set({
      isAuthenticated: false,
      user: null,
      role: null,
      token: null,
      schoolContext: null,
    });
  },

  setSchoolContext(schoolContext) {
    set({ schoolContext });
  },
}));

export default useAuthStore;
