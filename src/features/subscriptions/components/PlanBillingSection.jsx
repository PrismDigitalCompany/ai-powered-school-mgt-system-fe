import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import { cn } from "../../../lib/clsx";
import { PLAN_CURRENCY_OPTIONS } from "../schemas/create-subscription-plan.schema";

const selectClassName = cn(NATIVE_SELECT_CLASSNAME, "w-full");

const PlanBillingSection = ({ register, errors }) => (
  <div className="space-y-5">
    <h2 className="text-base font-semibold text-text">Pricing</h2>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <Field
        id="monthlyPrice"
        label="Monthly Price"
        required
        err={errors.monthlyPrice?.message}
      >
        <Input
          type="number"
          min="0"
          step="1"
          placeholder="15000"
          {...register("monthlyPrice", { valueAsNumber: true })}
        />
      </Field>

      <Field
        id="yearlyPrice"
        label="Yearly Price"
        required
        err={errors.yearlyPrice?.message}
      >
        <Input
          type="number"
          min="0"
          step="1"
          placeholder="150000"
          {...register("yearlyPrice", { valueAsNumber: true })}
        />
      </Field>

      <Field
        id="currency"
        label="Currency"
        required
        err={errors.currency?.message}
      >
        <select
          id="currency"
          className={selectClassName}
          {...register("currency")}
        >
          {PLAN_CURRENCY_OPTIONS.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </Field>
    </div>
  </div>
);

export default PlanBillingSection;
