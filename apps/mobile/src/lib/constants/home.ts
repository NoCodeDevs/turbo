import { pathsConfig } from "~/config/paths";

export const HOME_LINKS = [
  {
    title: "Auth",
    description:
      "Authenticate users to your app. Social logins, magic link, email/password and many more.",
    href: pathsConfig.tabs.auth.login,
  },
  {
    title: "Billing",
    description:
      "Receive payments from your users using configured providers - Stripe or LemonSqueezy.",
    href: pathsConfig.tabs.billing,
  },
  {
    title: "Blog",
    description:
      "Manage your blog with ease with built-in integration. Supports MDX and content collections.",
    href: pathsConfig.tabs.blog,
  },
  {
    title: "Docs",
    description: `Learn how to use TurboStarter. From installation to deployment.`,
    href: "https://turbostarter.dev/docs",
  },
] as const;
