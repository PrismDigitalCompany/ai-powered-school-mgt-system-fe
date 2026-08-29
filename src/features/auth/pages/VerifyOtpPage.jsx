import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "react-router-dom";

import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { ROUTES } from "../../../constants/route";
import {
  verifyOtpSchema,
  verifyOtpDefaultValues,
} from "../schemas/verify-otp.schema";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { useResendOtp } from "../hooks/useResendOtp";


const VerifyOtpPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: verifyOtpDefaultValues,
  });

  const onSubmit = (values) => {
    verifyOtpMutation.mutate({ email, otp: values.otp });
  };

  if (verifyOtpMutation.isSuccess) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-text">Email verified</h1>
        <p className="mt-1.5 text-sm text-text-muted">
          Your email has been verified. You can now sign in.
        </p>

        <Btn asChild fullWidth className="mt-6">
          <Link to={ROUTES.AUTH.LOGIN}>Go to sign in</Link>
        </Btn>
      </div>
    );
  }

  if (!email) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-text">
          Invalid verification link
        </h1>
        <p className="mt-1.5 text-sm text-text-muted">
          This verification link is missing or invalid. Sign in to request a new
          one.
        </p>

        <Btn asChild fullWidth className="mt-6">
          <Link to={ROUTES.AUTH.LOGIN}>Back to sign in</Link>
        </Btn>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text">Verify your email</h1>
      <p className="mt-1.5 text-sm text-text-muted">
        Enter the 6-digit code sent to{" "}
        <span className="font-medium text-text">{email}</span>.
      </p>

      {verifyOtpMutation.isError && (
        <FormErrorBanner message={verifyOtpMutation.error.message} />
      )}

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-5"
      >
        <Field
          id="otp"
          label="Verification code"
          required
          err={errors.otp?.message}
        >
          <Input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            className="tracking-[0.3em] text-center"
            {...register("otp")}
          />
        </Field>

        <Btn
          type="submit"
          fullWidth
          loading={verifyOtpMutation.isPending}
          disabled={verifyOtpMutation.isPending}
        >
          Verify email
        </Btn>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Didn&apos;t get a code?{" "}
        <button
          type="button"
          onClick={() => resendOtpMutation.mutate({ email })}
          disabled={resendOtpMutation.isPending}
          className="font-medium text-brand-600 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resendOtpMutation.isPending ? "Sending…" : "Resend code"}
        </button>
      </p>
    </div>
  );
};

export default VerifyOtpPage;
