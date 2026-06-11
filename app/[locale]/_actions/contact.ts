// app/[locale]/_actions/contact.ts
"use server";

import { Resend } from "resend";
import { readFile } from "fs/promises";
import path from "path";

// El logo se incrusta en el correo como adjunto inline (cid:logo) para que
// siempre se muestre, sin depender de imágenes remotas (que Gmail bloquea).
let logoCache: string | null = null;
async function getLogoBase64(): Promise<string | null> {
  if (logoCache !== null) return logoCache || null;
  try {
    const file = await readFile(path.join(process.cwd(), "public/logos/logo_mail.png"));
    logoCache = file.toString("base64");
  } catch (err) {
    console.error("[contact] No se pudo leer el logo:", err);
    logoCache = "";
  }
  return logoCache || null;
}

export interface ContactState {
  ok?: boolean;
  error?: string;
}

const TO = process.env.CONTACT_TO ?? "eduars.martinez@steigern.com.mx";
// El "from" debe ser un dominio verificado en Resend. Mientras se verifica
// steigern.com.mx puede usarse el remitente de pruebas onboarding@resend.dev.
const FROM = process.env.RESEND_FROM ?? "STEIGERN Web <onboarding@resend.dev>";

function esc(v: FormDataEntryValue | null): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: string): string {
  if (!value.trim()) return "";
  return `<tr>
    <td style="padding:14px 0;border-bottom:1px solid #f0f0f0;font:700 11px/1.4 Arial,sans-serif;color:#a1a1aa;text-transform:uppercase;letter-spacing:.1em;vertical-align:top;white-space:nowrap;width:130px">${label}</td>
    <td style="padding:14px 0 14px 20px;border-bottom:1px solid #f0f0f0;font:400 15px/1.55 Arial,sans-serif;color:#18181b">${value}</td>
  </tr>`;
}

export async function sendContactAction(formData: FormData): Promise<ContactState> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[sendContactAction] Falta RESEND_API_KEY");
    return { error: "El servicio de correo no está configurado." };
  }

  const name = esc(formData.get("name"));
  const email = esc(formData.get("email"));
  const message = esc(formData.get("message"));

  if (!name || !email || !message) {
    return { error: "Faltan campos requeridos." };
  }

  const company = esc(formData.get("company"));
  const role = esc(formData.get("role"));
  const phone = esc(formData.get("phone"));
  const reason = esc(formData.get("reason"));
  const solutions = formData.getAll("solutions").map((s) => esc(s)).filter(Boolean).join(", ");
  const source = esc(formData.get("source")) || "Sitio web";

  const year = new Date().getFullYear();
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <style>
    :root { color-scheme: light only; supported-color-schemes: light only; }
    html, body { background:#ffffff !important; }
    /* Evita que el modo oscuro de algunos clientes invierta los colores */
    [data-ogsc] body, [data-ogsb] body { background:#ffffff !important; }
  </style>
</head>
<body bgcolor="#ffffff" style="margin:0;padding:0;background:#ffffff;color:#18181b;-webkit-text-size-adjust:100%">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="background:#ffffff;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e7e7ea;border-radius:14px;overflow:hidden">

        <!-- Header -->
        <tr><td bgcolor="#ffffff" style="padding:26px 32px 22px;border-bottom:1px solid #eeeeef;background:#ffffff">
          <img src="cid:steigern-logo" alt="STEIGERN Design In Motion" height="38" style="height:38px;width:auto;display:block;border:0" />
        </td></tr>
        <tr><td bgcolor="#E02020" style="height:4px;background:#E02020;line-height:4px;font-size:0">&nbsp;</td></tr>

        <!-- Title -->
        <tr><td bgcolor="#ffffff" style="padding:30px 32px 4px;background:#ffffff">
          <p style="margin:0;font:700 11px/1.4 Arial,sans-serif;color:#E02020;letter-spacing:.16em;text-transform:uppercase">Nuevo mensaje de contacto</p>
          <h1 style="margin:8px 0 0;font:800 24px/1.25 Arial,sans-serif;color:#18181b">${name}${company ? ` · <span style="color:#71717a;font-weight:600">${company}</span>` : ""}</h1>
        </td></tr>

        <!-- Data -->
        <tr><td bgcolor="#ffffff" style="padding:16px 32px 8px;background:#ffffff">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Correo", `<a href="mailto:${email}" style="color:#E02020;text-decoration:none">${email}</a>`)}
            ${row("Teléfono", phone ? `<a href="tel:${phone.replace(/\s+/g, "")}" style="color:#18181b;text-decoration:none">${phone}</a>` : "")}
            ${row("Función", role)}
            ${row("Soluciones", solutions)}
            ${row("Motivo", reason)}
            ${row("Origen", source)}
          </table>
        </td></tr>

        <!-- Message -->
        <tr><td bgcolor="#ffffff" style="padding:22px 32px 8px;background:#ffffff">
          <p style="margin:0 0 8px;font:700 11px/1.4 Arial,sans-serif;color:#a1a1aa;letter-spacing:.1em;text-transform:uppercase">Mensaje</p>
          <div style="border-left:3px solid #E02020;background:#fafafa;padding:16px 18px;border-radius:0 8px 8px 0;font:400 15px/1.6 Arial,sans-serif;color:#27272a">${message.replace(/\n/g, "<br>")}</div>
        </td></tr>

        <!-- CTA -->
        <tr><td bgcolor="#ffffff" style="padding:22px 32px 30px;background:#ffffff">
          <a href="mailto:${email}" style="display:inline-block;background:#E02020;color:#ffffff;font:700 12px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;padding:14px 26px;border-radius:8px">Responder a ${name.split(" ")[0]}</a>
        </td></tr>

        <!-- Footer -->
        <tr><td bgcolor="#fafafa" style="padding:18px 32px;background:#fafafa;border-top:1px solid #eeeeef">
          <p style="margin:0;font:400 11px/1.6 Arial,sans-serif;color:#a1a1aa">Enviado automáticamente desde el sitio web de STEIGERN · ${year}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const logo = await getLogoBase64();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `Nuevo contacto: ${name}${company ? ` (${company})` : ""}`,
      html,
      attachments: logo
        ? [{ filename: "logo.png", content: logo, contentId: "steigern-logo" }]
        : undefined,
    });

    if (error) {
      console.error("[sendContactAction] Resend error:", error);
      return { error: "No se pudo enviar el mensaje. Intenta de nuevo." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[sendContactAction]", err);
    return { error: "Error al enviar el mensaje." };
  }
}
