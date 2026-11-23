import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NEXVORA Technologies",
    short_name: "NEXVORA",
    description:
      "Enterprise AI solutions, data engineering pipelines, cloud infrastructure, and intelligent business automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#030A14",
    theme_color: "#0066FF",
    icons: [
      {
        src: "/logo-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
