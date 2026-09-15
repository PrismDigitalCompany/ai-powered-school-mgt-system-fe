import { z } from "zod";

const MAX_LOGO_SIZE_BYTES = 2 * 1024 * 1024;
const ACCEPTED_LOGO_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const PHONE_REGEX = /^[+\d][\d\s-]{6,20}$/;

export const createSchoolSchema = z.object({
  name: z
    .string()
    .min(1, "School name is required")
    .min(2, "Enter the full school name")
    .max(100, "School name is too long"),
  code: z
    .string()
    .min(1, "School code is required")
    .regex(
      /^[A-Z0-9-]{3,20}$/,
      "Use 3-20 uppercase letters, numbers, or hyphens (e.g. SCH-0001)",
    ),
  schoolType: z.string().min(1, "School type is required"),
  schoolCategory: z.string().min(1, "School category is required"),
  email: z
    .string()
    .min(1, "School email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(PHONE_REGEX, "Enter a valid phone number"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State/Region is required"),
  city: z.string().min(1, "City is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(10, "Enter the full address"),
  adminFirstName: z.string().min(1, "Admin first name is required"),
  adminLastName: z.string().min(1, "Admin last name is required"),
  adminEmail: z
    .string()
    .min(1, "Admin email is required")
    .email("Enter a valid email address"),
  adminPhone: z
    .string()
    .min(1, "Admin phone number is required")
    .regex(PHONE_REGEX, "Enter a valid phone number"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  logo: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => !file || file.size <= MAX_LOGO_SIZE_BYTES,
      "Logo must be 2MB or smaller",
    )
    .refine(
      (file) => !file || ACCEPTED_LOGO_TYPES.includes(file.type),
      "Logo must be a PNG, JPEG, or WEBP image",
    ),
});

export const createSchoolDefaultValues = {
  name: "",
  code: "",
  schoolType: "",
  schoolCategory: "",
  email: "",
  phone: "",
  country: "",
  state: "",
  city: "",
  address: "",
  adminFirstName: "",
  adminLastName: "",
  adminEmail: "",
  adminPhone: "",
  password: "",
  logo: null,
};
