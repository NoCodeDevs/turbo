import { publicUrl } from "~/lib/env";

import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: publicUrl + "/sitemap.xml",
  };
}
