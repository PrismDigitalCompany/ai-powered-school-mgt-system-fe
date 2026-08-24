import { lazy } from "react";
import { ROUTES } from "../../constants/route";
import { LAYOUTS } from "../../constants/layouts";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const VerifyOtpPage = lazy(() => import("./pages/VerifyOtpPage"));

/**
 * Auth feature route manifest.
 */
export const manifest = [
  {
    path: ROUTES.AUTH.LOGIN,
    component: LoginPage,
    layout: LAYOUTS.AUTH,
    title: "Sign in",
  },
  {
    path: ROUTES.AUTH.REGISTER,
    component: RegisterPage,
    layout: LAYOUTS.AUTH,
    title: "Create account",
  },
  {
    path: ROUTES.AUTH.FORGOT_PASSWORD,
    component: ForgotPasswordPage,
    layout: LAYOUTS.AUTH,
    title: "Forgot password",
  },
  {
    path: ROUTES.AUTH.RESET_PASSWORD,
    component: ResetPasswordPage,
    layout: LAYOUTS.AUTH,
    title: "Reset password",
  },
  {
    path: ROUTES.AUTH.VERIFY_OTP,
    component: VerifyOtpPage,
    layout: LAYOUTS.AUTH,
    title: "Verify email",
  },
];
