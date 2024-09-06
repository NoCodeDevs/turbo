"use client";

import { memo } from "react";

import { BillingModel } from "@turbostarter/billing";
import { Tabs, TabsList, TabsTrigger } from "@turbostarter/ui-web/tabs";

import { Discount } from "./discount";

import type {
  Discount as DiscountType,
  PricingPlanPrice,
  RecurringInterval,
} from "@turbostarter/billing";

interface PricingHeaderProps {
  readonly currency: string;
  readonly model: BillingModel;
  readonly intervals: RecurringInterval[];
  readonly activeInterval: RecurringInterval;
  readonly onIntervalChange: (billing: RecurringInterval) => void;
  readonly priceWithDiscount?: PricingPlanPrice & {
    discount: DiscountType | undefined;
  };
}

export const PricingHeader = memo<PricingHeaderProps>(
  ({
    model,
    activeInterval,
    intervals,
    onIntervalChange,
    priceWithDiscount,
    currency,
  }) => {
    return (
      <header className="flex flex-col items-center justify-center gap-3">
        <h1 className="lg:leading-tighter max-w-4xl text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Pricing
        </h1>
        <p className="max-w-2xl text-center text-muted-foreground">
          {model === BillingModel.ONE_TIME
            ? "Pay once. Use forever. No recurring fees. No hidden charges."
            : "Choose a billing period that fits your needs."}
        </p>

        <Discount
          {...(priceWithDiscount && {
            priceWithDiscount,
          })}
          currency={currency}
        />

        {model === BillingModel.RECURRING && intervals.length > 0 && (
          <Tabs
            className="mt-4 lg:mt-6"
            value={activeInterval}
            onValueChange={(value) =>
              onIntervalChange(value as RecurringInterval)
            }
          >
            <TabsList>
              {intervals.map((interval) => (
                <TabsTrigger
                  key={interval}
                  value={interval}
                  className="capitalize"
                >
                  {interval}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      </header>
    );
  },
);

PricingHeader.displayName = "PricingHeader";
