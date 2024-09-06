import { ApiError } from "@turbostarter/shared/utils";

import { config } from "../../../config";
import { getCustomerByCustomerId, updateCustomer } from "../../../lib/customer";
import { stripe } from "../client";
import { toBillingStatus } from "../mappers/toBillingStatus";

import type Stripe from "stripe";

const getSubscription = async (subscriptionId: string) => {
  return stripe().subscriptions.retrieve(subscriptionId) as Promise<
    Stripe.Response<Stripe.Subscription & { plan: Stripe.Plan }>
  >;
};

export const getPromotionCode = async (code: string) => {
  try {
    const { data } = await stripe().promotionCodes.list({
      code,
    });

    return data[0];
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not retrieve promotion code.");
  }
};

export const subscriptionStatusChangeHandler = async ({
  id,
  customerId,
}: {
  id: string;
  customerId: string;
}) => {
  const customer = await getCustomerByCustomerId(customerId);

  if (!customer) {
    throw new ApiError(404, "Customer not found.");
  }

  const subscription = await getSubscription(id);

  const priceId = subscription.plan.id;
  const plan = config.plans.find((p) => p.prices.find((x) => x.id === priceId));

  await updateCustomer(customer.userId, {
    status: toBillingStatus(subscription.status),
    ...(plan && { plan: plan.type }),
  });

  console.log(
    `✅ Subscription status changed for user ${customer.userId} to ${subscription.status}`,
  );
};
