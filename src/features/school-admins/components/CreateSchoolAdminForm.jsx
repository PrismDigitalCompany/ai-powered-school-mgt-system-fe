import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { ROUTES } from "../../../constants/route";
import {
  createSchoolAdminSchema,
  createSchoolAdminDefaultValues,
} from "../schemas/create-school-admin.schema";
import { useCreateSchoolAdmin } from "../hooks/useCreateSchoolAdmin";

const CreateSchoolAdminForm = () => {
  const navigate = useNavigate();
  const createSchoolAdminMutation = useCreateSchoolAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSchoolAdminSchema),
    defaultValues: createSchoolAdminDefaultValues,
  });

  const onSubmit = (values) => {
    createSchoolAdminMutation.mutate(values, {
      onSuccess: () => navigate(ROUTES.SUPER_ADMIN.SCHOOL_ADMINS),
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {createSchoolAdminMutation.isError && (
        <FormErrorBanner message={createSchoolAdminMutation.error.message} />
      )}

      <div className="space-y-5">
        <h2 className="text-base font-semibold text-text">Identity</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            id="firstName"
            label="First Name"
            required
            err={errors.firstName?.message}
          >
            <Input
              placeholder="School admin first name"
              {...register("firstName")}
            />
          </Field>

          <Field
            id="lastName"
            label="Last Name"
            required
            err={errors.lastName?.message}
          >
            <Input
              placeholder="School admin last name"
              {...register("lastName")}
            />
          </Field>
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-base font-semibold text-text">Contact</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="email" label="Email" required err={errors.email?.message}>
            <Input
              type="email"
              placeholder="admin@school.edu.ng"
              {...register("email")}
            />
          </Field>

          <Field id="phone" label="Phone" required err={errors.phone?.message}>
            <Input
              type="tel"
              placeholder="+234 800 000 0000"
              {...register("phone")}
            />
          </Field>
        </div>
      </div>

      <div className="space-y-5">
        <h2 className="text-base font-semibold text-text">Security</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            id="password"
            label="Password"
            required
            hint="At least 8 characters"
            err={errors.password?.message}
          >
            <Input
              type="password"
              autoComplete="new-password"
              placeholder="**********"
              {...register("password")}
            />
          </Field>

          <Field
            id="confirmPassword"
            label="Confirm Password"
            required
            err={errors.confirmPassword?.message}
          >
            <Input
              type="password"
              autoComplete="new-password"
              placeholder="**********"
              {...register("confirmPassword")}
            />
          </Field>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Btn
          type="button"
          variant="secondary"
          disabled={createSchoolAdminMutation.isPending}
          onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOL_ADMINS)}
        >
          Cancel
        </Btn>
        <Btn
          type="submit"
          loading={createSchoolAdminMutation.isPending}
          disabled={createSchoolAdminMutation.isPending}
        >
          Create School Admin
        </Btn>
      </div>
    </form>
  );
};

export default CreateSchoolAdminForm;
