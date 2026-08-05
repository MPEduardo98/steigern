// next.config.mjs
// En .mjs (no .ts) a propósito: el servidor de despliegue tiene una glibc
// anterior a 2.29, así que Next no puede cargar el SWC nativo y cae al SWC de
// WASM, que falla al transpilar una config en TypeScript. Node carga este
// fichero directamente, sin transpilación.
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import("next").NextConfig} */
const nextConfig = {
  // Fija la raíz del proyecto (hay otro lockfile en el directorio padre).
  turbopack: {
    root: path.resolve(),
  },
  outputFileTracingRoot: path.resolve(),
  // No revelar la tecnología del servidor (cabecera X-Powered-By).
  poweredByHeader: false,
  // Compresión gzip de las respuestas.
  compress: true,
  // Formatos de imagen modernos: mejor Core Web Vitals (LCP) y menor peso.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Cabeceras de seguridad recomendadas para todas las rutas.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
