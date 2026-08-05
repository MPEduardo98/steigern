import type { MetadataRoute } from "next";

// Web App Manifest (/manifest.webmanifest). Habilita "Añadir a pantalla de
// inicio" en Android y define nombre, iconos y colores de marca.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "STEIGERN Design In Motion",
    short_name: "STEIGERN",
    description:
      "Automatización industrial y soluciones de ingeniería: conveyors, perfiles de aluminio, estaciones de trabajo y co-bots.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/favicon.svg", type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512", purpose: "maskable" },
    ],
  };
}
