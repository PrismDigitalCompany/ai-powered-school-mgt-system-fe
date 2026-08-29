import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Textarea from "../../../components/inputs/Textarea";

const PlanIdentitySection = ({ register, errors }) => (
  <div className="space-y-5">
    <h2 className="text-base font-semibold text-text">Plan Information</h2>
    <div className="grid grid-cols-1 gap-5">
      <Field
        id="name"
        label="Plan Name"
        required
        hint="Shown to Super Admins across the platform — keep it short and distinct."
        err={errors.name?.message}
      >
        <Input placeholder="e.g. Starter" {...register("name")} />
      </Field>

      <Field
        id="description"
        label="Description"
        required
        err={errors.description?.message}
      >
        <Textarea
          rows={3}
          placeholder="Who this plan is for and what it includes."
          {...register("description")}
        />
      </Field>
    </div>
  </div>
);

export default PlanIdentitySection;
