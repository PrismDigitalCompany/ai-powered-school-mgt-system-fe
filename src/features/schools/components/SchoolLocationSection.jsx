import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import Textarea from "../../../components/inputs/Textarea";

const SchoolLocationSection = ({ register, errors }) => (
  <div className="space-y-5">
    <h2 className="text-base font-semibold text-text">Location</h2>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field
        id="country"
        label="Country"
        required
        err={errors.country?.message}
      >
        <Input placeholder="Nigeria" {...register("country")} />
      </Field>

      <Field
        id="state"
        label="State / Region"
        required
        err={errors.state?.message}
      >
        <Input placeholder="Lagos" {...register("state")} />
      </Field>

      <Field id="city" label="City" required err={errors.city?.message}>
        <Input placeholder="Ikeja" {...register("city")} />
      </Field>
    </div>

    <Field
      id="address"
      label="Full Address"
      required
      err={errors.address?.message}
    >
      <Textarea
        rows={3}
        placeholder="123 Admiralty Way, Lekki Phase 1"
        {...register("address")}
      />
    </Field>
  </div>
);

export default SchoolLocationSection;
