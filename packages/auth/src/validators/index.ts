import { z } from "zod";

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

const emailSchema = z.object({
  email: z
    .string({ required_error: "This field is required." })
    .email("Email must be a valid email."),
});

const passwordSchema = z.object({
  password: z
    .string({ required_error: "This field is required." })
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a special character, a number and must be at least 8 characters long.",
    ),
});

const registerSchema = emailSchema.merge(passwordSchema);
const passwordLoginSchema = emailSchema.merge(passwordSchema);
const magicLinkLoginSchema = emailSchema;
const forgotPasswordSchema = emailSchema;
const updatePasswordSchema = passwordSchema;

type PasswordLoginData = z.infer<typeof passwordLoginSchema>;
type MagicLinkLoginData = z.infer<typeof magicLinkLoginSchema>;
type RegisterData = z.infer<typeof registerSchema>;
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;

export {
  registerSchema,
  passwordLoginSchema,
  magicLinkLoginSchema,
  forgotPasswordSchema,
  updatePasswordSchema,
};

export type {
  PasswordLoginData,
  MagicLinkLoginData,
  RegisterData,
  ForgotPasswordData,
  UpdatePasswordData,
};
