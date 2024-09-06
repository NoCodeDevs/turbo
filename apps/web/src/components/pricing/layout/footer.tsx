import { memo } from "react";

import { BillingProvider } from "@turbostarter/billing";
import { Icons } from "@turbostarter/ui-web/icons";

interface PricingFooterProps {
  readonly provider: BillingProvider;
}

const PROVIDERS_ICONS = {
  [BillingProvider.STRIPE]: Icons.Stripe,
  [BillingProvider.LEMON_SQUEEZY]: Icons.LemonSqueezy,
} as const;

export const PricingFooter = memo<PricingFooterProps>(({ provider }) => {
  const Icon = PROVIDERS_ICONS[provider];

  return (
    <div className="flex items-center justify-center gap-3">
      <span className="text-lg">Powered by</span>
      <Icon className="h-9 text-foreground" />
    </div>
  );
});

PricingFooter.displayName = "PricingFooter";
