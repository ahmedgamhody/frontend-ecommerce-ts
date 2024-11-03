import { z } from "zod";
type signInTypes = z.infer<typeof signInSchema>;

const signInSchema = z.object({
  email: z.string().min(1, { message: "Email address is required" }).email(),
  password: z.string().min(1, { message: " Password is required" }),
});

export { signInSchema, type signInTypes };
