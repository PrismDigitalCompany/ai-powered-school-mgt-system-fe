import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../../app/store/authStore";
import { authSevice } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutFn: authSevice.logout,
    onSuccess() {
      logout();
      toast.success("You've been successfully logout");
      navigate("/login");
    },

    onError(err) {
      toast.error("Logout failed, but session cleared");
      logout();
      navigate("/login");
    },
  });
}
