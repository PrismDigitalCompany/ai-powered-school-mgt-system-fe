import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router-dom";

import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { ROUTES } from "../../../constants/route";
import {
  resetPasswordSchema,
  resetPasswordDefaultValues,
} from "../schemas/reset-password.schema";
import { useResetPassword } from "../hooks/useResetPassword";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const resetPasswordMutation = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: resetPasswordDefaultValues,
  });

  const onSubmit = (values) => {
    resetPasswordMutation.mutate({ ...values, token });
  };

  if (resetPasswordMutation.isSuccess) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-text">Password reset</h1>
        <p className="mt-1.5 text-sm text-text-muted">
          Your password has been reset. You can now sign in with your new
          password.
        </p>

        <Btn asChild fullWidth className="mt-6">
          <Link to={ROUTES.AUTH.LOGIN}>Back to sign in</Link>
        </Btn>
      </div>
    );
  }

  if (!token) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-text">Invalid reset link</h1>
        <p className="mt-1.5 text-sm text-text-muted">
          This password reset link is missing or invalid. Request a new one to
          continue.
        </p>

        <Btn asChild fullWidth className="mt-6">
          <Link to={ROUTES.AUTH.FORGOT_PASSWORD}>Request a new link</Link>
        </Btn>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">
        Choose a new password
      </h1>
      <p className="mt-1.5 text-sm text-text-muted">
        Enter a new password for your account.
      </p>

      {resetPasswordMutation.isError && (
        <FormErrorBanner message={resetPasswordMutation.error.message} />
      )}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5"
      >
        <Field
          id="password"
          label="New password"
          required
          err={errors.password?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="*********"
            {...register("password")}
          />
        </Field>

        <Field
          id="confirmPassword"
          label="Confirm new password"
          required
          err={errors.confirmPassword?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="********"
            {...register("confirmPassword")}
          />
        </Field>

        <Btn
          type="submit"
          fullWidth
          loading={resetPasswordMutation.isPending}
          disabled={resetPasswordMutation.isPending}
        >
          Reset password
        </Btn>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Remembered your password?{" "}
        <Link
          to={ROUTES.AUTH.LOGIN}
          className="font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;
