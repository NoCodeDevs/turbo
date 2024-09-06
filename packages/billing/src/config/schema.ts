import { z } from "zod";

import {
  BillingDiscountType,
  BillingModel,
  BillingProvider,
  PricingPlanType,
  RecurringInterval,
} from "../types";

export const discountSchema = z.object({
  code: z.string(),
  type: z.nativeEnum(BillingDiscountType),
  off: z.number(),
  appliesTo: z.array(z.string()),
});

const customPriceSchema = z.union([
  z.object({
    custom: z.literal(true),
    label: z.string(),
    href: z.string(),
  }),
  z.object({
    custom: z.literal(false).optional().default(false),
    amount: z.number(),
  }),
]);

const sharedPriceSchema = z.intersection(
  customPriceSchema,
  z.object({
    id: z.string(),
  }),
);

const priceTypeSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(BillingModel.ONE_TIME),
  }),
  z.object({
    type: z.literal(BillingModel.RECURRING),
    interval: z.nativeEnum(RecurringInterval),
    trialDays: z.number().optional(),
  }),
]);

export const priceSchema = z.intersection(sharedPriceSchema, priceTypeSchema);

export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.nativeEnum(PricingPlanType),
  badge: z.string().nullable().default(null),
  prices: z.array(priceSchema),
});

export const billingConfigSchema = z.object({
  provider: z
    .nativeEnum(BillingProvider)
    .optional()
    .default(BillingProvider.STRIPE),
  model: z.nativeEnum(BillingModel).optional().default(BillingModel.RECURRING),
  currency: z.string().optional().default("usd"),
  plans: z.array(planSchema),
  discounts: z.array(discountSchema).optional().default([]),
});
