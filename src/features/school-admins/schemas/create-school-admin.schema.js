import { z } from "zod";
import { PHONE_REGEX } from "../../schools/schemas/create-school.schema";

export const schoolAdminAccountSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(PHONE_REGEX, "Enter a valid phone number"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm the password"),
});

export const createSchoolAdminSchema = schoolAdminAccountSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  },
);

export const createSchoolAdminDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};
