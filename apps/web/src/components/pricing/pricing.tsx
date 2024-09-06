"use client";

import { memo, useState } from "react";

import {
  RecurringInterval,
  RecurringIntervalDuration,
  config,
  getPriceWithHighestDiscount,
} from "@turbostarter/billing";
import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { PricingFooter } from "./layout/footer";
import { PricingHeader } from "./layout/header";
import { Plans, PlansSkeleton } from "./plans/plans";

import type { User } from "@turbostarter/auth";
import type { Customer } from "@turbostarter/billing";

interface PricingProps {
  readonly user: User | null;
  readonly customer: Customer | null;
}

export const Pricing = memo<PricingProps>(({ user, customer }) => {
  const intervals = [
    ...new Set(
      config.plans.flatMap((plan) =>
        plan.prices
          .flatMap((price) => ("interval" in price ? price.interval : null))
          .filter((x): x is RecurringInterval => !!x),
      ),
    ),
  ].sort((a, b) => RecurringIntervalDuration[a] - RecurringIntervalDuration[b]);

  const [activeInterval, setActiveInterval] = useState<RecurringInterval>(
    intervals[0] ?? RecurringInterval.MONTH,
  );

  const priceWithDiscount = getPriceWithHighestDiscount(
    config.plans,
    config.discounts,
  );

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-start gap-14 pb-16 lg:gap-24 lg:pb-28">
      <PricingHeader
        currency={config.currency}
        model={config.model}
        intervals={intervals}
        activeInterval={activeInterval}
        onIntervalChange={setActiveInterval}
        {...(priceWithDiscount && { priceWithDiscount })}
      />
      <Plans
        plans={config.plans}
        interval={activeInterval}
        model={config.model}
        currency={config.currency}
        discounts={config.discounts}
        user={user}
        customer={customer}
      />

      <PricingFooter provider={config.provider} />
    </div>
  );
});

export const PricingSkeleton = () => {
  return (
    <div className="mt-2 flex w-full flex-col items-center justify-start gap-14 pb-16 lg:gap-24 lg:pb-28">
      <div className="flex flex-col items-center justify-center gap-3">
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-8 w-96" />
      </div>
      <PlansSkeleton />
    </div>
  );
};

Pricing.displayName = "Pricing";
