import Field from "../../../components/inputs/Field";
import Input from "../../../components/inputs/Input";
import { NATIVE_SELECT_CLASSNAME } from "../../../components/inputs/nativeSelectClassName";
import { cn } from "../../../lib/clsx";

const SCHOOL_TYPES = ["Nursery", "Primary", "Secondary", "Primary & Secondary"];
const SCHOOL_CATEGORIES = ["Public", "Private", "Faith-based", "International"];

const selectClassName = cn(NATIVE_SELECT_CLASSNAME, "w-full");

const SchoolInformationSection = ({ register, errors }) => (
  <div className="space-y-5">
    <h2 className="text-base font-semibold text-text">School Information</h2>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field id="name" label="School Name" required err={errors.name?.message}>
        <Input placeholder="Greenfield Academy" {...register("name")} />
      </Field>

      <Field
        id="code"
        label="School Code"
        required
        hint="3-20 uppercase letters, numbers, or hyphens"
        err={errors.code?.message}
      >
        <Input placeholder="SCH-0001" {...register("code")} />
      </Field>

      <Field
        id="schoolType"
        label="School Type"
        required
        err={errors.schoolType?.message}
      >
        <select
          id="schoolType"
          className={selectClassName}
          defaultValue=""
          {...register("schoolType")}
        >
          <option value="" disabled>
            Select a type
          </option>
          {SCHOOL_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="schoolCategory"
        label="School Category"
        required
        err={errors.schoolCategory?.message}
      >
        <select
          id="schoolCategory"
          className={selectClassName}
          defaultValue=""
          {...register("schoolCategory")}
        >
          <option value="" disabled>
            Select a category
          </option>
          {SCHOOL_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="email"
        label="School Email"
        required
        err={errors.email?.message}
      >
        <Input
          type="email"
          placeholder="info@school.edu.ng"
          {...register("email")}
        />
      </Field>

      <Field
        id="phone"
        label="Phone Number"
        required
        err={errors.phone?.message}
      >
        <Input
          type="tel"
          placeholder="+234 800 000 0000"
          {...register("phone")}
        />
      </Field>
    </div>
  </div>
);

export default SchoolInformationSection;
