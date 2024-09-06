import { env, publicUrl } from "~/lib/env";

import type { Metadata, Viewport } from "next";

interface SeoProps {
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly url?: string;
  readonly canonical?: string;
}

const SITE_NAME_SEPARATOR = " | ";
export const SITE_NAME_TEMPLATE = `%s${SITE_NAME_SEPARATOR}${env.NEXT_PUBLIC_PRODUCT_NAME}`;

export const getMetadata = (
  {
    title = env.NEXT_PUBLIC_PRODUCT_NAME,
    description = env.NEXT_PUBLIC_SITE_DESCRIPTION,
    url,
    canonical,
  } = {} as SeoProps,
): Metadata => ({
  title,
  description,
  openGraph: {
    title,
    url: url ? url : canonical ? canonical : publicUrl,
    description,
    siteName: env.NEXT_PUBLIC_PRODUCT_NAME,
  },
  ...{
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
  },
  twitter: {
    card: "summary_large_image",
  },
});

export const DEFAULT_METADATA: Metadata = {
  ...getMetadata(),
  title: {
    template: SITE_NAME_TEMPLATE,
    default: env.NEXT_PUBLIC_PRODUCT_NAME,
  },
  metadataBase: new URL(publicUrl),
};

export const DEFAULT_VIEWPORT: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};
