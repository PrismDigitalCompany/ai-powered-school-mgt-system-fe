import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import {
  createSchoolSchema,
  createSchoolDefaultValues,
} from "../schemas/create-school.schema";
import { ROUTES } from "../../../constants/route";
import SchoolInformationSection from "./SchoolInformationSection";
import SchoolLocationSection from "./SchoolLocationSection";
import AdminInformationSection from "./AdminInformationSection";
import SchoolIdentitySection from "./SchoolIdentitySection";
import { useCreateSchool } from "../hooks/useCreateSchool";

/**
 * Submits through useCreateSchool (React Query mutation → schools.service
 * → apiClient) — this component never touches Axios or a raw response
 * directly. API errors surface via the same FormErrorBanner every other
 * form in the app uses; validation stays entirely in the Zod schema.
 */
const CreateSchoolForm = () => {
  const navigate = useNavigate();
  const createSchoolMutation = useCreateSchool();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: createSchoolDefaultValues,
  });

  const onSubmit = (values) => {
    createSchoolMutation.mutate(values, {
      onSuccess: () => navigate(ROUTES.SUPER_ADMIN.SCHOOLS),
    });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {createSchoolMutation.isError && (
        <FormErrorBanner message={createSchoolMutation.error.message} />
      )}

      <SchoolInformationSection register={register} errors={errors} />
      <SchoolLocationSection register={register} errors={errors} />
      <AdminInformationSection register={register} errors={errors} />

      <Controller
        name="logo"
        control={control}
        render={({ field, fieldState }) => (
          <SchoolIdentitySection field={field} fieldState={fieldState} />
        )}
      />

      <div className="flex justify-end gap-3 border-t border-border pt-6">
        <Btn
          type="button"
          variant="secondary"
          disabled={createSchoolMutation.isPending}
          onClick={() => navigate(ROUTES.SUPER_ADMIN.SCHOOLS)}
        >
          Cancel
        </Btn>
        <Btn
          type="submit"
          loading={createSchoolMutation.isPending}
          disabled={createSchoolMutation.isPending}
        >
          Register School
        </Btn>
      </div>
    </form>
  );
};

export default CreateSchoolForm;
