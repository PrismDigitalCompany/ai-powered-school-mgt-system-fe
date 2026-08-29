import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { ROUTES, buildPath } from "../../../constants/route";
import { editSchoolAdminSchema } from "../schemas/edit-school-admin.schema";
import { splitFullName } from "../utils/adminName";
import { useUpdateSchoolAdmin } from "../hooks/useUpdateSchoolAdmin";

const EditSchoolAdminForm = ({ admin }) => {
  const navigate = useNavigate();
  const updateSchoolAdminMutation = useUpdateSchoolAdmin();

  const { firstName, lastName } = splitFullName(admin.fullName);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editSchoolAdminSchema),
    values: {
      firstName,
      lastName,
      email: admin.email,
      phone: admin.phone,
    },
  });

  const detailsPath = buildPath(ROUTES.SUPER_ADMIN.SCHOOL_ADMIN_DETAILS, {
    id: admin.id,
  });

  const onSubmit = (values) => {
    updateSchoolAdminMutation.mutate(
      { adminId: admin.id, payload: values },
      {
        onSuccess: () =>
          navigate(detailsPath, {
            state: { updatedSchoolAdminProfile: values },
          }),
      },
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {updateSchoolAdminMutation.isError && (
        <FormErrorBanner message={updateSchoolAdminMutation.error.message} />
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

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Btn
          type="button"
          variant="secondary"
          disabled={updateSchoolAdminMutation.isPending}
          onClick={() => navigate(detailsPath)}
        >
          Cancel
        </Btn>
        <Btn
          type="submit"
          loading={updateSchoolAdminMutation.isPending}
          disabled={updateSchoolAdminMutation.isPending}
        >
          Save Changes
        </Btn>
      </div>
    </form>
  );
};

export default EditSchoolAdminForm;
