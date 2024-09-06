import {
  BillingModel,
  PricingPlanType,
  RecurringInterval,
  BillingDiscountType,
} from "../types";

import type { Discount } from "../types";

export const plans = [
  {
    id: "starter",
    name: "Starter",
    description: "Start now. No credit card required",
    type: PricingPlanType.FREE,
    badge: null,
    prices: [
      {
        id: "starter-lifetime",
        amount: 0,
        type: BillingModel.ONE_TIME,
      },
      {
        id: "starter-monthly",
        amount: 0,
        interval: RecurringInterval.MONTH,
        type: BillingModel.RECURRING,
      },
      {
        id: "starter-yearly",
        amount: 0,
        interval: RecurringInterval.YEAR,
        type: BillingModel.RECURRING,
      },
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Become a power user and gain benefits",
    type: PricingPlanType.PREMIUM,
    badge: "Bestseller",
    prices: [
      {
        id: "price_1PpUagFQH4McJDTlHCzOmyT6",
        amount: 29900,
        type: BillingModel.ONE_TIME,
      },
      {
        id: "price_1PpZAAFQH4McJDTlig6FBPyy",
        amount: 1900,
        interval: RecurringInterval.MONTH,
        trialDays: 7,
        type: BillingModel.RECURRING,
      },
      {
        id: "price_1PpZALFQH4McJDTl8SWorWTO",
        amount: 8900,
        interval: RecurringInterval.YEAR,
        trialDays: 7,
        type: BillingModel.RECURRING,
      },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Designed for organizations and big teams",
    type: PricingPlanType.ENTERPRISE,
    badge: null,
    prices: [
      {
        id: "enterprise-lifetime",
        label: "Contact us!",
        href: "/contact",
        type: BillingModel.ONE_TIME,
        custom: true,
      },
      {
        id: "enterprise-monthly",
        label: "Contact us!",
        href: "/contact",
        interval: RecurringInterval.MONTH,
        custom: true,
        type: BillingModel.RECURRING,
      },
      {
        id: "enterprise-yearly",
        label: "Contact us!",
        href: "/contact",
        interval: RecurringInterval.YEAR,
        custom: true,
        type: BillingModel.RECURRING,
      },
    ],
  },
];

export const discounts: Discount[] = [
  {
    code: "50OFF",
    type: BillingDiscountType.PERCENT,
    off: 50,
    appliesTo: [
      "price_1PpUagFQH4McJDTlHCzOmyT6",
      "price_1PpZAAFQH4McJDTlig6FBPyy",
      "price_1PpZALFQH4McJDTl8SWorWTO",
    ],
  },
];
