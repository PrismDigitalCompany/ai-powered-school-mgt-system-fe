import { createSchoolSchema } from "./create-school.schema";

export const editSchoolSchema = createSchoolSchema.pick({
  name: true,
  code: true,
  schoolType: true,
  schoolCategory: true,
  email: true,
  phone: true,
  country: true,
  state: true,
  city: true,
  address: true,
  logo: true,
});
