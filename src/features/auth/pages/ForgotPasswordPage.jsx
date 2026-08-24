import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { ROUTES } from "../../../constants/route";
import {
  forgotPasswordSchema,
  forgotPasswordDefaultValues,
} from "../schemas/forgot-password.schema";
import { useForgotPassword } from "../hooks/useForgotPassword";

const ForgotPasswordPage = () => {
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordDefaultValues,
  });

  const onSubmit = (values) => {
    forgotPasswordMutation.mutate(values);
  };

  if (forgotPasswordMutation.isSuccess) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-text">Check your email</h1>
        <p className="mt-1.5 text-sm text-text-muted">
          If an account exists for that email address, we&apos;ve sent
          instructions to reset your password.
        </p>

        <Btn asChild fullWidth className="mt-6">
          <Link to={ROUTES.AUTH.LOGIN}>Back to sign in</Link>
        </Btn>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">
        Forgot your password?
      </h1>
      <p className="mt-1.5 text-sm text-text-muted">
        Enter your email and we&apos;ll send you instructions to reset it.
      </p>

      {forgotPasswordMutation.isError && (
        <FormErrorBanner message={forgotPasswordMutation.error.message} />
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
            placeholder="you@school.com"
            {...register("email")}
          />
        </Field>

        <Btn
          type="submit"
          fullWidth
          loading={forgotPasswordMutation.isPending}
          disabled={forgotPasswordMutation.isPending}
        >
          Send reset instructions
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

export default ForgotPasswordPage;
