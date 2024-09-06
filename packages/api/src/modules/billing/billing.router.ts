import {
  checkoutSchema,
  checkout,
  getCustomerByUserId,
  getBillingPortalSchema,
  getBillingPortal,
} from "@turbostarter/billing/api";

import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const billingRouter = createTRPCRouter({
  checkout: protectedProcedure
    .input(checkoutSchema)
    .mutation(({ ctx, input }) =>
      checkout({
        user: ctx.user,
        ...input,
      }),
    ),
  getCustomer: protectedProcedure.query(({ ctx }) =>
    getCustomerByUserId(ctx.user.id),
  ),
  getPortal: protectedProcedure
    .input(getBillingPortalSchema)
    .mutation(({ ctx, input }) =>
      getBillingPortal({
        user: ctx.user,
        ...input,
      }),
    ),
});
