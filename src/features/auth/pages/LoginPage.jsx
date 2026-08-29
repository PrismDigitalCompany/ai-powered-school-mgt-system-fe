import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { ROUTES } from "../../../constants/route";
import { ROLES } from "../../../constants/role";
import { loginSchema, loginDefaultValues } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";

function resolvePostLoginRedirect(user, location) {
  const from = location.state?.from?.pathname;
  if (from) return from;

  if (user?.role === ROLES.SUPER_ADMIN) {
    return ROUTES.SUPER_ADMIN.DASHBOARD;
  }

  return ROUTES.APP.DASHBOARD;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const onSubmit = (values) => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        navigate(resolvePostLoginRedirect(data.user, location), {
          replace: true,
        });
      },
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Welcome back</h1>
      <p className="mt-1.5 text-sm text-text-muted">Sign in to your account.</p>

      {loginMutation.isError && (
        <FormErrorBanner message={loginMutation.error.message} />
      )}

      {import.meta.env.DEV && (
        <p className="mt-4 rounded-lg bg-info-50 px-3.5 py-2.5 text-xs text-info-600">
          Admin credentials login is configured in <code>.env</code> file (only
          for development <code>{" purpose"}</code>).
        </p>
      )}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5"
      >
        <Field id="email" label="Email" required err={errors.email?.message}>
          <Input
            type="email"
            autoComplete="email"
            placeholder="enter super-admin email address"
            {...register("email")}
          />
        </Field>

        <Field
          id="password"
          label="Password"
          required
          err={errors.password?.message}
        >
          <Input
            type="password"
            autoComplete="current-password"
            placeholder="*********"
            {...register("password")}
          />
        </Field>

        <div className="flex justify-end">
          <Link
            to={ROUTES.AUTH.FORGOT_PASSWORD}
            className="text-xs font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
          >
            Forgot password?
          </Link>
        </div>

        <Btn
          type="submit"
          fullWidth
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
        >
          Sign in
        </Btn>
      </form>
    </div>
  );
};

export default LoginPage;
