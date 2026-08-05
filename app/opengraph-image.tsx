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

// Los recursos se embeben como data URI: next/og no resuelve rutas relativas
// del sitio y durante el build no hay un host al que pedirlas.
const asset = (file: string, mime: string) =>
  `data:${mime};base64,${readFileSync(
    join(process.cwd(), "public/og", file),
  ).toString("base64")}`;

// Logotipo real de la marca (public/logos/Logo.png, reducido).
const logo = asset("logo-og.png", "image/png");
// Estación de ensamble (public/assets/images/soluciones/estaciones.png, reducida).
const photo = asset("estaciones-og.jpg", "image/jpeg");

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Filo rojo de marca */}
        <div style={{ width: 16, height: "100%", background: "#E30613" }} />

        {/* Columna izquierda: logotipo y titular */}
        <div
          style={{
            width: 624,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "68px 56px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} alt="" width={380} height={73} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 48,
                fontWeight: 800,
                lineHeight: 1.08,
                color: "#18181b",
                letterSpacing: -1,
              }}
            >
              Automatización Industrial y Soluciones de Ingeniería
            </span>
            <div
              style={{
                width: 96,
                height: 6,
                background: "#E30613",
                marginTop: 28,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 23,
              color: "#71717a",
            }}
          >
            <span>México · Presencia global</span>
            <span style={{ color: "#18181b", fontWeight: 700 }}>
              steigern.com.mx
            </span>
          </div>
        </div>

        {/* Columna derecha: estación de ensamble, sin recortar */}
        <div
          style={{
            display: "flex",
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            width={540}
            height={405}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
