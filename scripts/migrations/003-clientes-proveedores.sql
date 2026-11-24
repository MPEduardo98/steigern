-- scripts/migrations/003-clientes-proveedores.sql
-- Catálogos de clientes y proveedores (separados: uno es a quién le vendes y
-- otro a quién le compras). Se puede correr más de una vez. Aplicar con:
--   npx tsx scripts/run-sql.ts scripts/migrations/003-clientes-proveedores.sql

SET NAMES utf8mb4;

-- ── Proveedores: datos que faltaban para comprar y recibir facturas ─────────
--   email / telefono   Contacto general de la empresa (los de personas van en contactos).
--   regimen_fiscal     Clave del catálogo c_RegimenFiscal del SAT (601, 612, 626…).
--   dias_credito       Plazo de pago que nos da el proveedor (0 = contado).
--   moneda             En qué moneda nos factura.
--   created_by         Usuario del panel que lo dio de alta.
SET @falta := (SELECT COUNT(*) = 0 FROM information_schema.COLUMNS
                WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'proveedores'
                  AND COLUMN_NAME = 'regimen_fiscal');
SET @sql := IF(@falta,
  'ALTER TABLE proveedores
     ADD COLUMN regimen_fiscal VARCHAR(3)        NULL AFTER rfc,
     ADD COLUMN email          VARCHAR(190)      NULL AFTER regimen_fiscal,
     ADD COLUMN telefono       VARCHAR(40)       NULL AFTER email,
     ADD COLUMN dias_credito   SMALLINT UNSIGNED NOT NULL DEFAULT 0 AFTER categoria_id,
     ADD COLUMN moneda         CHAR(3)           NOT NULL DEFAULT ''MXN'' AFTER dias_credito,
     ADD COLUMN created_by     INT UNSIGNED      NULL AFTER created_at',
  'DO 0');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;

-- El RFC no puede ser único: los genéricos (XEXX010101000 para extranjeros)
-- se repiten. La aplicación evita duplicados de RFC que no sean genéricos.
SET @existe := (SELECT COUNT(*) > 0 FROM information_schema.STATISTICS
                 WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'proveedores'
                   AND INDEX_NAME = 'uq_proveedores_rfc');
SET @sql := IF(@existe,
  'ALTER TABLE proveedores DROP INDEX uq_proveedores_rfc, ADD KEY idx_proveedores_rfc (rfc)',
  'DO 0');
PREPARE st FROM @sql; EXECUTE st; DEALLOCATE PREPARE st;

-- ── Clientes ────────────────────────────────────────────────────────────────
--   uso_cfdi        Clave c_UsoCFDI con la que normalmente se le factura (G01, G03, S01…).
--   codigo_postal   También es el domicilio fiscal que pide el CFDI 4.0.
--   dias_credito    Plazo que le damos para pagar (0 = contado).
--   limite_credito  Saldo máximo que puede deber. NULL = sin límite definido.
CREATE TABLE IF NOT EXISTS clientes (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo_cliente   VARCHAR(40)  NOT NULL,
  razon_social     VARCHAR(190) NOT NULL,
  nombre_comercial VARCHAR(190)     NULL,
  rfc              VARCHAR(20)      NULL,
  regimen_fiscal   VARCHAR(3)       NULL,
  uso_cfdi         VARCHAR(4)       NULL,
  email            VARCHAR(190)     NULL,
  telefono         VARCHAR(40)      NULL,
  pais             VARCHAR(80)  NOT NULL DEFAULT 'México',
  estado           VARCHAR(80)      NULL,
  ciudad           VARCHAR(80)      NULL,
  direccion        VARCHAR(300)     NULL,
  codigo_postal    VARCHAR(12)      NULL,
  sitio_web        VARCHAR(300)     NULL,
  dias_credito     SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  limite_credito   DECIMAL(14,2)    NULL,
  moneda           CHAR(3)      NOT NULL DEFAULT 'MXN',
  estatus          ENUM('activo','inactivo','bloqueado') NOT NULL DEFAULT 'activo',
  notas            TEXT             NULL,
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by       INT UNSIGNED     NULL,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_clientes_codigo (codigo_cliente),
  KEY idx_clientes_rfc (rfc),
  KEY idx_clientes_estatus (estatus)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contactos_cliente (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT,
  cliente_id    INT UNSIGNED NOT NULL,
  nombre        VARCHAR(190) NOT NULL,
  puesto        VARCHAR(120)     NULL,
  email         VARCHAR(190)     NULL,
  telefono      VARCHAR(40)      NULL,
  es_principal  TINYINT(1)   NOT NULL DEFAULT 0,
  created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_contactos_cliente (cliente_id),
  CONSTRAINT fk_contactos_cliente
    FOREIGN KEY (cliente_id) REFERENCES clientes (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
