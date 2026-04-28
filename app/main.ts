import z from "zod";
import { fromZodError } from "zod-validation-error";

enum Hobbies {
  "Programming",
  "Guitar",
  "Drawing",
}

const validationEmail = z.email().refine((val) => val.endsWith("@gmail.com"), {
  message: "eMAIL MUST END WITH @gmail",
});

const UserMap = z.map(z.string(), z.object({ name: z.string() }));

const mapUser = new Map([
  ["id-john", { name: "John" }],
  ["id-kyle", { name: "Kyle" }],
]);

const UserSchema = z
  .object({
    id: z.union([z.string(), z.number()]),
    username: z.string().min(3).max(30),
    age: z.number().gt(14),
    birthday: z.date(),
    isProgrammer: z.boolean().default(true),
    test: z.undefined().optional().nullish(),
    test2: z.void().optional().nullable(),
    test3: z.any(),
    isWorkig: z.literal(true),
    hobby: z.enum(Hobbies),
    friends: z.array(z.string()).nonempty(),
    coords: z.tuple([z.number(), z.number(), z.number()]),
    name: z.string().or(z.number()),
    number: z.discriminatedUnion("status", [
      z.object({ status: z.literal("success"), data: z.string() }),
      z.object({ status: z.literal("failed"), error: z.instanceof(Error) }),
    ]),
  })
  .strict();

type User = z.infer<typeof UserSchema>;

const user = { username: "USER" };

console.log(UserSchema.safeParse(user));

const result = UserSchema.safeParse(user);

if (!result.success) {
  console.log(fromZodError(result.error));
}
