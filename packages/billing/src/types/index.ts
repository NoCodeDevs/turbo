import { z } from "zod";

import {
  billingStatusEnum,
  pricingPlanTypeEnum,
} from "@turbostarter/db/schema";

import type {
  billingConfigSchema,
  discountSchema,
  planSchema,
  priceSchema,
} from "../config/schema";

const billingStatusEnumSchema = z.enum(billingStatusEnum.enumValues);
const pricingPlanTypeEnumSchema = z.enum(pricingPlanTypeEnum.enumValues);

export const BillingStatus = billingStatusEnumSchema.enum;
export const PricingPlanType = pricingPlanTypeEnumSchema.enum;

export const BillingProvider = {
  STRIPE: "stripe",
  LEMON_SQUEEZY: "lemon-squeezy",
} as const;

export const BillingModel = {
  ONE_TIME: "one-time",
  RECURRING: "recurring",
} as const;

export const RecurringInterval = {
  DAY: "day",
  MONTH: "month",
  WEEK: "week",
  YEAR: "year",
} as const;

export const BillingDiscountType = {
  PERCENT: "percent",
  AMOUNT: "amount",
} as const;

export const RecurringIntervalDuration: Record<RecurringInterval, number> = {
  [RecurringInterval.DAY]: 1,
  [RecurringInterval.WEEK]: 7,
  [RecurringInterval.MONTH]: 30,
  [RecurringInterval.YEAR]: 365,
};

export type BillingStatus = z.infer<typeof billingStatusEnumSchema>;
export type BillingProvider =
  (typeof BillingProvider)[keyof typeof BillingProvider];
export type PricingPlanType = z.infer<typeof pricingPlanTypeEnumSchema>;
export type BillingModel = (typeof BillingModel)[keyof typeof BillingModel];
export type RecurringInterval =
  (typeof RecurringInterval)[keyof typeof RecurringInterval];
export type BillingDiscountType =
  (typeof BillingDiscountType)[keyof typeof BillingDiscountType];

export type BillingConfig = z.infer<typeof billingConfigSchema>;
export type PricingPlan = z.infer<typeof planSchema>;
export type PricingPlanPrice = z.infer<typeof priceSchema>;
export type Discount = z.infer<typeof discountSchema>;

export type { SelectCustomer as Customer } from "@turbostarter/db/schema";
