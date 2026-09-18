import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { ROUTES } from "../../../constants/route";
import {
  registerSchema,
  registerDefaultValues,
} from "../schemas/register.schema";
import { useRegister } from "../hooks/useRegister";

const RegisterPage = () => {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  });

  const onSubmit = (values) => {
    registerMutation.mutate(values, {
      onSuccess: () => reset(registerDefaultValues),
    });
  };

  if (registerMutation.isSuccess) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-text">Account created</h1>
        <p className="mt-1.5 text-sm text-text-muted">
          Your account has been created. You can now sign in.
        </p>

        <Btn asChild fullWidth className="mt-6">
          <Link to={ROUTES.AUTH.LOGIN}>Go to sign in</Link>
        </Btn>
      </div>
    );
  }

  return (
    <div hidden={true}>
      <h1 className="text-2xl font-semibold text-text">Create an account</h1>
      <p className="mt-1.5 text-sm text-text-muted">
        Sign up to enjoy the benefits of the system.
      </p>

      {registerMutation.isError && (
        <FormErrorBanner message={registerMutation.error.message} />
      )}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5"
      >
        <Field
          id="firstName"
          label="First name"
          required
          err={errors.firstName?.message}
        >
          <Input
            type="text"
            autoComplete="name"
            placeholder="Enter your first name"
            {...register("firstName")}
          />
        </Field>

        <Field
          id="lastName"
          label="Last name"
          required
          err={errors.lastName?.message}
        >
          <Input
            type="text"
            autoComplete="name"
            placeholder="Enter your last name"
            {...register("lastName")}
          />
        </Field>

        <Field id="email" label="Email" required err={errors.email?.message}>
          <Input
            type="email"
            autoComplete="email"
            placeholder="you@school.com"
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
            autoComplete="new-password"
            placeholder="*******"
            {...register("password")}
          />
        </Field>

        <Field
          id="confirmPassword"
          label="Confirm password"
          required
          err={errors.confirmPassword?.message}
        >
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="*******"
            {...register("confirmPassword")}
          />
        </Field>

        <Btn
          type="submit"
          fullWidth
          loading={registerMutation.isPending}
          disabled={registerMutation.isPending}
        >
          Create account
        </Btn>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{" "}
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

export default RegisterPage;
