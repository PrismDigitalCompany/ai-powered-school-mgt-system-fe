import { createSchoolSchema } from "./create-school.schema";

/**
 * Edit School reuses the exact same field validators as Create School
 * via Zod's .pick() — genuinely the same rules for every field they
 * share (name, code, type/category, contact, location, logo), not a
 * duplicated copy that could drift out of sync. Only the admin-account
 * fields (name/email/phone/password) are excluded: editing a school's
 * profile here doesn't touch the School Admin account itself — that's a
 * separate, not-yet-built reassignment workflow.
 */
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
