import { z } from "zod";

export const bookingKindSchema = z.enum([
  "airport-pickup",
  "airport-dropoff",
  "city-tour",
  "custom",
]);

export const bookingRequestSchema = z
  .object({
    kind: bookingKindSchema,
    serviceTitle: z
      .string()
      .trim()
      .min(1, "Service is required")
      .max(200, "Service title is too long"),
    fullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(120, "Full name is too long")
      .refine((s) => /[\p{L}]/u.test(s), {
        message: "Name must include at least one letter",
      }),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required")
      .max(40, "Phone number is too long")
      .refine((s) => /^[\d+\s().-]+$/.test(s), {
        message:
          "Phone can only include digits, +, spaces, parentheses, and hyphens",
      })
      .refine((s) => (s.match(/\d/g) ?? []).length >= 8, {
        message: "Enter a phone number with at least 8 digits",
      }),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address")
      .max(254, "Email is too long"),
    confirmEmail: z
      .string()
      .trim()
      .email("Enter a valid confirmation email")
      .max(254, "Email is too long"),
    pickupLocation: z
      .string()
      .trim()
      .min(3, "Pickup location must be at least 3 characters")
      .max(800, "Pickup location is too long"),
    dropoffLocation: z
      .string()
      .trim()
      .min(3, "Drop-off location must be at least 3 characters")
      .max(800, "Drop-off location is too long"),
  })
  .refine(
    (data) =>
      data.email.toLowerCase() === data.confirmEmail.toLowerCase(),
    {
      message: "Email addresses must match",
      path: ["confirmEmail"],
    },
  );

export type BookingRequestPayload = z.infer<typeof bookingRequestSchema>;

export function firstZodIssueMessage(
  err: z.ZodError<BookingRequestPayload>,
): string {
  return err.issues[0]?.message ?? "Invalid form data";
}
