-- scripts/migrations/005-proyectos.sql
-- Proyectos: lo que Steigern vende, siempre a pedido de un cliente. Compras,
-- almacén y facturación se van a ligar a un proyecto. Se puede correr más de
-- una vez. Aplicar con:
--   npx tsx scripts/run-sql.ts scripts/migrations/005-proyectos.sql

SET NAMES utf8mb4;

-- ── Proyectos ───────────────────────────────────────────────────────────────
--   codigo_proyecto   PRY-0001…, lo asigna el sistema.
--   estado            cotizacion → aprobado → en_proceso → terminado (o cancelado).
--   monto_cotizado    Precio de venta pactado con el cliente, sin IVA.
--   anticipo          Monto que el cliente paga por adelantado, sin IVA.
--   fecha_entrega     Fecha comprometida con el cliente.
--   fecha_cierre      Cuándo se terminó o se canceló.
--   responsable_id    Empleado a cargo del proyecto.
--   El costo real saldrá de las órdenes de compra cuando exista ese módulo.
CREATE TABLE IF NOT EXISTS proyectos (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo_proyecto  VARCHAR(40)  NOT NULL,
  nombre           VARCHAR(190) NOT NULL,
  cliente_id       INT UNSIGNED NOT NULL,
  responsable_id   INT UNSIGNED     NULL,
  descripcion      TEXT             NULL,
  estado           ENUM('cotizacion','aprobado','en_proceso','terminado','cancelado')
                   NOT NULL DEFAULT 'cotizacion',
  monto_cotizado   DECIMAL(14,2)    NULL,
  anticipo         DECIMAL(14,2)    NULL,
  moneda           CHAR(3)      NOT NULL DEFAULT 'MXN',
  fecha_cotizacion DATE         NOT NULL,
  fecha_inicio     DATE             NULL,
  fecha_entrega    DATE             NULL,
  fecha_cierre     DATE             NULL,
  notas            TEXT             NULL,
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by       INT UNSIGNED     NULL,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_proyectos_codigo (codigo_proyecto),
  KEY idx_proyectos_cliente (cliente_id),
  KEY idx_proyectos_responsable (responsable_id),
  KEY idx_proyectos_estado (estado),
  -- Un cliente con proyectos no se puede borrar: su historial se conserva.
  CONSTRAINT fk_proyectos_cliente
    FOREIGN KEY (cliente_id) REFERENCES clientes (id)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_proyectos_responsable
    FOREIGN KEY (responsable_id) REFERENCES empleados (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
