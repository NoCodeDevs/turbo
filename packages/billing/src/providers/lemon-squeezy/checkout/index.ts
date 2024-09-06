import {
  createCheckout,
  getCustomer,
  getOrder,
} from "@lemonsqueezy/lemonsqueezy.js";

import { HTTP_STATUS_CODE } from "@turbostarter/shared/constants";
import { ApiError } from "@turbostarter/shared/utils";

import { getCustomerByUserId } from "../../../api";
import { config } from "../../../config";
import { env } from "../../../env";
import { getCustomerByCustomerId, updateCustomer } from "../../../lib/customer";
import { BillingProvider } from "../../../types";
import { getHighestDiscountForPrice } from "../../../utils";
import { createOrRetrieveCustomer } from "../customer";
import { toCheckoutBillingStatus } from "../mappers/toBillingStatus";

import type { CheckoutInput, GetBillingPortalInput } from "../../../api";
import type { User } from "@turbostarter/auth";

export const checkout = async ({
  user,
  price: { id },
  redirect,
}: CheckoutInput & { user: User }) => {
  if (env.BILLING_PROVIDER !== BillingProvider.LEMON_SQUEEZY) {
    throw new ApiError(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Invalid billing provider!",
    );
  }

  try {
    const plan = config.plans.find((plan) =>
      plan.prices.some((p) => p.id === id),
    );

    const price = plan?.prices.find((p) => p.id === id);

    if (!price || !plan) {
      throw new ApiError(HTTP_STATUS_CODE.NOT_FOUND, "Price not found.");
    }

    const customer = await createOrRetrieveCustomer({
      email: user.email ?? "",
      uuid: user.id,
    });

    const discount = getHighestDiscountForPrice(price, config.discounts);

    const session = await createCheckout(env.LEMON_SQUEEZY_STORE_ID, id, {
      checkoutData: {
        email: customer.attributes.email,
        name: customer.attributes.name,
        custom: {
          user_id: user.id,
        },
        ...(discount && { discountCode: discount.code }),
      },
      productOptions: {
        name: plan.name,
        description: plan.description,
        enabledVariants: [Number(id)],
        redirectUrl: redirect.success,
      },
    });

    return { url: session.data?.data.attributes.url ?? null };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};

export const getBillingPortal = async ({
  user,
}: GetBillingPortalInput & { user: User }) => {
  if (env.BILLING_PROVIDER !== BillingProvider.LEMON_SQUEEZY) {
    throw new ApiError(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Invalid billing provider!",
    );
  }

  const defaultUrl = `https://${env.LEMON_SQUEEZY_STORE_ID}.lemonsqueezy.com/billing`;

  try {
    const customer = await getCustomerByUserId(user.id);

    if (!customer) {
      return {
        url: defaultUrl,
      };
    }

    const lemonCustomer = await getCustomer(customer.customerId);

    const url = lemonCustomer.data?.data.attributes.urls.customer_portal;

    return { url: url ?? defaultUrl };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};

export const checkoutStatusChangeHandler = async ({ id }: { id: string }) => {
  const { data } = await getOrder(id);

  const order = data?.data;

  if (!order) {
    throw new ApiError(HTTP_STATUS_CODE.NOT_FOUND, "Order not found.");
  }

  const customer = await getCustomerByCustomerId(
    order.attributes.customer_id.toString(),
  );

  if (!customer) {
    throw new ApiError(HTTP_STATUS_CODE.NOT_FOUND, "Customer not found.");
  }

  const priceId = order.attributes.first_order_item.variant_id.toString();
  const plan = config.plans.find((p) => p.prices.find((x) => x.id === priceId));

  await updateCustomer(customer.userId, {
    status: toCheckoutBillingStatus(order.attributes.status),
    ...(plan && { plan: plan.type }),
  });

  console.log(
    `✅ Checkout status changed for user ${customer.userId} to ${order.attributes.status}`,
  );
};
