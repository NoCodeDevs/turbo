import { getSubscription } from "@lemonsqueezy/lemonsqueezy.js";

import { HTTP_STATUS_CODE } from "@turbostarter/shared/constants";
import { ApiError } from "@turbostarter/shared/utils";

import { config } from "../../../config";
import { getCustomerByCustomerId, updateCustomer } from "../../../lib/customer";
import { toBillingStatus } from "../mappers/toBillingStatus";

export const subscriptionStatusChangeHandler = async ({
  id,
}: {
  id: string;
}) => {
  const { data } = await getSubscription(id);

  const subscription = data?.data;

  if (!subscription) {
    throw new ApiError(HTTP_STATUS_CODE.NOT_FOUND, "Subscription not found.");
  }

  const customer = await getCustomerByCustomerId(
    subscription.attributes.customer_id.toString(),
  );

  if (!customer) {
    throw new ApiError(HTTP_STATUS_CODE.NOT_FOUND, "Customer not found.");
  }

  const priceId = subscription.attributes.variant_id.toString();
  const plan = config.plans.find((p) => p.prices.find((x) => x.id === priceId));

  await updateCustomer(customer.userId, {
    status: toBillingStatus(subscription.attributes.status),
    ...(plan && { plan: plan.type }),
  });

  console.log(
    `✅ Subscription status changed for user ${customer.userId} to ${subscription.attributes.status}`,
  );
};
