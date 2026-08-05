// app/opengraph-image.tsx
// Imagen Open Graph (y Twitter) generada dinámicamente con next/og.
// Aplica a todas las rutas que no definan la suya propia, evitando depender
// de un archivo og-image.jpg estático que no existía.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "STEIGERN — Estación de ensamble con perfil de aluminio, HMI y guardas de seguridad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Foto del producto embebida como data URI: next/og no resuelve rutas
// relativas del sitio y en build no hay un host al que pedirla.
// public/og/estaciones-og.jpg es la versión reducida de
// public/assets/images/soluciones/estaciones.png (4096x3072 pesaba demasiado).
const photo = `data:image/jpeg;base64,${readFileSync(
  join(process.cwd(), "public/og/estaciones-og.jpg"),
).toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Columna izquierda: marca y titular */}
        <div
          style={{
            width: 660,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "72px 56px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div style={{ width: 12, height: 56, background: "#E02020" }} />
            <span
              style={{
                fontSize: 54,
                fontWeight: 800,
                letterSpacing: 7,
                color: "#ffffff",
              }}
            >
              STEIGERN
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <span
              style={{
                fontSize: 20,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#E02020",
                fontWeight: 700,
              }}
            >
              Design In Motion
            </span>
            <span
              style={{
                fontSize: 50,
                fontWeight: 800,
                lineHeight: 1.06,
                color: "#ffffff",
              }}
            >
              Automatización Industrial y Soluciones de Ingeniería
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              color: "#a1a1aa",
              fontSize: 24,
            }}
          >
            <span>México · Presencia global</span>
            <span style={{ color: "#ffffff" }}>steigern.com.mx</span>
          </div>
        </div>

        {/* Columna derecha: estación de ensamble, sin recortar */}
        <div
          style={{
            width: 540,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            borderLeft: "10px solid #E02020",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            width={530}
            height={398}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
