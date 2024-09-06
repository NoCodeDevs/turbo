import { publicUrl } from "~/lib/env";

import type { MetadataRoute } from "next";

export default function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Promise.resolve([
    {
      url: publicUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
  ]);
}
