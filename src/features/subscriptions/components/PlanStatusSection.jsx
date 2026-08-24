import Field from "../../../components/inputs/Field";
import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import { cn } from "../../../lib/clsx";
import { STATUS } from "../../../constants/status";

const selectClassName = cn(NATIVE_SELECT_CLASSNAME, "w-full sm:w-64");

const PlanStatusSection = ({ register, errors }) => (
  <div className="space-y-5">
    <h2 className="text-base font-semibold text-text">Status</h2>
    <Field id="status" label="Status" required err={errors.status?.message}>
      <select id="status" className={selectClassName} {...register("status")}>
        <option value={STATUS.ACTIVE}>Active</option>
        <option value={STATUS.INACTIVE}>Inactive</option>
      </select>
    </Field>
  </div>
);

export default PlanStatusSection;
