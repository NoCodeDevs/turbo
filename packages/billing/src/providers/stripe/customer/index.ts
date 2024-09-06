import { ApiError } from "@turbostarter/shared/utils";

import {
  getCustomerByUserId,
  updateCustomer,
  upsertCustomer,
} from "../../../lib/customer";
import { stripe } from "../client";

import type Stripe from "stripe";

const getStripeCustomerById = async (stripeId: string) => {
  return stripe().customers.retrieve(stripeId);
};

const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe().customers.list({ email: email });

  return customers.data.length > 0 ? customers.data[0] : null;
};

const createStripeCustomer = async (uuid: string, email: string) => {
  const customerData = { metadata: { supabaseUUID: uuid }, email: email };
  const newCustomer = await stripe().customers.create(customerData);

  return newCustomer.id;
};

export const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const existingCustomer = await getCustomerByUserId(uuid);

  const stripeCustomerId = existingCustomer?.customerId
    ? (await getStripeCustomerById(existingCustomer.customerId)).id
    : (await getStripeCustomerByEmail(email))?.id;

  const stripeIdToInsert = stripeCustomerId
    ? stripeCustomerId
    : await createStripeCustomer(uuid, email);

  if (!stripeIdToInsert) {
    throw new ApiError(500, "Stripe customer creation failed.");
  }

  if (existingCustomer && stripeCustomerId) {
    if (existingCustomer.customerId !== stripeCustomerId) {
      await updateCustomer(uuid, {
        customerId: stripeCustomerId,
      });
      console.warn(
        `Customer ${uuid} had a different customerId. Updated to ${stripeCustomerId}.`,
      );
    }

    return stripeCustomerId;
  }

  await upsertCustomer({
    userId: uuid,
    customerId: stripeIdToInsert,
  });

  return stripeIdToInsert;
};

export const createBillingPortalSession = async (
  params: Stripe.BillingPortal.SessionCreateParams,
) => {
  try {
    return await stripe().billingPortal.sessions.create(params);
  } catch (e) {
    console.error(e);
    throw new ApiError(500, "Could not create billing portal session.");
  }
};
