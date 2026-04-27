import z from "zod";

const UserSchemf = z.object({
  username: z.string(),
});

const user = { username: "USER" };

console.log(UserSchemf.parse(user));
