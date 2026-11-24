-- scripts/migrations/006-analitica.sql
-- Analítica propia del sitio público: qué páginas ven los visitantes, de dónde
-- llegan (buscadores, IA, redes sociales…) y qué botones/enlaces usan.
-- Sin cookies ni servicios de terceros: el visitante se identifica con un hash
-- diario (IP + navegador + fecha) que no se puede revertir ni seguir entre días.
-- Se puede correr más de una vez. Aplicar con:
--   npx tsx scripts/run-sql.ts scripts/migrations/006-analitica.sql

SET NAMES utf8mb4;

-- ── Eventos ─────────────────────────────────────────────────────────────────
--   tipo          vista = página vista · clic = botón/enlace · salida = el
--                 visitante dejó la página (trae duración y % de scroll).
--   sesion_id     Una visita: se renueva tras 30 min sin actividad.
--   visitante_id  Hash diario anónimo (ver arriba).
--   es_entrada    1 en la primera página de la visita; ahí se guarda el origen.
--   canal         buscador · ia · social · directo · referido · campana · correo
--   fuente        Sitio de origen ya normalizado: google, chatgpt, linkedin…
--   elemento      Texto del botón o enlace (o su data-track).
--   destino       href del enlace, si lo hay.
--   tipo_elemento whatsapp · telefono · correo · externo · interno · boton
CREATE TABLE IF NOT EXISTS analitica_eventos (
  id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  creado_en      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  tipo           ENUM('vista','clic','salida') NOT NULL,
  sesion_id      CHAR(16)     NOT NULL,
  visitante_id   CHAR(16)     NOT NULL,
  ruta           VARCHAR(300) NOT NULL,
  idioma         VARCHAR(5)       NULL,
  es_entrada     TINYINT(1)   NOT NULL DEFAULT 0,
  canal          VARCHAR(20)      NULL,
  fuente         VARCHAR(120)     NULL,
  referente      VARCHAR(500)     NULL,
  utm_source     VARCHAR(120)     NULL,
  utm_medium     VARCHAR(120)     NULL,
  utm_campaign   VARCHAR(120)     NULL,
  elemento       VARCHAR(160)     NULL,
  destino        VARCHAR(500)     NULL,
  tipo_elemento  VARCHAR(20)      NULL,
  duracion_ms    INT UNSIGNED     NULL,
  scroll_pct     TINYINT UNSIGNED NULL,
  dispositivo    ENUM('movil','tablet','escritorio') NULL,
  navegador      VARCHAR(30)      NULL,
  so             VARCHAR(30)      NULL,
  pais           CHAR(2)          NULL,
  PRIMARY KEY (id),
  KEY idx_analitica_fecha (creado_en),
  KEY idx_analitica_tipo_fecha (tipo, creado_en),
  KEY idx_analitica_sesion (sesion_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
