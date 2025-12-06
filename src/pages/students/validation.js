import { z } from "zod";

const fileValidation = z
  .any()
  .refine((file) => {
    if (!file) return false;
    return file instanceof File;
  }, "Please select a student image")
  .refine((file) => {
    if (!file) return false;
    return file.size <= 2 * 1024 * 1024;
  }, "File size should be less than 5MB")
  .refine((file) => {
    if (!file) return false;
    return file.type.startsWith("image/");
  }, "Please select a valid image file");

export const studentRegistrationSchema = z.object({
  name: z.string().min(1, "Student name is required"),
  parentName: z.string().min(1, "Parent name is required"),
  parentJob: z.string().min(1, "Parent job is required"),
  dob: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(1, "Address is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  phone: z.string().min(1, "Phone number is required"),
  studentImage: fileValidation,
  school: z.enum(["GOVERNMENT", "INTERNATIONAL", "BOTH", "NOTHING"]),
  studyAbroad: z.boolean().default(false),
  futurePlan: z.string().optional(),
  futureCountryId: z.string().optional(),
  futureCountryName: z.string().optional(),
  futureuniversityName: z.string().optional(),
  potentialYearOfStudy: z.string().optional(),
  joinRaffles: z.enum(["YES", "NO", "MAYBE"]).optional(),
  paymentOption: z.enum(["FULL_PAYMENT", "HALF_PAYMENT"], {
    required_error: "Please select a payment option",
  }),
  status: z.enum(["NONE", "PENDING", "COMPLETED", "FAILED"]).default("NONE"),
  transactionId: z.string().optional(),
  bank: z.string().optional(),
  message: z.string().optional(),
});
