import { Controller } from "react-hook-form";
import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";

/**
 * One limit field: a number input plus an "Unlimited" checkbox that
 * toggles the field's value directly between a number and `null` — the
 * exact representation the plan model already uses for "no limit" (see
 * MOCK_SUBSCRIPTION_PLANS' Enterprise entry), not a -1 sentinel. Built
 * with Controller (not register) because the value isn't a plain string
 * input — it's this null/number toggle.
 */
const LimitField = ({ name, label, control, error }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => {
      const isUnlimited = field.value === null;

      return (
        <Field id={name} label={label} required err={error?.message}>
          <div className="space-y-2">
            <Input
              id={name}
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 500"
              disabled={isUnlimited}
              value={isUnlimited ? "" : (field.value ?? "")}
              onChange={(e) => {
                const raw = e.target.value;
                field.onChange(raw === "" ? undefined : Number(raw));
              }}
              onBlur={field.onBlur}
            />
            <label className="flex items-center gap-2 text-sm text-text-muted">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-border accent-brand-600"
                checked={isUnlimited}
                onChange={(e) =>
                  field.onChange(e.target.checked ? null : undefined)
                }
              />
              Unlimited
            </label>
          </div>
        </Field>
      );
    }}
  />
);

const PlanLimitsSection = ({ control, errors }) => (
  <div className="space-y-5">
    <h2 className="text-base font-semibold text-text">Limits</h2>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <LimitField
        name="studentLimit"
        label="Student Limit"
        control={control}
        error={errors.studentLimit}
      />
      <LimitField
        name="teacherLimit"
        label="Teacher Limit"
        control={control}
        error={errors.teacherLimit}
      />
      <LimitField
        name="campusLimit"
        label="Campus Limit"
        control={control}
        error={errors.campusLimit}
      />
    </div>
  </div>
);

export default PlanLimitsSection;
