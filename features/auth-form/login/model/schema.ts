import { z } from "zod";
import { UserRoles } from "../../model/enums";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Minimal password is 6 characters" }),
  role: z.nativeEnum(UserRoles, {
    errorMap: () => ({ message: "Role is required" }),
  }),
  login: z
    .string()
    .min(4, { message: "Minimal login length is 4 characters" })
    .max(16, { message: "Maximal login length is 16 characters" }),
});
