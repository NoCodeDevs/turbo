import { PricingPlanType, FEATURES } from "@turbostarter/billing";

interface PlanFeature {
  readonly id: string;
  readonly available: boolean;
  readonly title: string;
  readonly addon?: JSX.Element;
}

export const PLAN_FEATURES: Record<PricingPlanType, PlanFeature[]> = {
  [PricingPlanType.FREE]: [
    {
      id: FEATURES.FREE.SYNC,
      available: true,
      title: "Seamless sync",
    },
    {
      id: FEATURES.FREE.BASIC_SUPPORT,
      available: true,
      title: "Basic support",
    },
    {
      id: FEATURES.FREE.LIMITED_STORAGE,
      available: true,
      title: "Limited storage",
    },
    {
      id: FEATURES.FREE.EMAIL_NOTIFICATIONS,
      available: true,
      title: "Email notifications",
    },
    {
      id: FEATURES.FREE.BASIC_REPORTS,
      available: true,
      title: "Basic reports",
    },
    {
      id: FEATURES.PREMIUM.ADVANCED_SYNC,
      available: false,
      title: "Advanced sync",
    },
    {
      id: FEATURES.PREMIUM.PRIORITY_SUPPORT,
      available: false,
      title: "Priority support",
    },
    {
      id: FEATURES.PREMIUM.MORE_STORAGE,
      available: false,
      title: "Increased storage",
    },
  ],
  [PricingPlanType.PREMIUM]: [
    {
      id: FEATURES.PREMIUM.ADVANCED_SYNC,
      available: true,
      title: "Advanced sync",
    },
    {
      id: FEATURES.PREMIUM.PRIORITY_SUPPORT,
      available: true,
      title: "Priority support",
    },
    {
      id: FEATURES.PREMIUM.MORE_STORAGE,
      available: true,
      title: "More storage",
    },
    {
      id: FEATURES.PREMIUM.TEAM_COLLABORATION,
      available: true,
      title: "Team collaboration",
    },
    {
      id: FEATURES.PREMIUM.SMS_NOTIFICATIONS,
      available: true,
      title: "SMS notifications",
    },
    {
      id: FEATURES.PREMIUM.ADVANCED_REPORTS,
      available: true,
      title: "Advanced reports",
    },
    {
      id: FEATURES.ENTERPRISE.UNLIMITED_STORAGE,
      available: false,
      title: "Unlimited storage",
    },
    {
      id: FEATURES.ENTERPRISE.CUSTOM_BRANDING,
      available: false,
      title: "Custom branding",
    },
    {
      id: FEATURES.ENTERPRISE.DEDICATED_SUPPORT,
      available: false,
      title: "Dedicated support",
    },
  ],
  [PricingPlanType.ENTERPRISE]: [
    {
      id: FEATURES.ENTERPRISE.UNLIMITED_STORAGE,
      available: true,
      title: "Unlimited storage",
    },
    {
      id: FEATURES.ENTERPRISE.CUSTOM_BRANDING,
      available: true,
      title: "Custom branding",
    },
    {
      id: FEATURES.ENTERPRISE.DEDICATED_SUPPORT,
      available: true,
      title: "Dedicated support",
    },
    {
      id: FEATURES.ENTERPRISE.API_ACCESS,
      available: true,
      title: "API access",
    },
    {
      id: FEATURES.ENTERPRISE.USER_ROLES,
      available: true,
      title: "User roles management",
    },
    {
      id: FEATURES.ENTERPRISE.AUDIT_LOGS,
      available: true,
      title: "Audit logs",
    },
    {
      id: FEATURES.ENTERPRISE.SINGLE_SIGN_ON,
      available: true,
      title: "Single sign-on",
    },
    {
      id: FEATURES.ENTERPRISE.ADVANCED_ANALYTICS,
      available: true,
      title: "Advanced analytics",
    },
  ],
};
