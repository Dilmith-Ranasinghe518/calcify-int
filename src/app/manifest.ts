import type { MetadataRoute } from "next";
import { brand } from "@/lib/content";
import { SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.short,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#08080A",
    theme_color: "#08080A",
    icons: [{ src: "/icon", sizes: "128x128", type: "image/png" }],
  };
}
