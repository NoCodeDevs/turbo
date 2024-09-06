import { ApiError } from "@turbostarter/shared/utils";

import { config } from "../../../config";
import { getCustomerByCustomerId, updateCustomer } from "../../../lib/customer";
import { BillingModel } from "../../../types";
import { getHighestDiscountForPrice } from "../../../utils";
import { stripe } from "../client";
import {
  createBillingPortalSession,
  createOrRetrieveCustomer,
} from "../customer";
import {
  toCheckoutBillingStatus,
  toPaymentBillingStatus,
} from "../mappers/toBillingStatus";
import {
  getPromotionCode,
  subscriptionStatusChangeHandler,
} from "../subscription";

import type { CheckoutInput, GetBillingPortalInput } from "../../../lib/schema";
import type { User } from "@turbostarter/auth";
import type Stripe from "stripe";

const createCheckoutSession = async (
  params: Stripe.Checkout.SessionCreateParams,
) => {
  try {
    return await stripe().checkout.sessions.create(params);
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not create checkout session.");
  }
};

const getCheckoutSession = async (sessionId: string) => {
  try {
    return await stripe().checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price"],
    });
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not retrieve checkout session.");
  }
};

export const checkoutStatusChangeHandler = async (
  session: Stripe.Checkout.Session,
) => {
  const customerId = session.customer as string | null;

  if (!customerId) {
    throw new ApiError(404, "Customer id not found.");
  }

  if (session.mode === "subscription") {
    await subscriptionStatusChangeHandler({
      id: session.subscription as string,
      customerId,
    });
    return;
  }

  const customer = await getCustomerByCustomerId(customerId);

  if (!customer) {
    throw new ApiError(404, "Customer not found.");
  }

  const checkoutSession = await getCheckoutSession(session.id);
  const priceId = checkoutSession.line_items?.data[0]?.price?.id;

  if (!priceId) {
    throw new ApiError(404, "Price id not found.");
  }

  const plan = config.plans.find((p) =>
    p.prices.some((price) => price.id === priceId),
  );

  await updateCustomer(customer.userId, {
    status: checkoutSession.status
      ? toCheckoutBillingStatus(checkoutSession.status)
      : toPaymentBillingStatus(checkoutSession.payment_status),
    ...(plan && { plan: plan.type }),
  });

  console.log(
    `✅ Checkout status changed for user ${customer.userId} to ${checkoutSession.status}`,
  );
};

export const checkout = async ({
  user,
  price: { id },
  redirect,
}: CheckoutInput & { user: User }) => {
  try {
    const price = config.plans
      .find((plan) => plan.prices.some((p) => p.id === id))
      ?.prices.find((p) => p.id === id);

    if (!price) {
      throw new ApiError(404, "Price not found.");
    }

    const customer = await createOrRetrieveCustomer({
      email: user.email ?? "",
      uuid: user.id,
    });

    const discount = getHighestDiscountForPrice(price, config.discounts);
    const code = await getPromotionCode(discount?.code ?? "");

    const session = await createCheckoutSession({
      mode:
        config.model === BillingModel.RECURRING ? "subscription" : "payment",
      billing_address_collection: "required",
      customer,
      customer_update: {
        address: "auto",
      },
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      success_url: redirect.success,
      cancel_url: redirect.cancel,
      ...("trialDays" in price && price.trialDays
        ? {
            subscription_data: {
              trial_period_days: price.trialDays,
            },
          }
        : {}),
      ...(code && {
        discounts: [
          {
            promotion_code: code.id,
          },
        ],
      }),
    });

    return { url: session.url };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};

export const getBillingPortal = async ({
  redirectUrl,
  user,
}: GetBillingPortalInput & { user: User }) => {
  try {
    const customer = await createOrRetrieveCustomer({
      email: user.email ?? "",
      uuid: user.id,
    });

    const { url } = await createBillingPortalSession({
      customer,
      return_url: redirectUrl,
    });

    return { url };
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      throw new ApiError(500, e.message);
    }

    throw new ApiError(500, "An unknown error occurred.");
  }
};
