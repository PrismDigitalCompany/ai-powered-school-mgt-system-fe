import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";

/**
 * Admin Information section: the School Admin account created alongside
 * the school. Password is mandatory here — this creates a real sign-in
 * account for that admin, not just a contact record, so it can't be
 * optional or silently auto-generated.
 */
const AdminInformationSection = ({ register, errors }) => (
  <div className="space-y-5">
    <h2 className="text-base font-semibold text-text">Admin Information</h2>
    <p className="text-sm text-text-muted">
      Details for the School Admin account created for this school.
    </p>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field
        id="adminFirstName"
        label="Admin First Name"
        required
        err={errors.adminFirstName?.message}
      >
        <Input placeholder="Ada" {...register("adminFirstName")} />
      </Field>

      <Field
        id="adminLastName"
        label="Admin Last Name"
        required
        err={errors.adminLastName?.message}
      >
        <Input placeholder="Okafor" {...register("adminLastName")} />
      </Field>

      <Field
        id="adminEmail"
        label="Admin Email"
        required
        err={errors.adminEmail?.message}
      >
        <Input
          type="email"
          placeholder="admin@school.edu.ng"
          {...register("adminEmail")}
        />
      </Field>

      <Field
        id="adminPhone"
        label="Admin Phone"
        required
        err={errors.adminPhone?.message}
      >
        <Input
          type="tel"
          placeholder="+234 800 000 0000"
          {...register("adminPhone")}
        />
      </Field>

      <Field
        id="password"
        label="Password"
        required
        hint="At least 8 characters"
        err={errors.password?.message}
        className="sm:col-span-2"
      >
        <Input
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          {...register("password")}
        />
      </Field>
    </div>
  </div>
);

export default AdminInformationSection;
