import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import Btn from "../../../components/ui/Btn";
import FormErrorBanner from "../../../components/feedback/FormErrorBanner";
import { editSchoolSchema } from "../schemas/edit-school.schema";
import { ROUTES, buildPath } from "../../../constants/route";
import SchoolInformationSection from "./SchoolInformationSection";
import SchoolLocationSection from "./SchoolLocationSection";
import SchoolIdentitySection from "./SchoolIdentitySection";
import { useUpdateSchool } from "../hooks/useUpdateSchool";

const EditSchoolForm = ({ school }) => {
  const navigate = useNavigate();
  const updateSchoolMutation = useUpdateSchool();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editSchoolSchema),
    values: {
      name: school.name,
      code: school.code,
      schoolType: school.schoolType,
      schoolCategory: school.schoolCategory,
      email: school.email,
      phone: school.phone,
      country: school.country,
      state: school.state,
      city: school.city,
      address: school.address,
      logo: null,
    },
  });

  const detailsPath = buildPath(ROUTES.SUPER_ADMIN.SCHOOL_DETAILS, {
    id: school.id,
  });

  const onSubmit = (values) => {
    updateSchoolMutation.mutate(
      { schoolId: school.id, payload: values },
      { onSuccess: () => navigate(detailsPath) },
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {updateSchoolMutation.isError && (
        <FormErrorBanner message={updateSchoolMutation.error.message} />
      )}

      <SchoolInformationSection register={register} errors={errors} />
      <SchoolLocationSection register={register} errors={errors} />

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
          disabled={updateSchoolMutation.isPending}
          onClick={() => navigate(detailsPath)}
        >
          Cancel
        </Btn>
        <Btn
          type="submit"
          loading={updateSchoolMutation.isPending}
          disabled={updateSchoolMutation.isPending}
        >
          Save Changes
        </Btn>
      </div>
    </form>
  );
};

export default EditSchoolForm;
