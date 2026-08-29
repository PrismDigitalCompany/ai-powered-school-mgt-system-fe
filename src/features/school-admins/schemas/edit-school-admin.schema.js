import { schoolAdminAccountSchema } from "./create-school-admin.schema";

export const editSchoolAdminSchema = schoolAdminAccountSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
});
