import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

import { HTTP_STATUS_CODE } from "@turbostarter/shared/constants";
import { ApiError } from "@turbostarter/shared/utils";

import { env } from "../../env";
import { BillingProvider } from "../../types";

export const setup = () => {
  if (env.BILLING_PROVIDER !== BillingProvider.LEMON_SQUEEZY) {
    throw new ApiError(
      HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
      "Invalid billing provider!",
    );
  }

  return lemonSqueezySetup({
    apiKey: env.LEMON_SQUEEZY_API_KEY,
    onError: (error) => {
      console.error(error);
      throw new ApiError(
        HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
        `Lemon Squeezy API error: ${error.message}`,
      );
    },
  });
};
