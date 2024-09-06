import { createTRPCRouter, publicProcedure } from "../../trpc";

export const userRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
