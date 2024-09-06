"use client";

import { memo } from "react";

import {
  calculatePriceDiscount,
  formatPrice,
  BillingDiscountType,
} from "@turbostarter/billing";
import { Icons } from "@turbostarter/ui-web/icons";

import type {
  Discount as DiscountType,
  PricingPlanPrice,
} from "@turbostarter/billing";

interface DiscountProps {
  readonly currency: string;
  readonly priceWithDiscount?: PricingPlanPrice & {
    discount: DiscountType | undefined;
  };
}

export const Discount = memo<DiscountProps>(
  ({ priceWithDiscount, currency }) => {
    if (!priceWithDiscount?.discount) {
      return null;
    }

    const discount = calculatePriceDiscount(
      priceWithDiscount,
      priceWithDiscount.discount,
    );

    if (!discount) {
      return null;
    }

    return (
      <p className="sm mt-2 text-center md:text-lg">
        <Icons.Gift className="mb-1.5 mr-1.5 inline-block h-5 w-5 text-primary" />
        <span className="text-primary">
          SPECIAL OFFER:{" "}
          <span className="font-semibold">
            -
            {`${discount.type === BillingDiscountType.PERCENT ? discount.percentage + "%" : formatPrice({ amount: discount.original.amount - discount.discounted.amount, currency })}`}{" "}
            off
          </span>
        </span>
      </p>
    );
  },
);

Discount.displayName = "Discount";
