// app/opengraph-image.tsx
// Imagen Open Graph (y Twitter) generada dinámicamente con next/og.
// Aplica a todas las rutas que no definan la suya propia, evitando depender
// de un archivo og-image.jpg estático que no existía.
import { ImageResponse } from "next/og";

export const alt = "STEIGERN — Automatización Industrial en México";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Barra de marca superior */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 14, height: 64, background: "#E02020" }} />
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: 8,
              color: "#ffffff",
            }}
          >
            STEIGERN
          </span>
        </div>

        {/* Titular */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#E02020",
              fontWeight: 700,
            }}
          >
            Design In Motion
          </span>
          <span
            style={{
              fontSize: 60,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#ffffff",
              maxWidth: 900,
            }}
          >
            Automatización Industrial y Soluciones de Ingeniería
          </span>
        </div>

        {/* Pie */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#a1a1aa",
            fontSize: 26,
          }}
        >
          <span>México · Presencia global</span>
          <span style={{ color: "#ffffff" }}>steigern.com.mx</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
