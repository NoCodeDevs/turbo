import {
  createCustomer,
  getCustomer,
  listCustomers,
} from "@lemonsqueezy/lemonsqueezy.js";

import { HTTP_STATUS_CODE } from "@turbostarter/shared/constants";
import { ApiError } from "@turbostarter/shared/utils";

import { getCustomerByUserId } from "../../../api";
import { env } from "../../../env";
import { updateCustomer, upsertCustomer } from "../../../lib/customer";
import { BillingProvider } from "../../../types";

const getLemonSqueezyCustomerById = async (customerId: string) => {
  return getCustomer(customerId);
};

const getLemonSqueezyCustomerByEmail = async (email: string) => {
  const { data } = await listCustomers({
    filter: {
      email: email,
    },
  });

  return data?.data[0];
};

const createLemonSqueezyCustomer = async (email: string) => {
  if (env.BILLING_PROVIDER !== BillingProvider.LEMON_SQUEEZY) {
    throw new ApiError(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Invalid billing provider!",
    );
  }

  const newCustomer = await createCustomer(env.LEMON_SQUEEZY_STORE_ID, {
    name: email.split("@")[0] ?? "",
    email: email,
  });

  return newCustomer.data?.data;
};

export const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  const existingCustomer = await getCustomerByUserId(uuid);

  const lemonSqueezyCustomer = existingCustomer?.customerId
    ? (await getLemonSqueezyCustomerById(existingCustomer.customerId)).data
        ?.data
    : await getLemonSqueezyCustomerByEmail(email);

  const lemonSqueezyCustomerToProcess =
    lemonSqueezyCustomer ?? (await createLemonSqueezyCustomer(email));

  if (!lemonSqueezyCustomerToProcess) {
    throw new ApiError(500, "Lemon Squeezy customer creation failed.");
  }

  if (existingCustomer && lemonSqueezyCustomer) {
    if (existingCustomer.customerId !== lemonSqueezyCustomer.id) {
      await updateCustomer(uuid, {
        customerId: lemonSqueezyCustomerToProcess.id,
      });
      console.warn(
        `Customer ${uuid} had a different customerId. Updated to ${lemonSqueezyCustomerToProcess.id}.`,
      );
    }

    return lemonSqueezyCustomerToProcess;
  }

  await upsertCustomer({
    userId: uuid,
    customerId: lemonSqueezyCustomerToProcess.id,
  });

  return lemonSqueezyCustomerToProcess;
};
