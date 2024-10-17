import { Context } from "hono";
import { prisma } from "../lib/db";
import { Env } from "../env";

export async function apiKeyMiddleware(
  c: Context<{
    Bindings: Env;
  }>,
  next: any,
) {
  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json({ ok: false, message: "API key is required" }, 401);
  }

  const user = await prisma(c.env).user.findUnique({ where: { apiKey } });
  if (!user) {
    return c.json({ ok: false, message: "Invalid API key" }, 401);
  }

  // Store user in context for downstream use
  c.set("user", user);
  return next();
<<<<<<< HEAD



// export async function apiKeyMiddleware(
//   c: Context<{
//     Bindings: Env;
//   }>,
//   next: any,
// ) {
//   const apiKey = c.req.header("x-api-key");
//   if (!apiKey) {
//     return c.json({ ok: false, message: "API key is required" }, 401);
//   }

//   const user = await prisma(c.env).user.findUnique({ where: { apiKey } });
//   if (!user) {
//     return c.json({ ok: false, message: "Invalid API key" }, 401);
//   }

//   // Store user in context for downstream use with explicit typing
//   c.set("user", user as any); // Explicitly cast the user to any or the correct type
//   return next();
// }

=======
>>>>>>> 9822bb1f43b74e604601be4f6882c3a5a21ffd59
}
