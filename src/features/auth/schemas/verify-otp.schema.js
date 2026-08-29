import { z } from "zod";

export const verifyOtpSchema = z.object({
  otp: z
    .string()
    .min(1, "Verification code is required")
    .regex(/^\d{6}$/, "Enter the 6-digit code sent to your email"),
});

export const verifyOtpDefaultValues = {
  otp: "",
};
