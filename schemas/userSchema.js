// schemas/userSchema.js
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Magaca ugu yaraan waa 2 xaraf"),
  email: z.string().email("Email-ku ma saxna"),
  password: z.string().min(6, "Password-ku ugu yaraan waa 6 xaraf"),
  role: z.enum(["user", "admin"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Fadlan geli email sax ah"),
  password: z.string().min(1, "Password-ka waa khasab"),
});
