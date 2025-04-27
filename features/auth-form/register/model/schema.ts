import { z } from "zod";
import { UserRoles } from "../../model/enums";

export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  surname: z.string().min(1, { message: "Surname is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  login: z
    .string()
    .min(4, { message: "Minimal login length is 4 characters" })
    .max(16, { message: "Maximal login length is 16 characters" }),
  password: z.string().min(6, { message: "Minimal password is 6 characters" }),
  age: z.coerce.number(),
  parentCode: z.optional(z.string()),
  role: z.nativeEnum(UserRoles, {
    errorMap: () => ({ message: "Role is required" }),
  }),
});
