import { billingRouter } from "./modules/billing/billing.router";
import { userRouter } from "./modules/user/user.router";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  user: userRouter,
  billing: billingRouter,
});

export type AppRouter = typeof appRouter;
