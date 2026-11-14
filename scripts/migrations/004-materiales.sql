-- scripts/migrations/004-materiales.sql
-- Catálogo de materiales: lo que se compra para los proyectos (tornillería,
-- perfilería, aluminio…). No lleva precio de venta: lo que se vende es el
-- proyecto. Se puede correr más de una vez. Aplicar con:
--   npx tsx scripts/run-sql.ts scripts/migrations/004-materiales.sql

SET NAMES utf8mb4;

CREATE TABLE IF NOT EXISTS categorias_material (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre     VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categorias_material_nombre (nombre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO categorias_material (nombre) VALUES
  ('Tornillería'), ('Perfilería'), ('Aluminio');

-- ── Materiales ──────────────────────────────────────────────────────────────
--   codigo_material  MAT-0001…, lo asigna el sistema.
--   descripcion      Cómo se pide: "Tornillo Allen M6 × 20 inox". No se repite.
--   numero_parte     Número de catálogo del fabricante o del proveedor.
--   unidad           Cómo se compra: pieza, metro, tramo, kg… (lista en lib/materiales-reglas.ts).
--   ultimo_costo     Costo unitario de la última compra, sin IVA. Se actualizará
--                    solo cuando exista el módulo de compras.
--   proveedor_id     A quién se le compra normalmente.
CREATE TABLE IF NOT EXISTS materiales (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
  codigo_material  VARCHAR(40)  NOT NULL,
  descripcion      VARCHAR(250) NOT NULL,
  numero_parte     VARCHAR(80)      NULL,
  categoria_id     INT UNSIGNED     NULL,
  unidad           VARCHAR(20)  NOT NULL DEFAULT 'pieza',
  ultimo_costo     DECIMAL(14,4)    NULL,
  moneda           CHAR(3)      NOT NULL DEFAULT 'MXN',
  proveedor_id     INT UNSIGNED     NULL,
  estatus          ENUM('activo','inactivo') NOT NULL DEFAULT 'activo',
  notas            TEXT             NULL,
  created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by       INT UNSIGNED     NULL,
  updated_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_materiales_codigo (codigo_material),
  UNIQUE KEY uq_materiales_descripcion (descripcion),
  KEY idx_materiales_categoria (categoria_id),
  KEY idx_materiales_proveedor (proveedor_id),
  KEY idx_materiales_estatus (estatus),
  CONSTRAINT fk_materiales_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias_material (id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT fk_materiales_proveedor
    FOREIGN KEY (proveedor_id) REFERENCES proveedores (id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
