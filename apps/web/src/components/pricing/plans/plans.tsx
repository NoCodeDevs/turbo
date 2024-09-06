import { memo } from "react";

import { Skeleton } from "@turbostarter/ui-web/skeleton";

import { Plan } from "./plan/plan";

import type { User } from "@turbostarter/auth";
import type {
  BillingModel,
  Customer,
  Discount,
  PricingPlan,
  RecurringInterval,
} from "@turbostarter/billing";

interface PlansProps {
  readonly plans: PricingPlan[];
  readonly discounts: Discount[];
  readonly user: User | null;
  readonly customer: Customer | null;
  readonly interval: RecurringInterval;
  readonly model: BillingModel;
  readonly currency: string;
}

export const Plans = memo<PlansProps>(
  ({ plans, discounts, interval, user, customer, model, currency }) => {
    return (
      <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-6 lg:gap-4">
        {plans.map((plan) => (
          <Plan
            key={plan.id}
            plan={plan}
            interval={interval}
            model={model}
            currency={currency}
            user={user}
            customer={customer}
            discounts={discounts}
          />
        ))}
      </div>
    );
  },
);

export const PlansSkeleton = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-12 md:gap-6 lg:gap-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="grow-0 basis-[25rem] md:shrink-0">
          <Skeleton className="h-[32rem] w-full" />
        </div>
      ))}
    </div>
  );
};

Plans.displayName = "Plans";
